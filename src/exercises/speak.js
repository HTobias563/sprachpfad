// Nachsprechen mit Spracherkennung. Überspringen ist straffrei.
import { h } from '../ui/dom.js';
import { spkBtn, target } from '../ui/parts.js';

export default {
  type: 'speak', selfCheck: true,
  make(item) { return { type: 'speak', itemId: item.id }; },
  render(ex, ui, ctx) {
    const it = ctx.item(ex.itemId);
    const status = ui.listening ? 'Ich höre zu …' : ui.heard ? `Gehört: „${ui.heard}“` : ui.err ? ui.err : 'Tippe das Mikrofon und sprich den Satz';
    return h`<h2 class="qtitle">Sprich nach</h2>
      <div class="row">${spkBtn(ctx.lang.speakText(it))}${target(it.text, ctx.lang, 'big')}</div>
      <div class="mid muted" style="margin-top:8px">${it.de}</div>
      ${it.hint ? h`<div class="hint" style="margin-top:6px">Klingt wie: <b>${it.hint}</b></div>` : ''}
      <button class="mic ${ui.listening ? 'on' : ''}" data-act="mic" aria-label="Aufnehmen">🎤</button>
      <div class="heard">${status}</div>`;
  },
  bottom(ex, ui) {
    return h`<div class="in stack">${(ui.heard || ui.err) && !ui.listening ? h`<button class="btn ghost small" data-act="mic">Nochmal versuchen</button>` : ''}<button class="btn ghost" data-act="skip">Überspringen</button></div>`;
  },
  ready: () => false,
  actions: { mic(ex, ui, ctx) { ctx.startMic(); } },
  check() { return { correct: false, noRequeue: true }; },
  regen(ex) { return ex; },
  autoSpeak(ex, ctx) { return ctx.lang.speakText(ctx.item(ex.itemId)); },
  speakOnFeedback() { return null; }
};
