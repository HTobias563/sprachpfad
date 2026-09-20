#!/bin/sh
# Klickt sich in Headless Chrome durch mehrere Sessions. Aufruf: sh test/ui.sh
cd "$(dirname "$0")/.."
PORT=8771
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Chrome nicht gefunden, UI-Test übersprungen"; exit 0; }
node tools/serve.js $PORT >/dev/null 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT
sleep 1
OUT="${TMPDIR:-/tmp}/sprachpfad-ui.html"; PROF="${TMPDIR:-/tmp}/sprachpfad-chrome-profile"; rm -rf "$PROF"
perl -e 'alarm 45; exec @ARGV' -- "$CHROME" --headless=new --disable-gpu --no-first-run --no-default-browser-check --disable-sync --disable-background-networking --disable-component-update --user-data-dir="$PROF" --dump-dom "http://127.0.0.1:$PORT/test/ui.html" > "$OUT" 2>/dev/null || true
node -e '
const fs=require("fs"); const d=fs.readFileSync(process.argv[1],"utf8");
const m=d.match(/<pre id="log">([\s\S]*?)<\/pre>/); const log=m?m[1].replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,"\"").replace(/&#39;/g,"\x27"):"";
console.log(log||"(kein Protokoll)");
const ok=/UI-DONE/.test(d)&&/errors=\[\]/.test(log)&&!/FAIL|STUCK|ABORT|EXCEPTION|MISSING/.test(log);
console.log(ok?"UI-Test bestanden":"UI-Test FEHLGESCHLAGEN"); process.exit(ok?0:1);
' "$OUT"
