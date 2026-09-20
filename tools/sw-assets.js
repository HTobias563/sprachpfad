// Schreibt die Liste aller App-Dateien in sw.js (Precache). Aufruf: node tools/sw-assets.js
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['test', 'tools', 'docs', 'node_modules', '.git']);
const SKIP_FILES = new Set(['sw.js', 'README.md', 'deploy.sh', 'package.json', '.gitignore', '.nojekyll', '.DS_Store']);
function walk(dir, out) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const rel = relative(root, p);
    if (statSync(p).isDirectory()) { if (!SKIP_DIRS.has(name)) walk(p, out); }
    else if (!SKIP_FILES.has(name) && !name.startsWith('.')) out.push('./' + rel.split('\\').join('/'));
  }
}
export function assetList() { const out = []; walk(root, out); out.sort(); return ['./'].concat(out); }
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const list = assetList();
  const p = join(root, 'sw.js');
  const src = readFileSync(p, 'utf8');
  const next = src.replace(/const ASSETS = \[[\s\S]*?\];/, 'const ASSETS = [' + list.map(a => `'${a}'`).join(', ') + '];');
  writeFileSync(p, next);
  console.log('sw.js: ' + list.length + ' Dateien im Precache');
}
