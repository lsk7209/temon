"""Enable only the VPS publisher after verifying the Vercel owner is disabled."""
from pathlib import Path
import os

path = Path('/opt/temon-production/.env.production')
original = path.read_bytes()
old = b'TEMON_CRON_ENABLED="false"\n'
new = b'TEMON_CRON_ENABLED="true"\n'
assert b'TEMON_GENERATION_ENABLED="false"\n' in original
assert b'TEMON_CRON_OWNER="vps"\n' in original
assert b'TEMON_CRON_INSTANCE="vps"\n' in original
assert b'GOOGLE_API_KEY=' not in original and b'GOOGLE_GENERATIVE_AI_KEY=' not in original
if new in original:
    print('VPS_PUBLISHER_ALREADY_ENABLED')
else:
    assert original.count(old) == 1
    candidate = path.with_suffix('.production.publisher-next')
    fd = os.open(candidate, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, 'wb') as stream:
        stream.write(original.replace(old,new))
        stream.flush()
        os.fsync(stream.fileno())
    assert path.read_bytes() == original
    os.replace(candidate,path)
    print('VPS_PUBLISHER_FLAG_ENABLED_GENERATION_DISABLED')
