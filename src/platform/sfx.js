// Kurze Feedback-Töne über WebAudio
let AC = null;
function ctx() { if (!AC) AC = new (globalThis.AudioContext || globalThis.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); return AC; }
function beep(freq, dur, type, gain) {
  try {
    const ac = ctx(); const o = ac.createOscillator(), g = ac.createGain();
    o.type = type || 'sine'; o.frequency.value = freq; g.gain.value = gain || 0.08;
    o.connect(g); g.connect(ac.destination);
    const t = ac.currentTime; o.start(t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.stop(t + dur);
  } catch (e) { /* kein Audio */ }
}
export function play(kind, enabled) {
  if (enabled === false) return;
  if (kind === 'ok') { beep(660, 0.12); setTimeout(() => beep(880, 0.2), 90); }
  else if (kind === 'bad') beep(200, 0.28, 'triangle', 0.07);
  else if (kind === 'tick') beep(520, 0.05, 'sine', 0.03);
  else if (kind === 'done') { beep(523, 0.12); setTimeout(() => beep(659, 0.12), 110); setTimeout(() => beep(784, 0.25), 220); }
}
export function unlock() { try { ctx(); } catch (e) { /* */ } }
