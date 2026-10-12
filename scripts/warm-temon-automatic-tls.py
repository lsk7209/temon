"""Obtain Temon managed certificates while existing valid manual TLS remains loaded."""
import json
from pathlib import Path
import subprocess

container = 'todaypharm-production-ingress-1'
def command(*args):
    return subprocess.run(args, check=True, capture_output=True, text=True).stdout
configuration = json.loads(command('docker','exec',container,'caddy','adapt','--config','/etc/caddy/Caddyfile','--adapter','caddyfile'))
certificates = configuration.setdefault('apps',{}).setdefault('tls',{}).setdefault('certificates',{})
names = certificates.setdefault('automate',[])
for name in ['temon.kr','www.temon.kr']:
    if name not in names:
        names.append(name)
candidate = Path('/opt/temon-production/Caddyfile.tls-warm.json')
candidate.write_text(json.dumps(configuration))
command('docker','cp',str(candidate),container+':/tmp/temon-tls-warm.json')
command('docker','exec',container,'caddy','validate','--config','/tmp/temon-tls-warm.json')
command('docker','exec',container,'caddy','reload','--config','/tmp/temon-tls-warm.json')
print('TEMON_AUTOMATIC_TLS_WARMING_MANUAL_CERT_RETAINED')
