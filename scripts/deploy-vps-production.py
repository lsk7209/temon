#!/usr/bin/env python3
"""Poll public main and replace only the Temon production container."""
import argparse
import fcntl
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import time

ROOT = Path('/opt/temon-production')
SOURCE = ROOT / 'source-repo'
REMOTE = 'https://github.com/lsk7209/temon.git'
ENV = ROOT / '.env'
SECRETS = ROOT / '.env.production'
COMPOSE = ROOT / 'compose.production.yaml'
PUBLIC = ROOT / 'public-build.json'
ENABLED = ROOT / 'auto-deploy-enabled'
DEPLOY_LOCK = Path('/run/temon-production-deploy.lock')
PUBLISH_LOCK = Path('/run/temon-publish.lock')
CONTAINER = 'temon-production-web-1'
MIN_MEMORY_KIB = 8 * 1024 * 1024
MIN_DISK_BYTES = 12 * 1024 ** 3
BUILD_KEYS = {'NEXT_PUBLIC_TEMON_STAGING', 'NEXT_PUBLIC_APP_URL', 'NEXT_PUBLIC_GA_MEASUREMENT_ID',
              'NEXT_PUBLIC_CLARITY_ID', 'NEXT_PUBLIC_ADSENSE_PUB_ID', 'NEXT_PUBLIC_ADSENSE_CLIENT_ID',
              'NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID', 'NEXT_PUBLIC_ADSENSE_DELIVERY_ENABLED',
              'NEXT_PUBLIC_ANALYTICS_CONSENT_MODE'}


def run(*args, cwd=None, timeout=900, env=None):
    try:
        return subprocess.run(args, cwd=cwd, check=True, text=True, stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE, timeout=timeout, env=env).stdout.strip()
    except subprocess.CalledProcessError as error:
        # Do not print argv, URLs, provider responses or arbitrary build output.
        category = Path(args[0]).name
        detail = 'resource_oom' if any(term in (error.stderr or '') for term in ('OOMKilled', 'exit code: 137', 'Killed')) else 'command_failed'
        raise RuntimeError(f'{category} {detail} exit={error.returncode}') from None
    except subprocess.TimeoutExpired:
        raise RuntimeError(f'{Path(args[0]).name} timeout seconds={timeout}') from None


def git(*args, cwd=None, timeout=180):
    # The repository is public; never consult a host credential helper.
    environment = {**os.environ, 'GIT_TERMINAL_PROMPT': '0', 'GIT_ASKPASS': '/bin/false'}
    return run('git', '-c', 'credential.helper=', *args, cwd=cwd, timeout=timeout, env=environment)


def event(outcome, **fields):
    print(json.dumps({'event': 'temon_deploy', 'outcome': outcome, **fields}, sort_keys=True), flush=True)


def lock(path):
    fd = os.open(path, os.O_CREAT | os.O_RDWR, 0o600)
    try:
        fcntl.flock(fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        os.close(fd)
        return None
    return fd


def prerequisites():
    for path in (COMPOSE, PUBLIC, SECRETS, ENV):
        if not path.is_file():
            raise RuntimeError(f'missing {path.name}')
    if SECRETS.stat().st_mode & 0o077:
        raise RuntimeError('.env.production must be private (mode 0600)')
    public = json.loads(PUBLIC.read_text())
    if not isinstance(public, dict) or set(public) - BUILD_KEYS or any(not isinstance(v, str) for v in public.values()):
        raise RuntimeError('invalid public-build.json keys or values')
    if public.get('NEXT_PUBLIC_TEMON_STAGING') != 'false' or public.get('NEXT_PUBLIC_APP_URL') != 'https://temon.kr':
        raise RuntimeError('production public build flags are required')
    old = ENV.read_bytes()
    lines = [line.strip() for line in old.splitlines() if line.strip() and not line.lstrip().startswith(b'#')]
    if len(lines) != 3 or any(not re.fullmatch(rb'(TEMON_IMAGE|APP_REVISION|CACHE_REVISION)=[^\r\n]+', line) for line in lines):
        raise RuntimeError('.env may contain only three nonsecret deployment values')
    values = dict(re.findall(rb'^(TEMON_IMAGE|APP_REVISION|CACHE_REVISION)=([^\r\n]*)$', old, re.M))
    if len(values) != 3 or any(not v for v in values.values()):
        raise RuntimeError('.env needs TEMON_IMAGE, APP_REVISION, CACHE_REVISION')
    return old, {k.decode(): v.decode() for k, v in values.items()}


def resources():
    memory = int(re.search(r'^MemAvailable:\s+(\d+)', Path('/proc/meminfo').read_text(), re.M).group(1))
    free = shutil.disk_usage(ROOT).free
    if memory < MIN_MEMORY_KIB or free < MIN_DISK_BYTES:
        raise RuntimeError(f'insufficient build headroom: availableKiB={memory} diskFreeBytes={free}')


def write_env(data):
    fd, name = tempfile.mkstemp(prefix='.deploy-env-', dir=ROOT)
    try:
        os.fchmod(fd, 0o600)
        with os.fdopen(fd, 'wb') as out:
            out.write(data)
            out.flush()
            os.fsync(out.fileno())
        os.replace(name, ENV)
    finally:
        if os.path.exists(name):
            os.unlink(name)


def compose(*args, timeout=180):
    return run('docker', 'compose', '-p', 'temon-production', '-f', str(COMPOSE), *args,
               cwd=ROOT, timeout=timeout)


def healthy(revision):
    for _ in range(12):
        try:
            state = json.loads(run('docker', 'inspect', CONTAINER, '--format', '{{json .State}}', timeout=15))
            actual = json.loads(run('docker', 'exec', CONTAINER, 'node', '-e',
                                    "fetch('http://127.0.0.1:3000/api/health').then(r=>r.json()).then(v=>console.log(JSON.stringify(v)))",
                                    timeout=15))
            if state.get('Running') and state.get('Health', {}).get('Status') == 'healthy' and actual.get('revision') == revision:
                return True
        except (RuntimeError, subprocess.CalledProcessError, subprocess.TimeoutExpired, json.JSONDecodeError):
            pass
        time.sleep(5)
    return False


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true', help='read-only readiness check')
    args = parser.parse_args()
    if not ENABLED.exists():
        event('disabled')
        return 0
    old_env, current = prerequisites()
    if args.check:
        event('ready', deployed=current['APP_REVISION'])
        return 0
    fd = lock(DEPLOY_LOCK)
    if fd is None:
        event('busy')
        return 0
    try:
        if not SOURCE.exists():
            git('clone', '--filter=blob:none', '--branch', 'main', '--single-branch', REMOTE, str(SOURCE))
        if git('remote', 'get-url', 'origin', cwd=SOURCE) != REMOTE:
            raise RuntimeError('source remote mismatch')
        if git('status', '--porcelain', cwd=SOURCE):
            raise RuntimeError('source checkout is dirty')
        git('fetch', '--no-tags', 'origin', 'main', cwd=SOURCE)
        revision = git('rev-parse', 'FETCH_HEAD^{commit}', cwd=SOURCE)
        if not re.fullmatch(r'[0-9a-f]{40}', revision):
            raise RuntimeError('invalid commit')
        if revision == current['APP_REVISION']:
            event('current', revision=revision)
            return 0
        resources()
        # The initial image may contain local migration edits. Deploy only after main includes the reviewed files.
        prior_commit = current['APP_REVISION'][:40]
        if re.fullmatch(r'[0-9a-f]{40}', prior_commit):
            git('merge-base', '--is-ancestor', prior_commit, revision, cwd=SOURCE)
        git('checkout', '--detach', revision, cwd=SOURCE)
        for required in ('Dockerfile', 'compose.production.yaml', 'scripts/deploy-vps-production.py'):
            if not (SOURCE / required).is_file():
                raise RuntimeError(f'main lacks {required}')
        image = f'temon-ovh:production-{revision[:16]}'
        cache = revision[:16]
        run('python3', str(ROOT / 'scripts/build-production-image.py'), str(SOURCE), str(PUBLIC), image, timeout=1800)
        # A new cache has no previous-build artifacts and must be writable by the image's uid 1000.
        volume = f'temon-production-cache-{cache}'
        run('docker', 'volume', 'create', volume)
        run('docker', 'run', '--rm', '--user', '0', '--entrypoint', 'chown',
            '--mount', f'type=volume,source={volume},target=/app/.next/cache',
            image, '-R', '1000:1000', '/app/.next/cache', timeout=90)
        publisher = lock(PUBLISH_LOCK)
        if publisher is None:
            event('publisher_busy', revision=revision)
            return 0
        try:
            if ENV.read_bytes() != old_env:
                raise RuntimeError('runtime .env changed during build')
            new_env = f'TEMON_IMAGE={image}\nAPP_REVISION={revision}\nCACHE_REVISION={cache}\n'.encode()
            write_env(new_env)
            try:
                compose('up', '-d', '--no-deps', '--wait', '--wait-timeout', '120', 'web', timeout=180)
                if not healthy(revision):
                    raise RuntimeError('new container health/revision mismatch')
            except Exception as primary_error:
                try:
                    write_env(old_env)
                    compose('up', '-d', '--no-deps', '--wait', '--wait-timeout', '120', 'web', timeout=180)
                    if not healthy(current['APP_REVISION']):
                        raise RuntimeError('rollback health failed')
                except Exception as rollback_error:
                    raise RuntimeError(f'deployment failed ({primary_error}); rollback failed ({rollback_error})') from None
                raise RuntimeError(f'deployment failed ({primary_error}); previous image restored')
        finally:
            os.close(publisher)
        event('deployed', revision=revision, image=image)
        return 0
    finally:
        os.close(fd)


if __name__ == '__main__':
    try:
        sys.exit(main())
    except Exception as error:
        event('failed', reason=str(error)[:240])
        sys.exit(1)
