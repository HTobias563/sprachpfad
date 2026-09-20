// Session-Engine: Warteschlange, Bewertung, Wiederholung falscher Antworten, Abschluss, Snapshot
import { registry } from '../exercises/index.js';
import { gradeItem } from './srs.js';
import { addXp, streak, todayXp, countLearned, dueItems } from './progress.js';
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
export function finish(s, state, ls, today, profile) {
  today = today || todayStr();
  const d = s.def;
  const before = { learned: countLearned(ls), streak: streak(state, today), lessons: Object.values(ls.lessons).filter(l => l.done).length };
  applyResults(s, ls, today);
  if (d.lessonId) {
    const L = ls.lessons[d.lessonId] || { count: 0, best: null };
    L.count++; L.done = true; L.last = today;
    const acc = s.answered ? Math.round(100 * s.correct / s.answered) : 100;
    L.best = L.best == null ? acc : Math.max(L.best, acc);
    ls.lessons[d.lessonId] = L;
    if (d.plugin) {
      const P = ls.plugins[d.plugin] || {}; P.count = (P.count || 0) + 1;
      const all = profile ? profile.lessons.filter(e => e.lesson.type === 'script' && e.lesson.plugin === d.plugin) : [];
      const wasDone = !!P.done;
      P.done = all.length ? all.every(e => ls.lessons[e.lesson.id] && ls.lessons[e.lesson.id].done) : true;
      ls.plugins[d.plugin] = P;
      if (P.done && !wasDone && all.length > 1) { P.completedAt = today; if (state.settings.showRoman !== false) { state.settings.showRoman = false; P.hidRoman = true; } }
    }
  }
  const perfect = !s.anyWrong;
  const xp = d.xp + (perfect ? 5 : 0);
  addXp(state, s.lang, xp, today);
  const seconds = Math.round((Date.now() - s.startedAt) / 1000);
  ls.sessions.push({ d: today, k: d.kind, l: d.lessonId || null, xp, acc: s.answered ? Math.round(100 * s.correct / s.answered) : 100, n: s.answered, s: seconds });
  if (ls.sessions.length > 300) ls.sessions.splice(0, ls.sessions.length - 300);
  state.pending = null;
  const after = { learned: countLearned(ls), streak: streak(state, today) };
  state.stats = state.stats || {};
  state.stats.bestStreak = Math.max(state.stats.bestStreak || 0, after.streak);
  const milestones = [];
  if (before.lessons === 0 && d.lessonId) milestones.push({ icon: '🌱', title: 'Erste Lektion geschafft', text: 'Der Anfang ist gemacht. Morgen eine kurze Session, und die Serie läuft.' });
  [3, 7, 14, 30, 60, 100].forEach(m => { if (after.streak >= m && before.streak < m) milestones.push({ icon: '🔥', title: `${m} Tage am Stück`, text: m >= 14 ? 'Das ist eine echte Gewohnheit.' : 'Dranbleiben zahlt sich aus.' }); });
  [25, 50, 100, 150].forEach(m => { if (after.learned >= m && before.learned < m) milestones.push({ icon: '📚', title: `${m} Wörter gelernt`, text: 'Gelernt heißt: an zwei verschiedenen Tagen richtig abgerufen.' }); });
  if (profile && d.lessonId) {
    const entry = profile.lessons.find(e => e.lesson.id === d.lessonId);
    if (entry) {
      const unit = entry.unit;
      const allDone = unit.lessons.every(l => ls.lessons[l.id] && ls.lessons[l.id].done);
      const othersDone = unit.lessons.every(l => l.id === d.lessonId || (ls.lessons[l.id] && ls.lessons[l.id].done));
      const firstTime = (ls.lessons[d.lessonId].count || 1) === 1;
      if (allDone && othersDone && firstTime && unit.can) milestones.push({ icon: '🏁', title: `Einheit „${unit.title}“ fertig`, text: 'Du kannst jetzt: ' + unit.can.join(' · ') });
    }
  }
  if (d.plugin && ls.plugins[d.plugin] && ls.plugins[d.plugin].completedAt === today && ls.plugins[d.plugin].hidRoman && !ls.plugins[d.plugin].hidRomanShown) { ls.plugins[d.plugin].hidRomanShown = true; milestones.unshift({ icon: '🔤', title: 'Schrift geschafft', text: 'Die Umschrift wird ab jetzt ausgeblendet. Unter Profil kannst du sie jederzeit wieder einschalten.' }); }
  const due = profile ? dueItems(profile, ls, today).length : 0;
  return { xp, perfect, accuracy: s.answered ? Math.round(100 * s.correct / s.answered) : 100, streak: after.streak, streakBefore: before.streak, goalHit: todayXp(state) >= state.settings.goal, xpBefore: todayXp(state) - xp, kind: d.kind, title: d.title, seconds, milestones, due };
}
// Abbruch: beantwortete Wörter werden bewertet, ein Teil der XP wird gutgeschrieben
export function abandon(s, state, ls, today) {
  today = today || todayStr();
  applyResults(s, ls, today);
  const xp = Math.min(6, Math.floor(s.correct / 2));
  if (xp > 0) addXp(state, s.lang, xp, today);
  state.pending = null;
  return xp;
}
export function snapshot(s) {
  return { lang: s.lang, startedAt: s.startedAt, savedAt: Date.now(), def: { kind: s.def.kind, lessonId: s.def.lessonId, plugin: s.def.plugin || null, title: s.def.title, xp: s.def.xp, noRequeue: !!s.def.noRequeue }, queue: s.queue, idx: s.idx, results: s.results, fails: s.fails, correct: s.correct, answered: s.answered, anyWrong: s.anyWrong, maxPct: s.maxPct || 0 };
}
export function restore(snap) {
  return { lang: snap.lang, def: Object.assign({}, snap.def, { exercises: snap.queue }), queue: snap.queue.slice(), idx: snap.idx, results: snap.results || {}, fails: snap.fails || {}, correct: snap.correct || 0, answered: snap.answered || 0, anyWrong: !!snap.anyWrong, ui: {}, startedAt: snap.startedAt || Date.now(), maxPct: snap.maxPct || 0 };
}
