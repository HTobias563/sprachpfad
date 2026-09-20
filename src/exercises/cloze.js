// Lückentext: ein Teil des Satzes fehlt, drei Optionen
import { h } from '../ui/dom.js';
import { shuffle, pick, norm, random } from '../core/text.js';
import { spkBtn, target } from '../ui/parts.js';

export default {
  type: 'cloze',
  canMake(item, lang) { return lang.segments(item).length >= 3; },
  make(item, ctx) {
    const lang = ctx.lang; const seg = lang.segments(item);
    const gap = 1 + Math.floor(random() * (seg.length - 1));
    const correct = seg[gap]; const own = new Set(seg.map(norm));
    const pools = [lang.itemsOf(item.lessonId), lang.unitItems(item.unitId), lang.allItems];
    const cand = new Map();
    for (const pool of pools) {
      pool.forEach(c => { if (c.id === item.id) return; lang.segments(c).forEach(w => { const k = norm(w); if (!own.has(k) && !cand.has(k)) cand.set(k, w); }); });
      if (cand.size >= 8) break;
    }
    const extras = pick(Array.from(cand.values()), 2);
    const options = shuffle([correct].concat(extras));
    return { type: 'cloze', itemId: item.id, seg, gap, options, answer: options.indexOf(correct) };
  },
  render(ex, ui, ctx) {
    const it = ctx.item(ex.itemId); const fb = ui.fb;
    const shown = ex.seg.map((w, i) => i === ex.gap ? h`<span class="gap ${fb ? 'filled' : ''}">${fb ? ex.options[ex.answer] : ui.sel !== undefined ? ex.options[ui.sel] : '____'}</span>` : h`${w}`);
    const parts = []; shown.forEach((s, i) => { if (i) parts.push(' '); parts.push(s); });
    const opts = ex.options.map((o, i) => { let cls = ''; if (fb) { if (i === ex.answer) cls = 'right'; else if (i === ui.sel) cls = 'wrong'; } else if (i === ui.sel) cls = 'sel'; return h`<button class="opt ${cls}" lang="${ctx.lang.code}" data-act="opt" data-i="${i}" ${fb ? 'disabled' : ''}>${o}</button>`; });
    return h`<h2 class="qtitle">Fülle die Lücke</h2><div class="row">${spkBtn(ctx.lang.speakText(it), 'small')}<div class="big cloze" lang="${ctx.lang.code}">${parts}</div></div><div class="mid muted" style="margin:8px 0 16px">${it.de}</div><div class="opts">${opts}</div>`;
  },
  ready: (ex, ui) => ui.sel !== undefined,
  actions: { opt(ex, ui, ctx, el) { if (ui.fb) return; ui.sel = Number(el.dataset.i); ctx.rerender(); } },
  check(ex, ui) { return { correct: ui.sel === ex.answer }; },
  regen(ex, ctx) { return this.make(ctx.item(ex.itemId), ctx); },
  autoSpeak() { return null; },
  speakOnFeedback(ex, result, ctx) { return ctx.lang.speakText(ctx.item(ex.itemId)); }
};
