// Generische Schrift-/Laut-Übungen, die Plugins (Töne, Hangul, Kana) mit Daten füllen
import { h } from '../ui/dom.js';
import { spkBtn, slowBtn } from '../ui/parts.js';

export const script_overview = {
  type: 'script_overview', card: true,
  render(ex, ui, ctx) {
    const code = ctx.lang.code;
    return h`<h2 class="qtitle">${ex.title}</h2><div class="stack">
      <div class="note" style="font-size:16px;color:var(--text)">${ex.text}</div>
      <div class="card" style="margin:0"><div class="grid6">${ex.samples.map(s => h`<button class="opt" lang="${code}" data-act="say" data-text="${s}">${s}</button>`)}</div>${ex.hint ? h`<div class="muted small" style="margin-top:10px">${ex.hint}</div>` : ''}</div>
    </div>`;
  },
  autoSpeak() { return null; }
};
export const script_intro = {
  type: 'script_intro', card: true,
  render(ex, ui, ctx) {
    return h`<h2 class="qtitle">${ex.title}</h2><div class="tonecard">
      <div class="row">${spkBtn(ex.speak || ex.glyph)}<div class="big" lang="${ctx.lang.code}">${ex.glyph}</div></div>
      <div class="mid">${ex.label}</div>
      ${ex.desc ? h`<div class="note">${ex.desc}</div>` : ''}
      ${ex.example ? h`<div class="hint">Beispiel: <b>${ex.example}</b></div>` : ''}
      <div class="row">${slowBtn(ex.speak || ex.glyph)}<span class="muted small">langsam anhören</span></div>
    </div>`;
  },
  autoSpeak(ex) { return ex.speak || ex.glyph; }
};
export const script_listen = {
  type: 'script_listen',
  render(ex, ui, ctx) {
    const fb = ui.fb; const code = ctx.lang.code;
    const opts = ex.options.map((o, i) => {
      let cls = '';
      if (fb) { if (i === ex.answer) cls = 'right'; else if (i === ui.sel) cls = 'wrong'; }
      else if (i === ui.sel) cls = 'sel';
      return h`<button class="opt ${cls}" lang="${code}" data-act="opt" data-i="${i}" ${fb ? 'disabled' : ''}>${o}</button>`;
    });
    const cols = Math.min(3, ex.options.length);
    return h`<h2 class="qtitle">${ex.prompt}</h2><div class="row" style="margin-bottom:18px">${spkBtn(ex.speak)}${slowBtn(ex.speak)}</div><div class="grid6" style="grid-template-columns:repeat(${cols},1fr)">${opts}</div>`;
  },
  ready: (ex, ui) => ui.sel !== undefined,
  actions: { opt(ex, ui, ctx, el) { if (ui.fb) return; ui.sel = Number(el.dataset.i); ctx.rerender(); } },
  check(ex, ui) { return { correct: ui.sel === ex.answer }; },
  regen(ex, ctx) { const plugin = ctx.lang.plugins[ex.plugin]; return plugin && plugin.regen ? plugin.regen(ex, ctx) : ex; },
  autoSpeak(ex) { return ex.speak; },
  speakOnFeedback(ex, result) { return result.correct ? null : ex.speak; },
  feedback(ex, result) {
    const info = ex.info && ex.info[ex.answer]; const glyph = ex.options[ex.answer];
    if (result.correct) return h`<div class="h">✅ Richtig!</div><div class="a"><b>${glyph}</b>${info && info.title ? h` · ${info.title}` : ''}</div>`;
    return h`<div class="h">❌ Das war <b>${glyph}</b>${info && info.title ? h` · ${info.title}` : ''}</div>${info && info.desc ? h`<div class="a">${info.desc}</div>` : ''}`;
  }
};
