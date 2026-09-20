// Zustandsversionen und Migration. v1 = erste Version (nur Vietnamesisch), v2 = mehrsprachig.
import { todayStr, addDays } from './text.js';

export const CURRENT = 2;
export const LADDER = [1, 3, 7, 14, 30]; // Wiederholungsabstände in Tagen je Stufe 1..5

export function defaultState() {
  const t = todayStr();
  return {
    v: CURRENT, createdAt: t, updatedAt: t,
    activeLang: 'vi', onboardingDone: false,
    settings: { goal: 20, speak: true, sound: true, showRoman: true, theme: 'auto' },
    days: {},
    langs: {},
    flags: {},
    pending: null
  };
}
export function emptyLang() { return { items: {}, lessons: {}, sessions: [], plugins: {} }; }

function stepFromInterval(ivl, n) {
  if (!n) return 1;
  let step = 1;
  LADDER.forEach((d, i) => { if (ivl >= d) step = i + 1; });
  return step;
}

const STEPS = {
  1: s => {
    const dayKeys = Object.keys(s.days || {}).sort();
    const items = {};
    Object.entries(s.items || {}).forEach(([id, it]) => {
      const step = stepFromInterval(it.ivl || 1, it.n || 0);
      items[id] = { step, n: it.n || 0, seen: it.seen || 0, wrong: it.wrong || 0, ok: it.n ? Math.min(it.n, 3) : 0, due: it.due || todayStr(), last: it.due && it.ivl ? addDays(it.due, -it.ivl) : null };
    });
    const lessons = {};
    Object.entries(s.lessons || {}).forEach(([id, l]) => { lessons[id] = { count: l.count || 1, done: !!l.done, last: l.last || null, best: l.best || null }; });
    const days = {};
    Object.entries(s.days || {}).forEach(([d, xp]) => { days[d] = { xp: Number(xp) || 0, vi: Number(xp) || 0 }; });
    return {
      v: 2, createdAt: dayKeys[0] || todayStr(), updatedAt: todayStr(),
      activeLang: 'vi', onboardingDone: true,
      settings: { goal: s.goal || 20, speak: s.settings && s.settings.speak !== undefined ? !!s.settings.speak : true, sound: s.settings && s.settings.sound !== undefined ? !!s.settings.sound : true, showRoman: true, theme: 'auto' },
      days,
      langs: { vi: { items, lessons, sessions: [], plugins: { tones: { done: !!(lessons.u1l0 && lessons.u1l0.done) } } } },
      flags: s.flags || {},
      pending: null
    };
  }
};

function normalize(s) {
  const d = defaultState();
  const out = Object.assign(d, s);
  out.settings = Object.assign(d.settings, s.settings || {});
  out.days = s.days || {};
  out.langs = s.langs || {};
  Object.keys(out.langs).forEach(k => { out.langs[k] = Object.assign(emptyLang(), out.langs[k]); });
  out.flags = s.flags || {};
  if (!out.langs[out.activeLang]) out.activeLang = Object.keys(out.langs)[0] || 'vi';
  return out;
}

export function migrate(s) {
  if (!s || typeof s !== 'object') return defaultState();
  let v = Number(s.v) || 1;
  if (v > CURRENT) throw new Error('Zustand stammt aus einer neueren Version (' + v + ')');
  while (v < CURRENT) {
    const step = STEPS[v];
    if (!step) throw new Error('Keine Migration ab Version ' + v);
    s = step(s); v = s.v;
  }
  return normalize(s);
}
