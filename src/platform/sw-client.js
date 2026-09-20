// Service Worker registrieren und Updates melden statt still auszutauschen
let reg = null, waiting = null, applyRequested = false;
const cbs = [];
export function onUpdate(cb) { cbs.push(cb); if (waiting) cb(); }
export function hasUpdate() { return !!waiting; }
export function applyUpdate() { if (!waiting) return; applyRequested = true; waiting.postMessage('SKIP_WAITING'); }
export async function register() {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator) || !location.protocol.startsWith('http')) return;
  try {
    reg = await navigator.serviceWorker.register('./sw.js');
    const announce = w => { waiting = w; cbs.forEach(cb => { try { cb(); } catch (e) { /* */ } }); };
    if (reg.waiting && navigator.serviceWorker.controller) announce(reg.waiting);
    reg.addEventListener('updatefound', () => {
      const w = reg.installing; if (!w) return;
      w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) announce(w); });
    });
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (applyRequested) location.reload(); });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && reg) reg.update().catch(() => {}); });
  } catch (e) { /* offline oder nicht unterstützt */ }
}
