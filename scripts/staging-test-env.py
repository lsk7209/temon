"""Create private synthetic credentials, refuse overwrite; no external secrets."""
import os
import pathlib
import secrets
import sys
target=pathlib.Path(sys.argv[1])
if target != pathlib.Path('/opt/temon-staging/.env.staging'):
    raise SystemExit('Unexpected target')
fd=os.open(target,os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600)
with os.fdopen(fd,'w') as output:
    for name in ['ADMIN_TOKEN','ADMIN_PASSWORD','CRON_SECRET','IP_HASH_SALT']:
        output.write(name+'='+secrets.token_hex(32)+'\n')
print('PRIVATE_SYNTHETIC_CREDENTIAL_FILE_CREATED')
