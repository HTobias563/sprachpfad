// Spracherkennung (Web Speech API), nur online, mit Abbruch
const SR = typeof globalThis !== 'undefined' ? (globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition || null) : null;
export const available = !!SR;
let broken = false;
export function setBroken(v) { broken = !!v; }
export function usable(settings) {
  if (!available || !settings.speak || broken) return false;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return false;
  if (typeof location !== 'undefined' && location.protocol === 'file:') return false;
  return true;
}
export function listenOnce(lang, cb) {
  let done = false;
  const finish = (err, alts) => { if (done) return; done = true; cb(err, alts); };
  let r;
  try { r = new SR(); } catch (e) { finish('start-failed'); return { abort() {} }; }
  r.lang = lang; r.interimResults = false; r.maxAlternatives = 5; r.continuous = false;
  r.onresult = e => {
    const alts = [];
    for (let i = 0; i < e.results.length; i++) for (let j = 0; j < e.results[i].length; j++) alts.push(e.results[i][j].transcript);
    finish(null, alts);
  };
  r.onerror = e => finish((e && e.error) || 'error');
  r.onend = () => finish('nothing');
  try { r.start(); } catch (e) { finish('start-failed'); }
  return { abort() { if (done) return; done = true; try { r.abort(); } catch (e) { /* */ } } };
}
