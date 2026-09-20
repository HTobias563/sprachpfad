// Session-Screen: fester Kopf mit Balken, Frage und Fußbereich werden einzeln neu gezeichnet
import { h, mount, $ } from '../dom.js';
import { registry } from '../../exercises/index.js';
import * as engine from '../../core/session.js';
import * as sheet from '../sheet.js';
import * as router from '../router.js';
import * as tts from '../../platform/tts.js';
import * as sr from '../../platform/sr.js';
import * as store from '../../core/store.js';
import { toast } from '../toast.js';
import { roman } from '../parts.js';

function def(ex) { return registry[ex.type]; }
function itemFeedback(it, result, ctx) {
  const t = h`<b lang="${ctx.lang.code}">${it.text}</b>${it.roman && ctx.showRoman() ? h` <span class="muted">${it.roman}</span>` : ''} · ${it.de}`;
  if (result.correct) return h`<div class="h">✅ ${result.near ? `Fast! Achte auf die ${result.near}.` : 'Richtig!'}</div><div class="a">${t}</div>${it.hint ? h`<div class="n">Klingt wie: ${it.hint}</div>` : ''}`;
  return h`<div class="h">❌ Richtige Antwort:</div><div class="a">${t}</div><div class="n">${it.hint ? 'Klingt wie: ' + it.hint : ''}${it.note ? (it.hint ? ' · ' : '') + it.note : ''}</div>`;
}
function bottom(ex, ui, ctx) {
  const d = def(ex);
  if (ui.fb) {
    const inner = d.feedback ? d.feedback(ex, ui.fb, ctx) : itemFeedback(ctx.item(ex.itemId), ui.fb, ctx);
    return { cls: ui.fb.correct ? 'ok' : 'bad', html: h`<div class="in"><div class="fb">${inner}</div><button class="btn" data-act="next">Weiter</button></div>` };
  }
  if (d.card) return { cls: '', html: h`<div class="in"><button class="btn primary" data-act="next">Weiter</button></div>` };
  if (d.bottom) return { cls: '', html: d.bottom(ex, ui, ctx) };
  const ready = d.ready ? d.ready(ex, ui) : false;
  return { cls: '', html: h`<div class="in"><button class="btn primary" data-act="check" ${ready ? '' : 'disabled'}>Prüfen</button></div>` };
}
function afterRender(ctx) {
  const s = ctx.session; if (!s) return;
  const ex = engine.current(s), d = def(ex), ui = s.ui;
  if (!ui.fb && !ui.spoken) {
    ui.spoken = true;
    const t = d.autoSpeak ? d.autoSpeak(ex, ctx) : null;
    if (t) setTimeout(() => { if (ctx.session === s && engine.current(s) === ex && !s.ui.fb) ctx.speak(t); }, 250);
  }
  if (ui.fb && !ui.fbSpoken) {
    ui.fbSpoken = true;
    const t = d.speakOnFeedback ? d.speakOnFeedback(ex, ui.fb, ctx) : null;
    if (t) setTimeout(() => { if (ctx.session === s) ctx.speak(t); }, 200);
  }
}
function persist(ctx) { if (!ctx.session) return; ctx.state.pending = engine.snapshot(ctx.session); store.save(); }
export function rerender(ctx, swap) {
  const s = ctx.session; if (!s || router.current() !== 'session') return;
  const ex = engine.current(s); const b = bottom(ex, s.ui, ctx);
  const body = $('#ex-body');
  if (body) { mount(body, def(ex).render(ex, s.ui, ctx)); if (swap) { body.classList.remove('swap'); void body.offsetWidth; body.classList.add('swap'); } }
  const bot = $('#ex-bottom'); if (bot) { bot.className = 'bottom ' + b.cls; mount(bot, b.html); }
  const fill = $('#prog-fill'); if (fill) fill.style.width = engine.progressPct(s) + '%';
  afterRender(ctx);
}
export function answer(ctx, result) {
  const s = ctx.session; const ex = engine.current(s);
  engine.record(s, ex, result, ctx);
  ctx.sfx(result.correct ? 'ok' : 'bad');
  s.ui.fb = result;
  persist(ctx);
  rerender(ctx);
}
function check(ctx) {
  const s = ctx.session; const ex = engine.current(s); const d = def(ex);
  if (s.ui.fb || !d.check) return;
  if (d.ready && !d.ready(ex, s.ui)) return;
  answer(ctx, d.check(ex, s.ui, ctx));
}
function next(ctx) {
  const s = ctx.session; if (!s) return;
  abortMic(ctx); tts.stop();
  if (engine.advance(s) === 'finished') return finishFlow(ctx);
  persist(ctx);
  router.scrollTop();
  rerender(ctx, true);
}
function finishFlow(ctx) {
  const s = ctx.session;
  ctx.done = engine.finish(s, ctx.state, ctx.ls, undefined, ctx.lang);
  store.save();
  ctx.session = null; router.setGuard(null);
  ctx.sfx('done');
  router.go('done', { replace: true });
}
function askQuit(ctx) {
  sheet.open(h`<h3>Session beenden?</h3><p>Bis hier ist gespeichert. Für die beantworteten Aufgaben gibt es ein paar XP, den Rest am Ende einer Session.</p><div class="stack"><button class="btn primary" data-act="stay">Weitermachen</button><button class="btn ghost" data-act="quit">Beenden</button></div>`, {
    stay() { sheet.close(); },
    quit() { sheet.close(); quitNow(ctx); }
  });
}
export function quitNow(ctx) {
  const s = ctx.session; if (!s) return;
  abortMic(ctx); tts.stop();
  const xp = engine.abandon(s, ctx.state, ctx.ls); store.save();
  ctx.session = null; router.setGuard(null);
  router.go('home', { replace: true });
  if (xp > 0) toast(`+${xp} XP für die beantworteten Aufgaben`);
}
export function makeGuard(ctx) { return name => { if (!ctx.session || name === 'session') return true; askQuit(ctx); return false; }; }
export function abortMic(ctx) {
  if (ctx.srHandle) { ctx.srHandle.abort(); ctx.srHandle = null; }
  if (ctx.session) ctx.session.ui.listening = false;
}
export function startMic(ctx) {
  const s = ctx.session; if (!s) return;
  const ui = s.ui; if (ui.fb || ui.listening) return;
  const ex = engine.current(s);
  if (!sr.usable(ctx.state.settings)) { ui.err = 'Spracherkennung hier nicht verfügbar. Sprich den Satz laut nach und geh weiter.'; rerender(ctx); return; }
  ui.listening = true; ui.heard = null; ui.err = null;
  tts.stop();
  rerender(ctx);
  ctx.srHandle = sr.listenOnce(ctx.lang.sr.lang, (err, alts) => {
    ctx.srHandle = null;
    if (ctx.session !== s || engine.current(s) !== ex) return;
    ui.listening = false;
    if (err) {
      if (err === 'not-allowed' || err === 'service-not-allowed') { sr.setBroken(true); ui.err = 'Kein Mikrofon-Zugriff. Sprich den Satz laut nach und geh weiter.'; }
      else if (err === 'network') ui.err = 'Spracherkennung braucht Internet. Sprich laut nach und geh weiter.';
      else ui.err = 'Nichts gehört. Nochmal versuchen?';
      rerender(ctx); return;
    }
    ui.heard = alts[0] || '';
    const m = ctx.lang.speechMatch(ctx.item(ex.itemId), alts);
    if (m.correct) answer(ctx, m); else rerender(ctx);
  });
}
export default {
  id: 'session', noDirect: true,
  header(ctx) {
    const s = ctx.session; const pct = engine.progressPct(s);
    return h`<div class="sbar"><button class="x" data-act="quit" aria-label="Session beenden">×</button><div class="prog" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><div id="prog-fill" style="width:${pct}%"></div></div></div>`;
  },
  render(ctx) {
    const s = ctx.session; const ex = engine.current(s);
    return h`<div class="sess"><div id="ex-body">${def(ex).render(ex, s.ui, ctx)}</div></div>`;
  },
  footer(ctx) {
    const s = ctx.session; const ex = engine.current(s); const b = bottom(ex, s.ui, ctx);
    return h`<div id="ex-bottom" class="bottom ${b.cls}">${b.html}</div>`;
  },
  onShow(ctx) { afterRender(ctx); },
  onHide(ctx) { abortMic(ctx); },
  actions: {
    quit(ctx) { askQuit(ctx); },
    next(ctx) { next(ctx); },
    check(ctx) { check(ctx); },
    skip(ctx) { next(ctx); },
    mic(ctx) { startMic(ctx); }
  },
  fallback(ctx, act, el, ev) {
    const s = ctx.session; if (!s) return;
    const ex = engine.current(s); const d = def(ex);
    if (d.actions && d.actions[act]) d.actions[act](ex, s.ui, ctx, el, ev);
  }
};
