// Serie, XP, Lernpfad-Fortschritt
import { todayStr, addDays } from './text.js';
import { isDue } from './srs.js';

export function dayXp(s, d) { const e = s.days[d]; return e ? (typeof e === 'number' ? e : e.xp || 0) : 0; }
export function todayXp(s) { return dayXp(s, todayStr()); }
export function addXp(s, lang, xp, today) {
  today = today || todayStr();
  const e = s.days[today] || (s.days[today] = { xp: 0 });
  e.xp = (e.xp || 0) + xp; e[lang] = (e[lang] || 0) + xp;
  return e.xp;
}
export function streak(s, today) {
  today = today || todayStr();
  let d = dayXp(s, today) > 0 ? today : addDays(today, -1);
  let n = 0;
  while (dayXp(s, d) > 0) { n++; d = addDays(d, -1); }
  return n;
}
export function learningDays(s) { return Object.keys(s.days).filter(d => dayXp(s, d) > 0).length; }
export function nextLesson(profile, ls) { return profile.lessons.find(e => !(ls.lessons[e.lesson.id] && ls.lessons[e.lesson.id].done)) || null; }
export function unitProgress(unit, ls) { const done = unit.lessons.filter(l => ls.lessons[l.id] && ls.lessons[l.id].done).length; return Math.round(100 * done / unit.lessons.length); }
export function learnedItems(profile, ls) { return profile.allItems.filter(it => ls.items[it.id]); }
export function dueItems(profile, ls, today) { today = today || todayStr(); return profile.allItems.filter(it => isDue(ls.items[it.id], today)); }
