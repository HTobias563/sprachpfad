export function toast(msg, ms) {
  const t = document.createElement('div'); t.className = 'toast fade'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), ms || 2400);
}
