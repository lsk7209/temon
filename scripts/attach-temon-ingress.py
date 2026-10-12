import hashlib, pathlib, subprocess
target = pathlib.Path('/opt/todaypharm-production/Caddyfile')
block = pathlib.Path('/opt/temon-production/temon.Caddyfile').read_text()
original = target.read_bytes()
assert b'\ntemon.kr {' not in original, 'Temon route already attached; inspect before changes'
candidate = pathlib.Path('/opt/temon-production/Caddyfile.candidate')
candidate.write_bytes(original + b'\n' + block.encode())
container = 'todaypharm-production-ingress-1'
subprocess.run(['docker','cp',str(candidate),container+':/tmp/temon-Caddyfile'],check=True)
subprocess.run(['docker','exec',container,'caddy','validate','--config','/tmp/temon-Caddyfile','--adapter','caddyfile'],check=True)
assert target.read_bytes() == original, 'Concurrent ingress edit; no write performed'
backup = pathlib.Path('/opt/temon-production/recovery/Caddyfile.before-attach')
with backup.open('xb') as stream:
    stream.write(original)
target.write_bytes(candidate.read_bytes())
try:
    subprocess.run(['docker','exec',container,'caddy','reload','--config','/etc/caddy/Caddyfile','--adapter','caddyfile'],check=True)
except Exception:
    target.write_bytes(original)
    subprocess.run(['docker','exec',container,'caddy','reload','--config','/etc/caddy/Caddyfile','--adapter','caddyfile'],check=True)
    raise
print('TEMON_ONLY_INGRESS_ATTACHED',hashlib.sha256(original).hexdigest(),hashlib.sha256(target.read_bytes()).hexdigest())
