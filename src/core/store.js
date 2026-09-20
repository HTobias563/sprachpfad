// Zustand laden, speichern, migrieren. Läuft auch ohne Browser (Speicher im Arbeitsspeicher).
import { migrate, defaultState, emptyLang } from './migrations.js';
import { todayStr } from './text.js';

export const KEY = 'sprachpfad.v2';
export const OLD_KEY = 'sprachpfad.v1';

const mem = {};
const memoryStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
function ls() { try { if (typeof localStorage !== 'undefined' && localStorage) return localStorage; } catch (e) { /* blockiert */ } return memoryStorage; }

let state = null;
const listeners = { 'save-failed': [], change: [] };
export function on(evt, cb) { (listeners[evt] = listeners[evt] || []).push(cb); }
function emit(evt, arg) { (listeners[evt] || []).forEach(cb => { try { cb(arg); } catch (e) { /* */ } }); }

export function load() {
  let raw = null;
  try {
    raw = ls().getItem(KEY);
    if (raw) { state = migrate(JSON.parse(raw)); return state; }
  } catch (e) {
    try { ls().setItem('sprachpfad.broken.' + Date.now(), raw); } catch (e2) { /* */ }
    emit('save-failed', 'broken');
  }
  try {
    const old = ls().getItem(OLD_KEY);
    if (old) { state = migrate(JSON.parse(old)); save(); return state; } // v1 bleibt als Sicherheitsnetz liegen
  } catch (e) { /* alter Zustand unlesbar, dann neu anfangen */ }
  state = defaultState();
  return state;
}
export function get() { return state || load(); }
export function save() {
  const s = get();
  s.updatedAt = todayStr();
  try { ls().setItem(KEY, JSON.stringify(s)); return true; }
  catch (e) { emit('save-failed', 'quota'); return false; }
}
export function update(fn) { const s = get(); fn(s); save(); emit('change', s); return s; }
export function langState(code) {
  const s = get(); code = code || s.activeLang;
  if (!s.langs[code]) s.langs[code] = emptyLang();
  return s.langs[code];
}
export function replaceState(next) { state = migrate(next); save(); emit('change', state); return state; }
export function reset() { state = defaultState(); save(); emit('change', state); return state; }
export function resetLang(code) { const s = get(); s.langs[code] = emptyLang(); save(); emit('change', s); }
export function exportJson() { return JSON.stringify(get()); }
export async function persist() {
  try { if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) return await navigator.storage.persist(); } catch (e) { /* */ }
  return false;
}
// Nur für Tests
export function _setStorageForTests(obj) { Object.keys(mem).forEach(k => delete mem[k]); Object.assign(mem, obj || {}); state = null; }
