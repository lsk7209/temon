#!/usr/bin/env bash
set -euo pipefail
umask 077

container=temon-production-web-1
source=/opt/temon-production/scripts/backup-production-db.mjs
recovery=/opt/temon-production/recovery
stamp=$(date -u +%Y%m%dT%H%M%SZ)
name="temon-turso-${stamp}.sql"
container_sql="/tmp/${name}"
partial_sql="${recovery}/.${name}.partial"
partial_manifest="${partial_sql}.manifest.json"
final_sql="${recovery}/${name}"
final_manifest="${final_sql}.manifest.json"

if [[ ! -f "$source" || -L "$source" || -L "$recovery" || -e "$final_sql" || -e "$final_manifest" ]]; then
  echo 'TEMon_BACKUP_FAILED: unsafe input or output path' >&2
  exit 1
fi
install -d -m 700 -- "$recovery"
chmod 700 -- "$recovery"

cleanup() {
  rm -f -- "$partial_sql" "$partial_manifest"
  docker exec "$container" rm -f -- "$container_sql" "${container_sql}.manifest.json" >/dev/null 2>&1 || true
}
trap cleanup EXIT

# The script and output path enter the Temon container; Turso credentials stay
# in its environment. No credential value appears in host argv or logs.
docker exec -i "$container" node --input-type=module - - "$container_sql" < "$source"
docker cp "${container}:${container_sql}" "$partial_sql"
docker cp "${container}:${container_sql}.manifest.json" "$partial_manifest"
chmod 600 -- "$partial_sql" "$partial_manifest"

python3 - "$partial_manifest" "$partial_sql" <<'PY'
import hashlib, json, pathlib, sys
manifest = json.loads(pathlib.Path(sys.argv[1]).read_text())
digest = hashlib.sha256()
with open(sys.argv[2], 'rb') as backup:
    for block in iter(lambda: backup.read(1024 * 1024), b''):
        digest.update(block)
if digest.hexdigest() != manifest.get('sha256'):
    raise SystemExit('TEMon_BACKUP_FAILED: manifest checksum mismatch')
PY

ln -- "$partial_sql" "$final_sql"
if ! ln -- "$partial_manifest" "$final_manifest"; then
  rm -f -- "$final_sql"
  exit 1
fi
rm -f -- "$partial_sql" "$partial_manifest"

# Retain seven exact Temon dated SQL+manifest pairs; preserve all other files.
shopt -s nullglob
backups=()
for backup in "$recovery"/temon-turso-*.sql; do
  filename=${backup##*/}
  if [[ -f "$backup" && ! -L "$backup" && "$filename" =~ ^temon-turso-[0-9]{8}T[0-9]{6}Z[.]sql$ ]]; then
    backups+=("$backup")
  fi
done
mapfile -t sorted < <(printf '%s\n' "${backups[@]}" | sort -r)
for ((index = 7; index < ${#sorted[@]}; index++)); do
  rm -f -- "${sorted[index]}" "${sorted[index]}.manifest.json"
done
printf 'TEMon_BACKUP_PASS %s retained=%d\n' "$name" "${#sorted[@]}"
