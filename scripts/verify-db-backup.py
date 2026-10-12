import json, pathlib, sqlite3, sys
source = pathlib.Path(sys.argv[1]).resolve()
target = pathlib.Path(sys.argv[2]).resolve()
if target.exists():
    raise SystemExit('Restore target must be new')
manifest = json.loads(pathlib.Path(str(source) + '.manifest.json').read_text())
connection = sqlite3.connect(target)
connection.executescript(source.read_text(encoding='utf-8'))
integrity = connection.execute('PRAGMA integrity_check').fetchone()[0]
foreign_key_errors = len(connection.execute('PRAGMA foreign_key_check').fetchall())
counts = {table: connection.execute('SELECT count(*) FROM "' + table.replace('"', '""') + '"').fetchone()[0] for table in manifest['counts']}
assert integrity == 'ok' and foreign_key_errors == 0 and counts == manifest['counts']
connection.close()
print('RESTORE_PASS', integrity, 'foreign_key_errors=0', json.dumps(counts))
