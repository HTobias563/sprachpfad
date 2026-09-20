// Hash-Routing mit Verlauf. Tabs ersetzen den Eintrag, Sessions werden gepusht.
import { mount } from './dom.js';
const screens = {};
let currentName = null, ctx = null, guard = null, app = null;
export function register(name, screen) { screens[name] = screen; }
export function init(rootEl, context, startName) {
  app = rootEl; ctx = context;
  window.addEventListener('popstate', onPop);
  const name = fromHash();
  go(screens[name] && !screens[name].noDirect ? name : startName, { replace: true });
}
export function go(name, opts) {
  opts = opts || {};
  const prev = screens[currentName];
  if (prev && prev.onHide) prev.onHide(ctx);
  currentName = name;
  const hash = '#/' + name;
  try { if (opts.replace || location.hash === hash) history.replaceState({ r: name }, '', hash); else history.pushState({ r: name }, '', hash); } catch (e) { /* */ }
  window.scrollTo(0, 0);
  render();
}
export function render() { const s = screens[currentName]; if (!s) return; mount(app, s.render(ctx)); if (s.onShow) s.onShow(ctx); }
export function current() { return currentName; }
export function setGuard(fn) { guard = fn; }
function fromHash() { const m = (location.hash || '').match(/^#\/([\w-]+)/); return m ? m[1] : null; }
function onPop() {
  const name = fromHash() || 'home';
  if (guard && guard(name) === false) { try { history.pushState({ r: currentName }, '', '#/' + currentName); } catch (e) { /* */ } return; }
  const prev = screens[currentName];
  if (prev && prev.onHide) prev.onHide(ctx);
  currentName = screens[name] && !screens[name].noDirect ? name : 'home';
  render();
}
export function dispatch(act, el, ev) {
  const s = screens[currentName]; if (!s) return false;
  if (s.actions && s.actions[act]) { s.actions[act](ctx, el, ev); return true; }
  if (s.fallback) { s.fallback(ctx, act, el, ev); return true; }
  return false;
}
