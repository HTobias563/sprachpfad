// Sichere HTML-Templates: alles wird escaped, außer es ist bereits ein Raw-Template.
import { esc } from '../core/text.js';

export class Raw { constructor(s) { this.s = s; } toString() { return this.s; } }
export const raw = s => new Raw(String(s));
function val(v) {
  if (v instanceof Raw) return v.s;
  if (Array.isArray(v)) return v.map(val).join('');
  if (v == null || v === false) return '';
  return esc(v);
}
export function h(strings, ...vals) {
  let out = '';
  strings.forEach((s, i) => { out += s; if (i < vals.length) out += val(vals[i]); });
  return new Raw(out);
}
export function mount(el, tpl) { if (el) el.innerHTML = String(tpl); }
export function $(sel, root) { return (root || document).querySelector(sel); }
export function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
