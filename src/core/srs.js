// Wiederholung nach fester Leiter: 1, 3, 7, 14, 30 Tage. Fehler = zwei Stufen zurück.
import { LADDER } from './migrations.js';
import { addDays, todayStr } from './text.js';

export function gradeItem(ls, id, wrong, today) {
  today = today || todayStr();
  const st = ls.items[id] || { step: 0, n: 0, seen: 0, wrong: 0, ok: 0, due: today, last: null };
  st.seen++;
  if (wrong) { st.wrong++; st.ok = 0; st.step = Math.max(1, st.step - 2); }
  else { st.ok++; st.n++; st.step = Math.min(LADDER.length, st.step + 1); }
  st.due = addDays(today, LADDER[st.step - 1]);
  st.last = today;
  ls.items[id] = st;
  return st;
}
// Stufen: new (nie gesehen), seen, learned (an 2 Tagen richtig), solid (gefestigt)
export function itemStatus(st) {
  if (!st) return 'new';
  if (st.step >= 5 && st.n >= 4 && st.ok >= 3) return 'solid';
  if (st.n >= 2 && st.step >= 2) return 'learned';
  return 'seen';
}
export function isDue(st, today) { return !!st && st.due <= (today || todayStr()); }
export function isLeech(st) { return !!st && st.wrong >= 5 && st.wrong > st.n; }
