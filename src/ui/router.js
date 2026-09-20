// Hash-Routing mit Verlauf in einer App-Shell: Kopf, scrollende Mitte, Fuß
import { mount, h, $ } from './dom.js';
import { tabs } from './shell.js';
const screens = {};
let currentName = null, ctx = null, guard = null, app = null;
const scrollPos = {};
export function register(name, screen) { screens[name] = screen; }
export function init(rootEl, context, startName) {
  app = rootEl; ctx = context;
  mount(app, h`<div class="shell"><header id="hdr"></header><main id="main" class="scroll"></main><footer id="foot"></footer></div>`);
  window.addEventListener('popstate', onPop);
  const name = fromHash();
  go(screens[name] && !screens[name].noDirect ? name : startName, { replace: true });
}
export function go(name, opts) {
  opts = opts || {};
  const prev = screens[currentName];
  if (prev) { if (prev.tab) scrollPos[prev.tab] = ($('#main') || {}).scrollTop || 0; if (prev.onHide) prev.onHide(ctx); }
  const from = currentName;
  currentName = name;
  const hash = '#/' + name;
  try { if (opts.replace || location.hash === hash) history.replaceState({ r: name }, '', hash); else history.pushState({ r: name }, '', hash); } catch (e) { /* */ }
  render({ from, restoreScroll: !!(screens[name] && screens[name].tab && prev && prev.tab) });
}
export function render(opts) {
  opts = opts || {};
  const s = screens[currentName]; if (!s) return;
  const hdr = $('#hdr'), main = $('#main'), foot = $('#foot');
  mount(hdr, s.header ? s.header(ctx) : '');
  mount(main, s.render(ctx));
  mount(foot, s.footer ? s.footer(ctx) : (s.tab ? tabs(s.tab, ctx) : ''));
  document.body.dataset.screen = currentName;
  main.scrollTop = opts.restoreScroll ? (scrollPos[s.tab] || 0) : 0;
  if (s.onShow) s.onShow(ctx, opts);
}
export function current() { return currentName; }
export function setGuard(fn) { guard = fn; }
function fromHash() { const m = (location.hash || '').match(/^#\/([\w-]+)/); return m ? m[1] : null; }
function onPop() {
  const name = fromHash() || 'home';
  if (guard && guard(name) === false) { try { history.pushState({ r: currentName }, '', '#/' + currentName); } catch (e) { /* */ } return; }
  const prev = screens[currentName];
  if (prev) { if (prev.tab) scrollPos[prev.tab] = ($('#main') || {}).scrollTop || 0; if (prev.onHide) prev.onHide(ctx); }
  const from = currentName;
  currentName = screens[name] && !screens[name].noDirect ? name : 'home';
  render({ from, restoreScroll: !!(screens[currentName].tab) });
}
export function dispatch(act, el, ev) {
  const s = screens[currentName]; if (!s) return false;
  if (s.actions && s.actions[act]) { s.actions[act](ctx, el, ev); return true; }
  if (s.fallback) { s.fallback(ctx, act, el, ev); return true; }
  return false;
}
export function scrollTop() { const m = $('#main'); if (m) m.scrollTop = 0; }
