#!/bin/sh
# Veröffentlicht die aktuelle Version: Tests, Precache-Liste, Cache-Version, Commit, Push.
# Aufruf: ./deploy.sh "Was sich geändert hat"      (UI=1 ./deploy.sh ... läuft zusätzlich den Chrome-Klicktest)
set -e
cd "$(dirname "$0")"
MSG="${1:-Update}"
node --test test/*.test.js
if [ "${UI:-0}" = "1" ]; then sh test/ui.sh; fi
node tools/sw-assets.js
V="v$(date +%Y%m%d%H%M%S)"
sed -i '' "s/^const VERSION = '.*';/const VERSION = '$V';/" sw.js
git add -A
git commit -qm "$MSG"
git push -q
echo "Veröffentlicht als $V. In etwa einer Minute online; auf dem Handy erscheint dann „Neue Version bereit“."
