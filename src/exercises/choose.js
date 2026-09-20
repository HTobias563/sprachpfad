// Auswahl aus vier Optionen. dir: 't2de' (Zielsprache → Deutsch), 'de2t' (Deutsch → Zielsprache), 'listen' (Audio → Zielsprache)
import { h } from '../ui/dom.js';
import { shuffle, norm } from '../core/text.js';
import { spkBtn, slowBtn, target, roman } from '../ui/parts.js';

export function distractors(item, n, field, lang) {
  const seen = new Set([norm(item[field])]);
  const skipText = norm(item.text);
  const out = [];
  const pools = [lang.itemsOf(item.lessonId), lang.unitItems(item.unitId), lang.allItems];
  for (const pool of pools) {
    for (const c of shuffle(pool)) {
      if (out.length >= n) break;
      if (c.id === item.id || norm(c.text) === skipText) continue;
      const k = norm(c[field]);
      if (seen.has(k)) continue;
      seen.add(k); out.push(c);
    }
    if (out.length >= n) break;
  }
  return out;
}
export default {
  type: 'choose',
  make(item, ctx, opts) {
    const dir = (opts && opts.dir) || 't2de';
    const field = dir === 't2de' ? 'de' : 'text';
    const options = shuffle([item].concat(distractors(item, 3, field, ctx.lang))).map(c => ({ id: c.id, text: c[field] }));
    return { type: 'choose', itemId: item.id, dir, options };
  },
  render(ex, ui, ctx) {
    const it = ctx.item(ex.itemId); const say = ctx.lang.speakText(it); const fb = ui.fb;
    let head;
    if (ex.dir === 'listen') head = h`<h2 class="qtitle">Was hörst du?</h2><div class="row" style="margin-bottom:18px">${spkBtn(say)}${slowBtn(say)}</div>`;
    else if (ex.dir === 't2de') head = h`<h2 class="qtitle">Was bedeutet das?</h2><div class="row" style="margin-bottom:18px">${spkBtn(say, 'small')}<div>${target(it.text, ctx.lang, 'big')}${roman(it, ctx)}</div></div>`;
    else head = h`<h2 class="qtitle">Wie sagt man das?</h2><div class="big" style="margin-bottom:18px">${it.de}</div>`;
    const isTarget = ex.dir !== 't2de';
    const opts = ex.options.map((o, i) => {
      let cls = '';
      if (fb) { if (o.id === it.id) cls = 'right'; else if (i === ui.sel) cls = 'wrong'; }
      else if (i === ui.sel) cls = 'sel';
      return h`<button class="opt ${cls}" data-act="opt" data-i="${i}" ${fb ? 'disabled' : ''}><span class="k">${i + 1}</span><span ${isTarget ? h`lang="${ctx.lang.code}"` : ''}>${o.text}${isTarget ? roman(ctx.item(o.id), ctx) : ''}</span></button>`;
    });
    return h`${head}<div class="opts">${opts}</div>`;
  },
  ready: (ex, ui) => ui.sel !== undefined,
  actions: { opt(ex, ui, ctx, el) { if (ui.fb) return; ui.sel = Number(el.dataset.i); ctx.rerender(); } },
  check(ex, ui) { const o = ex.options[ui.sel]; return { correct: !!o && o.id === ex.itemId }; },
  regen(ex, ctx) { return this.make(ctx.item(ex.itemId), ctx, { dir: ex.dir }); },
  autoSpeak(ex, ctx) { return ex.dir === 'de2t' ? null : ctx.lang.speakText(ctx.item(ex.itemId)); },
  speakOnFeedback(ex, result, ctx) { return (ex.dir === 'de2t' || !result.correct) ? ctx.lang.speakText(ctx.item(ex.itemId)) : null; }
};
