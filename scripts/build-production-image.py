import json, pathlib, subprocess, sys
source, public_file, image = sys.argv[1:]
public = json.loads(pathlib.Path(public_file).read_text())
assert image.startswith('temon-ovh:production-')
arguments = ['docker','build','--memory=5g','--cpu-period=100000','--cpu-quota=300000','-t',image]
for key, value in public.items():
    assert key.startswith('NEXT_PUBLIC_')
    arguments.extend(['--build-arg',key+'='+value])
arguments.append(source)
subprocess.run(arguments, check=True)
