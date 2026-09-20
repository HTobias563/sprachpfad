// Session-Engine: Warteschlange, Bewertung, Wiederholung falscher Antworten, Abschluss, Snapshot
import { registry } from '../exercises/index.js';
import { gradeItem } from './srs.js';
import { addXp, streak, todayXp } from './progress.js';
import { todayStr } from './text.js';

export function createSession(def, langCode) {
  return { lang: langCode, def, queue: def.exercises.slice(), idx: 0, results: {}, fails: {}, correct: 0, answered: 0, anyWrong: false, ui: {}, startedAt: Date.now(), maxPct: 0 };
}
export function current(s) { return s.queue[s.idx]; }
export function isCard(ex) { const d = registry[ex.type]; return !!(d && d.card); }
export function progressPct(s) {
  const pct = Math.round(100 * s.idx / Math.max(1, s.queue.length));
  s.maxPct = Math.max(s.maxPct || 0, pct);
  return s.maxPct;
}
export function record(s, ex, result, ctx) {
  s.answered++;
  if (result.correct) s.correct++; else s.anyWrong = true;
  if (result.perItem) {
    Object.entries(result.perItem).forEach(([id, wrong]) => {
      const r = s.results[id] || (s.results[id] = { wrong: 0, seen: 0 });
      r.seen++; if (wrong) { r.wrong++; s.anyWrong = true; }
    });
  } else if (ex.itemId) {
    const r = s.results[ex.itemId] || (s.results[ex.itemId] = { wrong: 0, seen: 0 });
    r.seen++; if (!result.correct) r.wrong++;
  }
  if (!result.correct && !result.noRequeue && !s.def.noRequeue) {
    const key = ex.itemId || ex.type;
    const fails = (s.fails[key] = (s.fails[key] || 0) + 1);
    if (fails <= 3) {
      const def = registry[ex.type];
      const again = fails >= 2 && ex.itemId ? registry.choose.make(ctx.item(ex.itemId), ctx, { dir: 't2de' }) : (def.regen ? def.regen(ex, ctx) : ex);
      s.queue.push(again);
    }
  }
}
export function advance(s) { s.ui = {}; s.idx++; return s.idx >= s.queue.length ? 'finished' : 'next'; }
export function applyResults(s, ls, today) {
  Object.entries(s.results).forEach(([id, r]) => gradeItem(ls, id, r.wrong > 0, today));
}
export function finish(s, state, ls, today) {
  today = today || todayStr();
  const d = s.def;
  applyResults(s, ls, today);
  if (d.lessonId) {
    const L = ls.lessons[d.lessonId] || { count: 0, best: null };
    L.count++; L.done = true; L.last = today;
    const acc = s.answered ? Math.round(100 * s.correct / s.answered) : 100;
    L.best = L.best == null ? acc : Math.max(L.best, acc);
    ls.lessons[d.lessonId] = L;
    if (d.plugin) { const P = ls.plugins[d.plugin] || {}; P.done = true; P.count = (P.count || 0) + 1; ls.plugins[d.plugin] = P; }
  }
  const perfect = !s.anyWrong;
  const xp = d.xp + (perfect ? 5 : 0);
  addXp(state, s.lang, xp, today);
  const seconds = Math.round((Date.now() - s.startedAt) / 1000);
  ls.sessions.push({ d: today, k: d.kind, l: d.lessonId || null, xp, acc: s.answered ? Math.round(100 * s.correct / s.answered) : 100, n: s.answered, s: seconds });
  if (ls.sessions.length > 300) ls.sessions.splice(0, ls.sessions.length - 300);
  state.pending = null;
  return { xp, perfect, accuracy: s.answered ? Math.round(100 * s.correct / s.answered) : 100, streak: streak(state, today), goalHit: todayXp(state) >= state.settings.goal, kind: d.kind, title: d.title, seconds };
}
// Abbruch: beantwortete Wörter werden trotzdem bewertet, XP gibt es nicht
export function abandon(s, state, ls, today) { applyResults(s, ls, today); state.pending = null; }
export function snapshot(s) {
  return { lang: s.lang, startedAt: s.startedAt, savedAt: Date.now(), def: { kind: s.def.kind, lessonId: s.def.lessonId, plugin: s.def.plugin || null, title: s.def.title, xp: s.def.xp, noRequeue: !!s.def.noRequeue }, queue: s.queue, idx: s.idx, results: s.results, fails: s.fails, correct: s.correct, answered: s.answered, anyWrong: s.anyWrong, maxPct: s.maxPct || 0 };
}
export function restore(snap) {
  return { lang: snap.lang, def: Object.assign({}, snap.def, { exercises: snap.queue }), queue: snap.queue.slice(), idx: snap.idx, results: snap.results || {}, fails: snap.fails || {}, correct: snap.correct || 0, answered: snap.answered || 0, anyWrong: !!snap.anyWrong, ui: {}, startedAt: snap.startedAt || Date.now(), maxPct: snap.maxPct || 0 };
}
