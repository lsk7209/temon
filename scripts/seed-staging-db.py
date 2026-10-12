"""Create synthetic local SQLite only; never accept a remote database URL."""
import pathlib
import sqlite3
import sys

target = pathlib.Path(sys.argv[1]).resolve()
if target.name != 'staging.db' or target.exists():
    raise SystemExit('Requires a new file named staging.db')
target.parent.mkdir(parents=True, exist_ok=True)
root = pathlib.Path(__file__).resolve().parents[1]
with sqlite3.connect(target) as db:
    db.executescript((root / 'lib/db/migrations/001_initial_schema.sql').read_text(encoding='utf-8'))
    db.execute('ALTER TABLE tests ADD COLUMN published_at INTEGER')
    db.executescript((root / 'lib/db/migrations/0003_result_attempts.sql').read_text(encoding='utf-8'))
    db.execute("INSERT INTO tests(id,slug,title,status,question_count) VALUES ('staging-mbti','staging-mbti','격리 검증용 MBTI','published',4)")
    for i, (a, b) in enumerate([('E','I'),('S','N'),('T','F'),('J','P')]):
        db.execute('INSERT INTO questions VALUES (?,?,?,?,?,?,?,?)', (f'q{i}', 'staging-mbti', i, f'검증 질문 {i+1}', a, f'["{a}"]', b, f'["{b}"]'))
    for a in 'EI':
        for b in 'SN':
            for c in 'TF':
                for d in 'JP':
                    code = a+b+c+d
                    db.execute('INSERT INTO result_types(id,test_id,type_code,label) VALUES (?,?,?,?)', (code,'staging-mbti',code,code))
print('SYNTHETIC_STAGING_DATABASE_CREATED')
