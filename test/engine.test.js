import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setSeed, norm, todayStr, addDays } from '../src/core/text.js';
import { PROFILES } from '../src/lang/registry.js';
import { registry } from '../src/exercises/index.js';
import { buildForLesson, buildReviewSession, buildDrill, buildWelcomeBack, buildQuickRound, buildListenOnly, makeCtx } from '../src/core/builders.js';
import { reconcileLessons } from '../src/core/progress.js';
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
  } else if (ex.type === 'script_recognize') {
    assert.equal(ex.options.length, 4); assert.equal(new Set(ex.options).size, 4, 'Umschriften eindeutig ' + ex.glyph); assert.ok(ex.answer >= 0 && ex.answer < 4 && ex.glyph && ex.speak);
  } else if (ex.type === 'script_build') {
    assert.ok(ex.target.length >= 2 && ex.tiles.length > ex.target.length && ex.roman && ex.glyph);
    ex.target.forEach(w => assert.ok(ex.tiles.some(t => t.w === w), 'Baustein fehlt ' + w));
  } else if (ex.type === 'match') {
    assert.ok(ex.itemIds.length >= 3 && ex.left.length === ex.itemIds.length && ex.right.length === ex.itemIds.length);
    assert.deepEqual(ex.left.map(o => o.id).sort(), ex.itemIds.slice().sort());
  } else if (ex.type === 'cloze') {
    assert.ok(ex.seg.length >= 3 && ex.gap > 0 && ex.gap < ex.seg.length, 'Lücke ' + ex.itemId);
    assert.equal(ex.options.length, 3); assert.equal(new Set(ex.options.map(norm)).size, 3, 'Lücken-Optionen ' + ex.itemId);
    assert.equal(ex.options[ex.answer], ex.seg[ex.gap]);
  }
  assert.deepEqual(JSON.parse(JSON.stringify(ex)), ex, 'nicht serialisierbar ' + ex.type);
}

for (const p of Object.values(PROFILES)) test(`${p.code}: jede Lektion ergibt eine gültige Session (neu und wiederholt)`, () => {
  const ls = emptyLang();
  for (const e of p.lessons) {
    for (const repeat of [false, true]) {
      const s = buildForLesson(p, ls, e.lesson, { repeat, allowSpeak: true, today });
      assert.ok(s.exercises.length >= 6, 'zu kurz ' + e.lesson.id);
      s.exercises.forEach(ex => checkContract(ex, e.lesson.id));
      if (e.lesson.type !== 'script') {
        const intros = s.exercises.filter(x => x.type === 'intro').length;
        assert.equal(intros, repeat ? 0 : e.lesson.items.length, 'Intro-Anzahl ' + e.lesson.id);
        if (!repeat && e.lesson.tip) assert.equal(s.exercises[0].type, 'tip', 'Tipp zuerst ' + e.lesson.id);
        if (repeat) assert.ok(!s.exercises.some(x => x.type === 'tip'));
        if (e.lesson.type === 'understand') assert.ok(s.exercises.every(x => x.type === 'intro' || x.type === 'tip' || (x.type === 'choose' && x.dir !== 'de2t') || x.type === 'match'), 'Verstehen-Lektion nur erkennen ' + e.lesson.id);
        assert.ok(s.exercises.length <= 30, 'zu lang ' + e.lesson.id + ' ' + s.exercises.length);
      } else if (!repeat && e.lesson.plugin === 'tones') {
        assert.equal(s.exercises.filter(x => x.type === 'script_intro').length, 6);
        assert.equal(s.exercises[0].type, 'script_overview');
      } else if (e.lesson.plugin === 'hangul') {
        assert.ok(s.exercises.some(x => x.type === 'script_recognize'), 'Hangul: lesen ' + e.lesson.id);
        assert.ok(s.exercises.some(x => x.type === 'script_listen'), 'Hangul: hören ' + e.lesson.id);
        assert.ok(s.exercises.some(x => x.type === 'script_build'), 'Hangul: bauen ' + e.lesson.id);
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
  assert.equal(s.exercises.length, 8, 'Zuordnung mit 5 plus 7 einzelne');
  assert.equal(new Set(s.exercises.flatMap(ex => ex.itemIds || [ex.itemId])).size, 12);
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
  return { s, done: finish(s, state, ls, today, p) };
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
  assert.ok(!state.days[today] || state.days[today].xp <= 6, 'höchstens 6 XP bei Abbruch');
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

test('Tonwort-Übung wird eingestreut', () => {
  const ls = emptyLang();
  const s = buildForLesson(p, ls, p.lessonById('u1l1'), { toneWords: true, today });
  assert.ok(s.exercises.some(x => x.type === 'script_listen' && x.prompt === 'Welches Wort hörst du?'));
});
test('Wiederholung beginnt mit Zuordnung, wenn genug fällig ist', () => {
  const ls = emptyLang();
  p.allItems.slice(0, 20).forEach(it => gradeItem(ls, it.id, false, '2026-09-01'));
  const s = buildReviewSession(p, ls, { today });
  assert.equal(s.exercises[0].type, 'match'); assert.equal(s.exercises.length, 8);
});
test('Willkommen zurück: klein, nur erkennen, keine Wiederholung von Fehlern', () => {
  const state = defaultState(); const ls = emptyLang(); state.langs.vi = ls;
  p.allItems.slice(0, 10).forEach(it => gradeItem(ls, it.id, false, '2026-08-01'));
  const def = buildWelcomeBack(p, ls, {});
  assert.ok(def.noRequeue); assert.equal(def.exercises[0].type, 'match'); assert.equal(def.exercises.length, 4);
  const { s } = play(def, state, ls, () => ({ correct: false }));
  assert.equal(s.queue.length, def.exercises.length, 'keine Requeues');
});
test('Zuordnung bewertet pro Wort', () => {
  const state = defaultState(); const ls = emptyLang(); state.langs.vi = ls;
  const items = p.allItems.slice(0, 5);
  const def = { kind: 'review', lessonId: null, title: 'x', exercises: [registry.match.make(items, makeCtx(p, ls))], xp: 10 };
  const s = createSession(def, 'vi');
  record(s, current(s), { correct: true, perItem: { [items[0].id]: true, [items[1].id]: false }, noRequeue: true }, makeCtx(p, ls));
  assert.equal(s.results[items[0].id].wrong, 1); assert.equal(s.results[items[1].id].wrong, 0); assert.ok(s.anyWrong);
  finish(s, state, ls, today);
  assert.equal(ls.items[items[0].id].step, 1); assert.equal(ls.items[items[1].id].step, 1);
});
test('Lektions-Flags werden mit neuer Datenversion abgeglichen', () => {
  const ls = emptyLang();
  ls.lessons = { u1l3: { done: true, count: 3 } }; // alte Flagge mit anderem Inhalt
  ls.plugins.tones = { done: true };
  p.itemsOf('u1l1').forEach(it => gradeItem(ls, it.id, false, today));
  assert.ok(reconcileLessons(p, ls));
  assert.ok(!ls.lessons.u1l3, 'alte Flagge muss weg');
  assert.ok(ls.lessons.u1l1 && ls.lessons.u1l1.done, 'komplett gelernte Lektion gilt als erledigt');
  assert.ok(ls.lessons.u1l0 && ls.lessons.u1l0.done, 'Ton-Lektion über Plugin');
  assert.equal(ls.dataVersion, p.data.version);
  assert.equal(reconcileLessons(p, ls), false, 'idempotent');
});

test('Meilensteine: erste Lektion und Einheit fertig', () => {
  const state = defaultState(); const ls = emptyLang(); state.langs.vi = ls;
  const unit = p.data.units[0];
  let done;
  unit.lessons.forEach(l => { const def = buildForLesson(p, ls, l, { today }); ({ done } = play(def, state, ls, ex => ex.type === 'speak' ? null : { correct: true })); });
  assert.ok(done.milestones.some(m => m.title.includes('Einheit')), JSON.stringify(done.milestones));
  assert.ok(done.milestones.some(m => m.text.includes('grüßen')));
  assert.equal(typeof done.due, 'number');
});
test('Abbruch: Teil-Gutschrift', () => {
  const state = defaultState(); const ls = emptyLang(); state.langs.vi = ls;
  const def = buildForLesson(p, ls, p.lessonById('u2l2'), { today });
  const s = createSession(def, 'vi'); const ctx = makeCtx(p, ls);
  for (let i = 0; i < 12; i++) { const ex = current(s); if (!registry[ex.type].card) record(s, ex, { correct: true }, ctx); advance(s); }
  const xp = abandon(s, state, ls, today);
  assert.ok(xp >= 1 && xp <= 6, 'xp ' + xp); assert.equal(state.days[today].xp, xp);
});
test('Schnellrunde und Nur hören', () => {
  const ls = emptyLang();
  p.allItems.slice(0, 10).forEach(it => gradeItem(ls, it.id, false, '2026-09-01'));
  const q = buildQuickRound(p, ls, { today }); assert.equal(q.exercises.length, 6); q.exercises.forEach(ex => checkContract(ex, 'quick'));
  const l = buildListenOnly(p, ls, {}); assert.equal(l.exercises.length, 8); assert.ok(l.exercises.every(ex => ex.type === 'choose' && ex.dir === 'listen'));
});

test('Hangul: Silben zusammensetzen und Plugin-Training', async () => {
  const H = await import('../data/hangul.js');
  assert.equal(H.compose('ㄱ', 'ㅏ', 'ㅁ'), '감'); assert.equal(H.compose('ㅇ', 'ㅓ', ''), '어'); assert.deepEqual(H.decompose('강'), { l: 'ㄱ', v: 'ㅏ', t: 'ㅇ' });
  const ko = PROFILES.ko; const plugin = ko.plugins.hangul;
  assert.equal(plugin.compose(['ㄱ', 'ㅏ', 'ㅁ']), '감'); assert.equal(plugin.compose(['ㄱ']), 'ㄱ'); assert.equal(plugin.compose(['ㄱ', 'ㅏ']), '가');
  const d = buildDrill(ko, emptyLang(), 'hangul', 10); assert.equal(d.exercises.length, 10); d.exercises.forEach(ex => checkContract(ex, 'hangul-drill'));
  // Fertig erst nach allen fünf Lektionen, dann wird die Umschrift ausgeblendet
  const state = defaultState(); const ls = emptyLang(); state.langs.ko = ls; state.activeLang = 'ko';
  const lessons = ko.lessons.filter(e => e.lesson.plugin === 'hangul');
  let done;
  lessons.forEach((e, i) => {
    const def = buildForLesson(ko, ls, e.lesson, { today });
    const s = createSession(def, 'ko'); const ctx = makeCtx(ko, ls);
    while (true) { const ex = current(s); if (!registry[ex.type].card) record(s, ex, { correct: true }, ctx); if (advance(s) === 'finished') break; }
    done = finish(s, state, ls, today, ko);
    assert.equal(!!ls.plugins.hangul.done, i === lessons.length - 1, 'Plugin fertig nach Lektion ' + (i + 1));
  });
  assert.equal(state.settings.showRoman, false);
  assert.ok(done.milestones.some(m => m.title === 'Schrift geschafft'));
});
test('Koreanisch: Sprechvergleich ohne Leerzeichen', () => {
  const ko = PROFILES.ko;
  assert.equal(ko.speechMatch(ko.items['ko-cheoncheonhi'], ['천천히말해주세요']).correct, true);
  assert.equal(ko.speechMatch(ko.items['ko-gamsa'], ['고맙습니다']).correct, true);
  assert.equal(ko.speechMatch(ko.items['ko-gamsa'], ['안녕하세요']).correct, false);
});
