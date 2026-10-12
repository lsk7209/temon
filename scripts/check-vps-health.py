#!/usr/bin/env python3
"""Record Temon container state; restart only after repeated unhealthy probes."""
import fcntl
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import time

CONTAINER = 'temon-production-web-1'
ROOT = Path('/opt/temon-production')
DEPLOY_LOCK = '/run/temon-production-deploy.lock'
PUBLISH_LOCK = '/run/temon-publish.lock'
LAST_RESTART = Path('/run/temon-health-last-restart')


def log(outcome, **fields):
    print(json.dumps({'event': 'temon_health', 'outcome': outcome, **fields}, sort_keys=True), flush=True)


def run(*args):
    return subprocess.run(args, check=True, text=True, capture_output=True, timeout=20).stdout.strip()


def lock(path):
    fd = os.open(path, os.O_CREAT | os.O_RDWR, 0o600)
    try:
        fcntl.flock(fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        os.close(fd)
        return None
    return fd


def inspect():
    data = json.loads(run('docker', 'inspect', CONTAINER, '--format', '{{json .}}'))
    state = data['State']
    return {
        'running': state.get('Running', False),
        'health': (state.get('Health') or {}).get('Status', 'none'),
        'restartCount': data.get('RestartCount', 0),
        'oomKilled': state.get('OOMKilled', False),
        'image': data.get('Image', '')[:24],
    }


def resources():
    mem = next((line.split()[1] for line in Path('/proc/meminfo').read_text().splitlines()
                if line.startswith('MemAvailable:')), '?')
    disk = shutil.disk_usage(ROOT)
    return {'hostAvailableKiB': mem, 'hostDiskFreeBytes': disk.free}


def container_resources():
    try:
        stats = json.loads(run('docker', 'stats', '--no-stream', '--format', '{{json .}}', CONTAINER))
        return {'containerCpu': stats.get('CPUPerc'), 'containerMemory': stats.get('MemUsage')}
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, json.JSONDecodeError):
        return {'containerCpu': None, 'containerMemory': None}


def main():
    fd = lock(DEPLOY_LOCK)
    if fd is None:
        log('deployment_active')
        return 0
    try:
        try:
            state = inspect()
        except (subprocess.CalledProcessError, subprocess.TimeoutExpired, KeyError, json.JSONDecodeError):
            log('container_missing', **resources())
            return 1
        if state['health'] != 'unhealthy':
            log('observed', **state, **resources(), **container_resources())
            return 0 if state['running'] and state['health'] == 'healthy' else 1
        # Avoid a restart during a transient failed check or active publisher request.
        for _ in range(2):
            time.sleep(5)
            state = inspect()
            if state['health'] != 'unhealthy':
                log('recovered', **state, **resources(), **container_resources())
                return 0 if state['health'] == 'healthy' else 1
        now = time.time()
        if LAST_RESTART.exists() and now - LAST_RESTART.stat().st_mtime < 900:
            log('cooldown', **state, **resources(), **container_resources())
            return 1
        publisher = lock(PUBLISH_LOCK)
        if publisher is None:
            log('publisher_active', **state, **resources(), **container_resources())
            return 1
        try:
            LAST_RESTART.touch()
            run('docker', 'restart', '--time', '20', CONTAINER)
            for _ in range(12):
                time.sleep(5)
                state = inspect()
                if state['running'] and state['health'] == 'healthy':
                    log('restarted_healthy', **state, **resources(), **container_resources())
                    return 0
            log('restart_failed', **state, **resources(), **container_resources())
            return 1
        finally:
            os.close(publisher)
    finally:
        os.close(fd)


if __name__ == '__main__':
    try:
        sys.exit(main())
    except Exception as error:
        log('failed', reason=str(error)[:240])
        sys.exit(1)
