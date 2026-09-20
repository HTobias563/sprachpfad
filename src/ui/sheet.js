// Sheet von unten mit Overlay. Tap auf das Overlay schließt.
let host = null, handlers = null;
export function open(tpl, acts) {
  close();
  host = document.createElement('div'); host.className = 'overlay';
  host.innerHTML = '<div class="sheet">' + String(tpl) + '</div>';
  handlers = acts || {};
  host.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (el && host.contains(el)) { const fn = handlers[el.dataset.act]; if (fn) fn(el, e); return; }
    if (e.target === host && handlers.__dismiss !== false) close();
  });
  document.body.appendChild(host);
  requestAnimationFrame(() => { if (host) host.classList.add('open'); });
}
export function close() { if (host) { host.remove(); host = null; handlers = null; } }
export function isOpen() { return !!host; }
