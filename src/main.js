// Einstieg: Zustand laden, Sprache wählen, Router starten, Ereignisse verdrahten
import * as store from './core/store.js';
import * as engine from './core/session.js';
import { reconcileLessons } from './core/progress.js';
import { profileFor } from './lang/registry.js';
import * as router from './ui/router.js';
import { toast } from './ui/toast.js';
import { applyTheme } from './ui/theme.js';
import { openLangSheet } from './ui/shell.js';
import home from './ui/screens/home.js';
import practice from './ui/screens/practice.js';
import travel from './ui/screens/travel.js';
import profile from './ui/screens/profile.js';
import onboarding from './ui/screens/onboarding.js';
import session, { rerender, startMic, makeGuard, abortMic, answer } from './ui/screens/session.js';
import done from './ui/screens/done.js';
import * as tts from './platform/tts.js';
import * as sr from './platform/sr.js';
import * as sfx from './platform/sfx.js';
import * as swc from './platform/sw-client.js';

const app = document.getElementById('app');
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;

const ctx = {
  env: { isIOS, standalone },
  get state() { return store.get(); },
  get ls() { return store.langState(store.get().activeLang); },
  get lang() { return profileFor(store.get().activeLang); },
  item(id) { return ctx.lang.items[id]; },
  session: null, done: null, srHandle: null, installPrompt: null, resumeAsked: false, travel: null, onb: null,
  update(fn) { store.update(fn); },
  render() { router.render(); },
  go(name, opts) { router.go(name, opts); },
  rerender() { rerender(ctx); },
  answer(result) { answer(ctx, result); },
  startMic() { startMic(ctx); },
  speak(text, slow) { tts.speak(text, ctx.lang, { slow }); },
  sfx(kind) { sfx.play(kind, ctx.state.settings.sound); },
  unlockAudio() { tts.unlock(); sfx.unlock(); },
  speakAllowed() { return sr.usable(ctx.state.settings); },
  listenAllowed() { return tts.voiceState(ctx.lang) !== 'missing'; },
  showRoman() { return ctx.state.settings.showRoman !== false; },
  resetSpeech() { sr.setBroken(false); },
  startSession(def, opts) {
    if (!def.exercises.length) { toast('Noch nichts zum Üben. Erst eine Lektion lernen.'); return; }
    ctx.session = engine.createSession(def, ctx.state.activeLang);
    ctx.state.pending = engine.snapshot(ctx.session); store.save();
    router.setGuard(makeGuard(ctx));
    router.go('session', opts);
  },
  resumeSession(snap) {
    ctx.session = engine.restore(snap);
    router.setGuard(makeGuard(ctx));
    router.go('session');
  },
  discardPending() {
    const p = ctx.state.pending; if (!p) return;
    engine.abandon(engine.restore(p), ctx.state, store.langState(p.lang)); store.save();
    router.render();
  },
  switchLang(code) {
    if (!profileFor(code) || profileFor(code).code !== code) { toast('Diese Sprache kommt bald.'); return; }
    store.update(s => { s.activeLang = code; });
    ctx.travel = null; ctx.resumeAsked = false;
    if (reconcileLessons(ctx.lang, ctx.ls)) store.save();
    router.render();
  },
  afterStateReplaced() { ctx.session = null; ctx.resumeAsked = false; ctx.travel = null; applyTheme(ctx.state.settings.theme); if (reconcileLessons(ctx.lang, ctx.ls)) store.save(); }
};

function boot() {
  store.load();
  applyTheme(ctx.state.settings.theme);
  ctx.session = null; ctx.resumeAsked = false; ctx.travel = null; ctx.onb = null; router.setGuard(null);
  if (reconcileLessons(ctx.lang, ctx.ls)) store.save();
  const p = ctx.state.pending;
  if (p && (Date.now() - (p.savedAt || 0) > 12 * 3600 * 1000 || !p.queue)) { try { engine.abandon(engine.restore(p), ctx.state, store.langState(p.lang)); } catch (e) { ctx.state.pending = null; } store.save(); }
}

[home, practice, travel, profile, onboarding, session, done].forEach(s => router.register(s.id, s));

const globalActions = {
  tab(el) { if (!ctx.state.onboardingDone) return; router.go(el.dataset.tab, { replace: true }); },
  say(el) { ctx.unlockAudio(); ctx.speak(el.dataset.text, false); },
  'say-slow'(el) { ctx.unlockAudio(); ctx.speak(el.dataset.text, true); },
  'lang-sheet'() { openLangSheet(ctx); }
};
app.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el || !app.contains(el)) return;
  const act = el.dataset.act;
  if (globalActions[act]) { globalActions[act](el, e); return; }
  router.dispatch(act, el, e);
});
app.addEventListener('change', e => { const el = e.target.closest('[data-change]'); if (el) router.dispatch(el.dataset.change, el, e); });
app.addEventListener('input', e => { const el = e.target.closest('[data-input]'); if (el) router.dispatch(el.dataset.input, el, e); });
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); ctx.installPrompt = e; if (router.current() === 'home') router.render(); });
let saveWarned = false;
store.on('save-failed', why => {
  if (saveWarned) return; saveWarned = true;
  toast(why === 'broken' ? 'Gespeicherter Stand war beschädigt. Bitte Backup laden, falls vorhanden.' : 'Fortschritt konnte nicht gespeichert werden. Backup empfohlen.', 5000);
});
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') { abortMic(ctx); tts.stop(); if (ctx.session) { ctx.state.pending = engine.snapshot(ctx.session); store.save(); } }
  else { tts.refreshVoices(); if (router.current() === 'home') router.render({ restoreScroll: true }); }
});
swc.onUpdate(() => { if (router.current() === 'home') router.render({ restoreScroll: true }); });
swc.register();
store.persist().then(ok => { if (ok && !ctx.state.flags.persisted) store.update(s => { s.flags.persisted = true; }); });

boot();
router.init(app, ctx, ctx.state.onboardingDone ? 'home' : 'onboarding');
window.__app = { ctx, router, store, boot: () => { boot(); router.go(ctx.state.onboardingDone ? 'home' : 'onboarding', { replace: true }); } };
