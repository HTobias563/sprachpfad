// Zuordnung: Paare Zielsprache ↔ Deutsch. Fehlgriffe zählen für die betroffenen Wörter, die Übung wird nicht wiederholt.
import { h } from '../ui/dom.js';
import { shuffle } from '../core/text.js';
import { sub as roman } from '../ui/parts.js';

export default {
  type: 'match', multi: true,
  make(items, ctx) {
    return { type: 'match', itemIds: items.map(i => i.id), left: shuffle(items.map(i => ({ id: i.id, text: i.text }))), right: shuffle(items.map(i => ({ id: i.id, text: i.de }))) };
  },
  render(ex, ui, ctx) {
    const matched = ui.matched || [];
    const col = (arr, side, isTarget) => arr.map(o => {
      const done = matched.includes(o.id), sel = ui[side] === o.id, flash = ui.flash && ui.flash[side] === o.id;
      return h`<button class="opt ${done ? 'right' : flash ? 'wrong' : sel ? 'sel' : ''}" data-act="pair" data-side="${side}" data-id="${o.id}" ${done || ui.fb ? 'disabled' : ''} ${isTarget ? h`lang="${ctx.lang.code}"` : ''}><span>${o.text}${isTarget ? roman(ctx.item(o.id), ctx) : ''}</span></button>`;
    });
    return h`<h2 class="qtitle">Finde die Paare</h2><div class="pairs"><div class="col">${col(ex.left, 'l', true)}</div><div class="col">${col(ex.right, 'r', false)}</div></div>`;
  },
  ready: () => false,
  actions: {
    pair(ex, ui, ctx, el) {
      if (ui.fb) return;
      const side = el.dataset.side, id = el.dataset.id;
      ui.flash = null;
      ui[side] = ui[side] === id ? undefined : id;
      if (ui.l && ui.r) {
        ui.matched = ui.matched || []; ui.errors = ui.errors || {};
        if (ui.l === ui.r) { ui.matched.push(ui.l); ctx.sfx('tick'); }
        else { ui.errors[ui.l] = (ui.errors[ui.l] || 0) + 1; ui.errors[ui.r] = (ui.errors[ui.r] || 0) + 1; ui.flash = { l: ui.l, r: ui.r }; ctx.sfx('bad'); }
        ui.l = ui.r = undefined;
        if (ui.matched.length === ex.itemIds.length) {
          const perItem = {}; ex.itemIds.forEach(i => { perItem[i] = !!ui.errors[i]; });
          ctx.answer({ correct: true, perItem, noRequeue: true, errors: Object.keys(ui.errors).length });
          return;
        }
      }
      ctx.rerender();
    }
  },
  check() { return { correct: true, noRequeue: true }; },
  regen(ex) { return ex; },
  autoSpeak() { return null; },
  speakOnFeedback() { return null; },
  feedback(ex, result) {
    if (!result.errors) return h`<div class="h">✅ Alle Paare gefunden!</div>`;
    return h`<div class="h">✅ Geschafft, mit ${result.errors} ${result.errors === 1 ? 'Verwechslung' : 'Verwechslungen'}</div><div class="n">Die verwechselten Wörter kommen bald wieder dran.</div>`;
  }
};
