// Sprachausgabe über Systemstimmen, eine Stimme pro Sprache, mit Schutz gegen Doppelaufrufe
const has = () => typeof speechSynthesis !== 'undefined';
let voices = [], checked = false, seq = 0, currentUtt = null, watchdog = null;
const chosen = {};
export function refreshVoices() {
  if (!has()) return;
  const vs = speechSynthesis.getVoices();
  if (!vs.length) return;
  voices = vs; checked = true;
  Object.keys(chosen).forEach(k => delete chosen[k]);
}
if (has()) { refreshVoices(); try { speechSynthesis.onvoiceschanged = refreshVoices; } catch (e) { /* */ } }
export function voiceFor(profile) {
  const code = profile.code;
  if (chosen[code] !== undefined) return chosen[code];
  if (!checked) refreshVoices();
  const want = profile.tts.lang.toLowerCase(); const pre = want.slice(0, 2);
  const cands = voices.filter(v => { const l = (v.lang || '').toLowerCase().replace('_', '-'); return l === want || l.startsWith(pre); });
  const v = cands.find(v => /premium/i.test(v.name)) || cands.find(v => /enhanced|erweitert/i.test(v.name)) || cands.find(v => profile.tts.prefer.some(re => re.test(v.name))) || cands[0] || null;
  chosen[code] = v;
  return v;
}
// 'none' (Browser kann nichts), 'unknown' (Stimmen noch nicht geladen), 'missing', 'ok'
export function voiceState(profile) {
  if (!has()) return 'none';
  if (!checked) refreshVoices();
  if (!checked) return 'unknown';
  return voiceFor(profile) ? 'ok' : 'missing';
}
export function voiceName(profile) { const v = voiceFor(profile); return v ? v.name : null; }
export function speak(text, profile, opts) {
  if (!has() || !text) return;
  const my = ++seq;
  try { speechSynthesis.cancel(); } catch (e) { /* */ }
  setTimeout(() => {
    if (my !== seq) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = profile.tts.lang;
      const v = voiceFor(profile); if (v) u.voice = v;
      u.rate = opts && opts.slow ? profile.tts.slow : profile.tts.rate;
      let started = false;
      u.onstart = () => { started = true; };
      u.onend = u.onerror = () => { if (currentUtt === u) currentUtt = null; };
      currentUtt = u;
      speechSynthesis.speak(u);
      clearTimeout(watchdog);
      watchdog = setTimeout(() => { if (!started && currentUtt === u && my === seq) { try { speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) { /* */ } } }, 4000);
    } catch (e) { /* */ }
  }, 60);
}
export function stop() { seq++; clearTimeout(watchdog); try { if (has()) speechSynthesis.cancel(); } catch (e) { /* */ } }
export function unlock() { try { if (has()) speechSynthesis.speak(new SpeechSynthesisUtterance('')); } catch (e) { /* */ } }
