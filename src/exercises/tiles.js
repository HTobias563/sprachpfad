// Satz aus Kacheln bauen
import { h } from '../ui/dom.js';
import { shuffle, pick, norm } from '../core/text.js';
import { spkBtn } from '../ui/parts.js';

export default {
  type: 'tiles',
  canMake(item, lang) { return lang.segments(item).length >= 3; },
  make(item, ctx) {
    const lang = ctx.lang;
    const target = lang.segments(item);
    const tn = target.map(norm);
    const itemNorm = norm(item.text);
    const pool = new Map();
    lang.allItems.forEach(c => {
      if (c.id === item.id) return;
      const cn = norm(c.text);
      if (cn.includes(itemNorm) || itemNorm.includes(cn)) return; // keine Teilsätze als Extras
      lang.segments(c).forEach(w => { const k = norm(w); if (!tn.includes(k) && !pool.has(k)) pool.set(k, w); });
    });
    const extras = pick(Array.from(pool.values()), Math.min(3, Math.max(2, Math.floor(target.length / 2) + 1)));
    const tiles = shuffle(target.concat(extras)).map((w, i) => ({ k: i, w }));
    return { type: 'tiles', itemId: item.id, tiles, target };
  },
  render(ex, ui, ctx) {
    const it = ctx.item(ex.itemId); const used = ui.used || []; const fb = ui.fb; const code = ctx.lang.code;
    const answer = used.map(k => h`<button class="tile rm" lang="${code}" data-act="rm" data-k="${k}" ${fb ? 'disabled' : ''}>${ex.tiles[k].w}</button>`);
    const tiles = ex.tiles.map(t => h`<button class="tile ${used.includes(t.k) ? 'used' : ''}" lang="${code}" data-act="tile" data-k="${t.k}" ${fb ? 'disabled' : ''}>${t.w}</button>`);
    return h`<h2 class="qtitle">Bilde den Satz</h2><div class="row">${spkBtn(ctx.lang.speakText(it), 'small')}<div class="mid">${it.de}</div></div>
      <div class="answer">${answer.length ? answer : h`<span class="muted small" style="padding:10px 0">Tippe die Wörter in der richtigen Reihenfolge</span>`}</div>
      <div class="tiles">${tiles}</div>`;
  },
  ready: (ex, ui) => (ui.used || []).length > 0,
  actions: {
    tile(ex, ui, ctx, el) { if (ui.fb) return; const k = Number(el.dataset.k); const u = ui.used || (ui.used = []); if (!u.includes(k)) u.push(k); ctx.sfx('tick'); ctx.rerender(); },
    rm(ex, ui, ctx, el) { if (ui.fb) return; const k = Number(el.dataset.k); ui.used = (ui.used || []).filter(x => x !== k); ctx.rerender(); }
  },
  check(ex, ui) {
    const got = (ui.used || []).map(k => norm(ex.tiles[k].w)).join(' ');
    const want = ex.target.map(norm).join(' ');
    return { correct: got === want };
  },
  regen(ex, ctx) { return this.make(ctx.item(ex.itemId), ctx); },
  autoSpeak() { return null; },
  speakOnFeedback(ex, result, ctx) { return ctx.lang.speakText(ctx.item(ex.itemId)); }
};
