import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gradeItem, itemStatus, isDue } from '../src/core/srs.js';
import { streak, addXp, todayXp, nextLesson } from '../src/core/progress.js';
import { migrate, defaultState, emptyLang, LADDER } from '../src/core/migrations.js';
import * as store from '../src/core/store.js';
import { PROFILES } from '../src/lang/registry.js';
import { todayStr, addDays } from '../src/core/text.js';

test('Leiter 1 → 3 → 7 → 14 → 30, Fehler zwei Stufen zurück', () => {
  const ls = emptyLang(); let d = '2026-09-20';
  const expect = [1, 3, 7, 14, 30, 30];
  expect.forEach((ivl, i) => { const st = gradeItem(ls, 'x', false, d); assert.equal(st.step, Math.min(5, i + 1)); assert.equal(st.due, addDays(d, ivl)); d = st.due; });
  let st = gradeItem(ls, 'x', true, d); assert.equal(st.step, 3); assert.equal(st.due, addDays(d, 7)); assert.equal(st.ok, 0);
  const ls2 = emptyLang(); st = gradeItem(ls2, 'y', true, d); assert.equal(st.step, 1); assert.equal(st.due, addDays(d, 1));
  assert.equal(LADDER.length, 5);
});
test('Status: seen → learned → solid', () => {
  const ls = emptyLang(); let d = '2026-09-20';
  assert.equal(itemStatus(undefined), 'new');
  let st = gradeItem(ls, 'x', false, d); assert.equal(itemStatus(st), 'seen');
  st = gradeItem(ls, 'x', false, addDays(d, 1)); assert.equal(itemStatus(st), 'learned');
  for (let i = 0; i < 4; i++) st = gradeItem(ls, 'x', false, addDays(d, 10 + i * 20));
  assert.equal(itemStatus(st), 'solid');
  assert.ok(isDue(st, addDays(st.due, 1)) && !isDue(st, addDays(st.due, -1)));
});
test('Serie und XP', () => {
  const s = defaultState(); const T = todayStr();
  assert.equal(streak(s), 0);
  addXp(s, 'vi', 10, addDays(T, -1)); assert.equal(streak(s), 1);
  addXp(s, 'vi', 10, T); addXp(s, 'ko', 5, addDays(T, -2)); assert.equal(streak(s), 3);
  assert.equal(todayXp(s), 10); assert.equal(s.days[T].vi, 10);
  delete s.days[addDays(T, -1)]; assert.equal(streak(s), 1);
});
test('Migration v1 → v2 aus Vorlage', () => {
  const v1 = JSON.parse(readFileSync(new URL('./fixtures/state-v1.json', import.meta.url), 'utf8'));
  const s = migrate(v1);
  assert.equal(s.v, 2); assert.equal(s.activeLang, 'vi'); assert.ok(s.onboardingDone);
  assert.equal(s.settings.goal, 20); assert.equal(s.settings.speak, false); assert.equal(s.settings.theme, 'auto');
  const vi = s.langs.vi;
  assert.deepEqual(Object.keys(vi.items).sort(), ['cam-on', 'n1', 'tam-biet', 'xin-chao']);
  assert.equal(vi.items['xin-chao'].step, 2); assert.equal(vi.items['xin-chao'].due, '2026-09-24');
  assert.equal(vi.items['n1'].step, 3); assert.equal(vi.items['cam-on'].step, 1);
  assert.ok(vi.lessons.u1l1.done && vi.lessons.u1l1.count === 2);
  assert.equal(s.days['2026-09-20'].xp, 30); assert.equal(s.days['2026-09-21'].vi, 10);
  assert.ok(vi.plugins.tones.done);
  assert.equal(s.flags.installHintDismissed, true);
  assert.equal(nextLesson(PROFILES.vi, vi).lesson.id, 'u1l2');
});
test('Store lädt v1 und schreibt v2, v1 bleibt liegen', () => {
  const v1 = readFileSync(new URL('./fixtures/state-v1.json', import.meta.url), 'utf8');
  store._setStorageForTests({ 'sprachpfad.v1': v1 });
  const s = store.load();
  assert.equal(s.v, 2); assert.equal(Object.keys(s.langs.vi.items).length, 4);
  store.update(x => { x.settings.goal = 30; });
  store._setStorageForTests(null); // leer
  assert.equal(store.load().v, 2);
});
test('Kaputter Speicher führt zu frischem Zustand', () => {
  store._setStorageForTests({ 'sprachpfad.v2': '{kaputt' });
  const s = store.load();
  assert.equal(s.v, 2); assert.deepEqual(s.langs, {});
});
test('Zukünftige Version wird abgelehnt', () => { assert.throws(() => migrate({ v: 99 })); });
