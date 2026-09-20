import { h } from '../ui/dom.js';
import { spkBtn, slowBtn, target } from '../ui/parts.js';
export default {
  type: 'intro', card: true,
  make(item) { return { type: 'intro', itemId: item.id }; },
  render(ex, ui, ctx) {
    const it = ctx.item(ex.itemId);
    return h`<h2 class="qtitle">Neues Wort</h2><div class="intro">
      <div class="row">${spkBtn(ctx.lang.speakText(it))}${target(it.text, ctx.lang, 'big')}</div>
      <div class="mid">${it.de}</div>
      ${it.hint ? h`<div class="hint">Klingt wie: <b>${it.hint}</b></div>` : ''}
      ${it.note ? h`<div class="note">${it.note}</div>` : ''}
      <div class="row">${slowBtn(ctx.lang.speakText(it))}<span class="muted small">langsam anhören</span></div>
    </div>`;
  },
  autoSpeak(ex, ctx) { return ctx.lang.speakText(ctx.item(ex.itemId)); }
};
