#!/bin/sh
# Veröffentlicht die aktuelle Version: Cache-Version hochsetzen, committen, pushen.
set -e
cd "$(dirname "$0")"
MSG="${1:-Update}"
V="v$(date +%Y%m%d%H%M%S)"
sed -i '' "s/^const VERSION = '.*';/const VERSION = '$V';/" sw.js
node test/test.js
git add -A
git commit -m "$MSG" -q
git push -q
echo "Veröffentlicht als $V. In etwa einer Minute online."
