import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setSeed, norm, todayStr, addDays } from '../src/core/text.js';
import { PROFILES } from '../src/lang/registry.js';
import { registry } from '../src/exercises/index.js';
import { buildForLesson, buildReviewSession, buildDrill, makeCtx } from '../src/core/builders.js';
import { createSession, current, record, advance, finish, abandon, snapshot, restore, progressPct } from '../src/core/session.js';
import { defaultState, emptyLang } from '../src/core/migrations.js';
import { gradeItem } from '../src/core/srs.js';

const p = PROFILES.vi;
const today = '2026-09-20';
setSeed(7);

function checkContract(ex, lessonId) {
  const d = registry[ex.type];
  assert.ok(d, 'unbekannter Typ ' + ex.type);
  if (ex.type === 'choose') {
    assert.equal(ex.options.length, 4, 'vier Optionen ' + lessonId);
    assert.ok(ex.options.some(o => o.id === ex.itemId), 'richtige Option fehlt ' + ex.itemId);
    assert.equal(new Set(ex.options.map(o => norm(o.text))).size, 4, 'Optionen nicht eindeutig ' + ex.itemId);
  } else if (ex.type === 'tiles') {
    assert.ok(ex.target.length >= 3, 'Kacheln erst ab 3 Teilen ' + ex.itemId);
    const tw = ex.tiles.map(t => norm(t.w));
    ex.target.forEach(w => assert.ok(tw.includes(norm(w)), 'Kachel fehlt ' + w));
    assert.ok(ex.tiles.length > ex.target.length, 'keine Extra-Kacheln ' + ex.itemId);
  } else if (ex.type === 'script_listen') {
    assert.ok(ex.options.length >= 2 && ex.answer < ex.options.length && ex.speak === ex.options[ex.answer]);
  }
  assert.deepEqual(JSON.parse(JSON.stringify(ex)), ex, 'nicht serialisierbar ' + ex.type);
}

test('jede Lektion ergibt eine gültige Session (neu und wiederholt)', () => {
  const ls = emptyLang();
  for (const e of p.lessons) {
    for (const repeat of [false, true]) {
      const s = buildForLesson(p, ls, e.lesson, { repeat, allowSpeak: true, today });
      assert.ok(s.exercises.length >= 6, 'zu kurz ' + e.lesson.id);
      s.exercises.forEach(ex => checkContract(ex, e.lesson.id));
      if (e.lesson.type !== 'script') {
        const intros = s.exercises.filter(x => x.type === 'intro').length;
        assert.equal(intros, repeat ? 0 : e.lesson.items.length, 'Intro-Anzahl ' + e.lesson.id);
      } else if (!repeat) {
        assert.equal(s.exercises.filter(x => x.type === 'script_intro').length, 6);
        assert.equal(s.exercises[0].type, 'script_overview');
      }
    }
  }
});
test('ohne Stimme keine Hörübungen', () => {
  const ls = emptyLang();
  for (const e of p.lessons.filter(e => e.lesson.type !== 'script')) {
    const s = buildForLesson(p, ls, e.lesson, { allowListen: false, today });
    assert.ok(!s.exercises.some(x => x.type === 'choose' && x.dir === 'listen'), 'listen trotz allowListen=false in ' + e.lesson.id);
  }
});
test('Wiederholung: leer ohne gelernte Wörter, sonst bis 12', () => {
  const ls = emptyLang();
  assert.equal(buildReviewSession(p, ls, { today }).exercises.length, 0);
  p.allItems.slice(0, 20).forEach(it => gradeItem(ls, it.id, false, '2026-09-01'));
  const s = buildReviewSession(p, ls, { today });
  assert.equal(s.exercises.length, 12);
  s.exercises.forEach(ex => checkContract(ex, 'review'));
});
test('Ton-Training', () => {
  const s = buildDrill(p, emptyLang(), 'tones', 10);
  assert.equal(s.exercises.length, 10);
  s.exercises.forEach(ex => checkContract(ex, 'drill'));
});

function play(def, state, ls, answerFn) {
  const s = createSession(def, 'vi');
  const ctx = makeCtx(p, ls);
  let guard = 0;
  while (guard++ < 500) {
    const ex = current(s); const d = registry[ex.type];
    if (!d.card) { const res = answerFn(ex, s); if (res) record(s, ex, res, ctx); }
    if (advance(s) === 'finished') break;
  }
  return { s, done: finish(s, state, ls, today) };
}
test('Session komplett richtig: Fortschritt, XP, Log', () => {
  const state = defaultState(); const ls = emptyLang(); state.langs.vi = ls;
  const lesson = p.lessonById('u1l1');
  const def = buildForLesson(p, ls, lesson, { today });
  const { s, done } = play(def, state, ls, ex => ex.type === 'speak' ? null : { correct: true });
  assert.equal(done.xp, 15); assert.ok(done.perfect); assert.equal(done.accuracy, 100);
  assert.ok(ls.lessons.u1l1.done && ls.lessons.u1l1.count === 1 && ls.lessons.u1l1.best === 100);
  lesson.items.forEach(it => { const st = ls.items[it.id]; assert.ok(st, 'nicht bewertet ' + it.id); assert.equal(st.step, 1); assert.equal(st.due, addDays(today, 1)); });
  assert.equal(state.days[today].xp, 15); assert.equal(state.days[today].vi, 15);
  assert.equal(ls.sessions.length, 1); assert.equal(ls.sessions[0].k, 'lesson');
  assert.equal(state.pending, null);
  assert.equal(progressPct(s), 100);
});
test('Session mit Fehlern: Wiederholung in der Queue, Deckel, Bewertung', () => {
  const state = defaultState(); const ls = emptyLang(); state.langs.vi = ls;
  const def = buildForLesson(p, ls, p.lessonById('u2l1'), { today });
  const before = def.exercises.length;
  const { s, done } = play(def, state, ls, ex => ex.type === 'speak' ? null : { correct: false });
  assert.ok(s.queue.length > before, 'Fehler wurden nicht angehängt');
  assert.ok(s.queue.length - before <= 3 * Object.keys(s.fails).length, 'mehr als drei Wiederholungen pro Wort');
  assert.equal(done.xp, 10); assert.ok(!done.perfect);
  p.lessonById('u2l1').items.forEach(it => { assert.equal(ls.items[it.id].step, 1); assert.ok(ls.items[it.id].wrong >= 1); });
});
test('Abbruch bewertet beantwortete Wörter, gibt keine XP', () => {
  const state = defaultState(); const ls = emptyLang(); state.langs.vi = ls;
  const def = buildForLesson(p, ls, p.lessonById('u1l2'), { today });
  const s = createSession(def, 'vi'); const ctx = makeCtx(p, ls);
  for (let i = 0; i < 6; i++) { const ex = current(s); if (!registry[ex.type].card) record(s, ex, { correct: true }, ctx); advance(s); }
  state.pending = snapshot(s);
  abandon(s, state, ls, today);
  assert.equal(state.pending, null);
  assert.ok(Object.keys(ls.items).length >= 1);
  assert.equal(state.days[today], undefined);
});
test('Snapshot und Wiederherstellung', () => {
  const ls = emptyLang();
  const def = buildForLesson(p, ls, p.lessonById('u3l1'), { today });
  const s = createSession(def, 'vi'); const ctx = makeCtx(p, ls);
  for (let i = 0; i < 4; i++) { const ex = current(s); if (!registry[ex.type].card) record(s, ex, { correct: i % 2 === 0 }, ctx); advance(s); }
  const snap = JSON.parse(JSON.stringify(snapshot(s)));
  const r = restore(snap);
  assert.equal(r.idx, s.idx); assert.equal(r.queue.length, s.queue.length);
  assert.deepEqual(current(r), current(s)); assert.equal(r.answered, s.answered); assert.deepEqual(r.results, s.results);
});
test('Auswahl-Distraktoren nie mit gleichem Zieltext', () => {
  const ctx = makeCtx(p, emptyLang());
  for (let i = 0; i < 30; i++) {
    const ex = registry.choose.make(p.items.n0, ctx, { dir: 't2de' });
    assert.ok(!ex.options.some(o => o.id === 'khong'), 'không (Nein) als Distraktor für không (0)');
  }
});
