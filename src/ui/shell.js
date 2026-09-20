import { h, raw } from './dom.js';
import { icon } from './icons.js';
import * as sheet from './sheet.js';
import { LANG_LIST } from '../lang/registry.js';
import { countLearned } from '../core/progress.js';

export const TABS = [
  { id: 'home', label: 'Lernen', icon: 'learn' },
  { id: 'practice', label: 'Üben', icon: 'practice' },
  { id: 'travel', label: 'Reise', icon: 'travel' },
  { id: 'profile', label: 'Profil', icon: 'profile' }
];
export function tabs(active) {
  return h`<nav class="tabs" role="tablist"><div class="in">${TABS.map(t => h`<button role="tab" aria-selected="${t.id === active}" data-act="tab" data-tab="${t.id}" class="${t.id === active ? 'on' : ''}">${raw(icon(t.icon))}<span>${t.label}</span></button>`)}</div></nav>`;
}
export function titleBar(title, right) { return h`<div class="topbar"><h1>${title}</h1>${right || ''}</div>`; }
export function langChip(ctx) { return h`<button class="chip" data-act="lang-sheet" aria-label="Sprache wechseln"><span class="flag">${ctx.lang.flag}</span><span class="name">${ctx.lang.name}</span>${raw(icon('down', 'sm'))}</button>`; }
export function openLangSheet(ctx) {
  const s = ctx.state;
  const rows = LANG_LIST.map(l => {
    const ls = s.langs[l.code];
    const learned = ls ? countLearned(ls) : 0;
    const lessons = ls ? Object.values(ls.lessons).filter(x => x.done).length : 0;
    const active = l.code === s.activeLang;
    return h`<button class="langrow ${active ? 'on' : ''}" data-act="pick" data-code="${l.code}" ${l.available ? '' : 'disabled'}><span class="flag">${l.flag}</span><span class="w"><span class="n">${l.name}</span><span class="m">${l.available ? (ls ? `${learned} Wörter gelernt · ${lessons} Lektionen` : 'Noch nicht angefangen') : 'Bald verfügbar'}</span></span>${active ? raw(icon('check')) : ''}</button>`;
  });
  sheet.open(h`<h3>Sprache</h3><div class="stack">${rows}</div>`, {
    pick(el) { const code = el.dataset.code; sheet.close(); if (code && code !== ctx.state.activeLang) ctx.switchLang(code); }
  });
}
