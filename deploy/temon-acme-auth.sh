#!/bin/sh
set -eu
case "$CERTBOT_DOMAIN" in temon.kr|www.temon.kr) ;; *) exit 1 ;; esac
umask 077
root=/opt/temon-production/acme
mkdir -p "$root"
printf '%s\n' "$CERTBOT_VALIDATION" > "$root/challenge-$CERTBOT_DOMAIN"
for attempt in $(seq 1 240); do
  if [ -f "$root/approved-$CERTBOT_DOMAIN" ]; then exit 0; fi
  sleep 5
done
exit 1
