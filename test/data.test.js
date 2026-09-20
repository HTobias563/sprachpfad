// Daten-Linter für alle Sprachpakete
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PROFILES } from '../src/lang/registry.js';
import { norm } from '../src/core/text.js';

for (const p of Object.values(PROFILES)) {
  test(`Sprachpaket ${p.code}: Einträge`, () => {
    const ids = new Set();
    for (const it of p.allItems) {
      assert.ok(!ids.has(it.id), 'doppelte id ' + it.id); ids.add(it.id);
      assert.ok(typeof it.text === 'string' && it.text.trim(), 'text fehlt bei ' + it.id);
      assert.ok(typeof it.de === 'string' && it.de.trim(), 'de fehlt bei ' + it.id);
      assert.equal(it.text, it.text.normalize('NFC'), 'nicht NFC: ' + it.id);
      if (p.code !== 'ja') assert.ok(it.hint, 'hint fehlt bei ' + it.id);
      if (p.code === 'ko') { assert.match(it.text, /^[가-힣0-9\s?!.,]+$/, 'kein Hangul: ' + it.id); assert.ok(it.roman, 'roman fehlt bei ' + it.id); }
      if (it.seg) assert.equal(it.seg.join('').replace(/[\s?？!！。、.,]/g, ''), it.text.replace(/[\s?？!！。、.,]/g, ''), 'seg passt nicht zu text: ' + it.id);
      if (p.code === 'ja') { assert.ok(it.roman, 'roman fehlt bei ' + it.id); if (/[\u4e00-\u9faf]/.test(it.text)) assert.ok(it.reading && /^[\u3040-\u30ff]+$/.test(it.reading.replace(/[\s?？]/g, '')), 'Lesung fehlt oder ist nicht Kana: ' + it.id); }
    }
  });
  test(`Sprachpaket ${p.code}: Lektionen und Einheiten`, () => {
    const lids = new Set();
    for (const u of p.data.units) {
      assert.match(u.color, /^#[0-9a-f]{6}$/i, 'Farbe ' + u.id);
      for (const l of u.lessons) {
        assert.ok(!lids.has(l.id), 'doppelte Lektion ' + l.id); lids.add(l.id);
        if (l.type === 'script') { assert.ok(p.plugins[l.plugin], 'Plugin fehlt: ' + l.plugin); continue; }
        assert.ok(l.items && l.items.length >= 4, 'zu wenig Einträge in ' + l.id);
        const des = new Set(l.items.map(i => norm(i.de)));
        assert.ok(des.size >= 4, 'zu wenig verschiedene Bedeutungen in ' + l.id);
        assert.equal(des.size, l.items.length, 'doppelte Bedeutung in ' + l.id);
        const texts = new Set(l.items.map(i => norm(i.text)));
        assert.equal(texts.size, l.items.length, 'doppelter Text in ' + l.id);
      }
    }
  });
}
