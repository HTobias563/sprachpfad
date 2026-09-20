import { h } from './dom.js';
export const TABS = [
  { id: 'home', label: 'Lernen', icon: '🏠' },
  { id: 'words', label: 'Wörter', icon: '📖' },
  { id: 'more', label: 'Mehr', icon: '⚙️' }
];
export function tabs(active) {
  return h`<nav class="tabs" role="tablist"><div class="in">${TABS.map(t => h`<button role="tab" aria-selected="${t.id === active}" data-act="tab" data-tab="${t.id}" class="${t.id === active ? 'on' : ''}"><span class="i" aria-hidden="true">${t.icon}</span>${t.label}</button>`)}</div></nav>`;
}
