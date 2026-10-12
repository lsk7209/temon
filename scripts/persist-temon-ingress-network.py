"""Persist only the already-attached Temon network; never recreate shared ingress."""
from pathlib import Path
import subprocess

target = Path('/opt/todaypharm-production/compose.ingress.yml')
original = target.read_bytes()
if b'    name: temon_runtime\n' in original:
    print('TEMON_INGRESS_NETWORK_ALREADY_PERSISTED')
else:
    assert original.count(b'      - localgeo\n') == 1
    assert original.count(b'networks:\n  localgeo:\n') == 1
    updated = original.replace(b'      - localgeo\n', b'      - localgeo\n      - temon\n')
    updated = updated.replace(b'networks:\n  localgeo:\n', b'networks:\n  temon:\n    external: true\n    name: temon_runtime\n  localgeo:\n')
    candidate = target.with_name('compose.ingress.temon-candidate.yml')
    candidate.write_bytes(updated)
    try:
        subprocess.run(['docker', 'compose', '-p', 'todaypharm-production', '-f', str(candidate), 'config', '--quiet'], check=True)
        assert target.read_bytes() == original, 'Concurrent ingress configuration edit'
        backup = Path('/opt/temon-production/recovery/compose.ingress.pre-temon.yml')
        with backup.open('xb') as stream:
            stream.write(original)
        target.write_bytes(updated)
    finally:
        candidate.unlink(missing_ok=True)
    print('TEMON_INGRESS_NETWORK_PERSISTED_WITHOUT_RESTART')
