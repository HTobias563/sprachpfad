// Reise: Phrasenbuch aller Wörter, Suche, Situationen, Groß zeigen, Lautschrift-Legende
import { h, raw, mount, $ } from '../dom.js';
import { icon } from '../icons.js';
import { titleBar } from '../shell.js';
import { itemStatus } from '../../core/srs.js';
import { norm } from '../../core/text.js';

function flat(s) { return norm(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); }
function filtered(ctx) {
  const t = ctx.travel, lang = ctx.lang, ls = ctx.ls;
  const q = flat(t.q || '');
  return lang.allItems.filter(it => {
    if (t.cat === 'learned' && !ls.items[it.id]) return false;
    if (t.cat && t.cat !== 'all' && t.cat !== 'learned' && it.unitId !== t.cat) return false;
    if (!q) return true;
    return flat(it.text).includes(q) || flat(it.de).includes(q) || flat(it.hint || '').includes(q);
  });
}
function list(ctx) {
  const items = filtered(ctx), ls = ctx.ls, lang = ctx.lang;
  if (!items.length) return h`<div class="muted" style="padding:20px 0;text-align:center">Nichts gefunden.</div>`;
  const byUnit = new Map();
  items.forEach(it => { if (!byUnit.has(it.unitId)) byUnit.set(it.unitId, []); byUnit.get(it.unitId).push(it); });
  return lang.data.units.filter(u => byUnit.has(u.id)).map(u => h`<h3 class="sec">${u.title}</h3><div class="card">${byUnit.get(u.id).map(it => h`<button class="prow" data-act="show" data-id="${it.id}"><span class="st ${itemStatus(ls.items[it.id])}" title="${itemStatus(ls.items[it.id])}"></span><div class="w"><div class="t" lang="${lang.code}">${it.text}</div><div class="d">${it.reading && it.reading !== it.text ? h`<span lang="${lang.code}">${it.reading}</span> · ` : ''}${it.roman ? h`${it.roman} · ` : ''}${it.de}${it.hint ? h` · <i>${it.hint}</i>` : ''}</div></div><span class="spk small" data-act="say" data-text="${lang.speakText(it)}" role="button" aria-label="Anhören">${raw(icon('speaker'))}</span></button>`)}</div>`);
}
export default {
  id: 'travel', tab: 'travel',
  header() { return titleBar('Reise'); },
  render(ctx) {
    ctx.travel = ctx.travel || { q: '', cat: 'all' };
    const t = ctx.travel, lang = ctx.lang;
    const chips = [{ id: 'all', l: 'Alle' }, { id: 'learned', l: 'Gelernt' }].concat(lang.data.units.map(u => ({ id: u.id, l: u.title })));
    const pron = (lang.data.pronunciation || []).map(r => h`<tr><td lang="${lang.code}">${r[0]}</td><td>${r[1]}</td></tr>`);
    const tones = (lang.data.tones || []).map(x => h`<tr><td><button class="spk small" data-act="say" data-text="${x.sample}" aria-label="Anhören">${raw(icon('speaker'))}</button></td><td><b lang="${lang.code}">${x.sample}</b> · ${x.name}, ${x.label}<br><span class="muted">${x.desc}</span></td></tr>`);
    return h`<div class="screen fade">
      <label class="search">${raw(icon('search'))}<input type="search" value="${t.q}" placeholder="Wort oder Satz suchen" inputmode="search" autocapitalize="off" autocorrect="off" spellcheck="false" data-input="search" aria-label="Suche"></label>
      <div class="chips">${chips.map(c => h`<button data-act="cat" data-cat="${c.id}" class="${t.cat === c.id ? 'on' : ''}">${c.l}</button>`)}</div>
      <div class="muted small" style="margin-bottom:6px">Antippen zeigt den Satz groß zum Vorzeigen.</div>
      <div id="travel-list">${list(ctx)}</div>
      ${pron.length ? h`<details style="margin-top:16px"><summary>Lautschrift-Legende</summary><div class="body"><table class="pron">${pron}</table></div></details>` : ''}
      ${tones.length ? h`<details><summary>Die 6 Töne</summary><div class="body"><table class="pron">${tones}</table></div></details>` : ''}
    </div>`;
  },
  actions: {
    search(ctx, el) { ctx.travel.q = el.value; mount($('#travel-list'), list(ctx)); },
    cat(ctx, el) { ctx.travel.cat = el.dataset.cat; ctx.render(); const inp = $('[data-input="search"]'); if (inp) inp.value = ctx.travel.q; },
    show(ctx, el, ev) {
      if (ev && ev.target.closest('[data-act="say"]')) return;
      const it = ctx.item(el.dataset.id); if (!it) return;
      ctx.unlockAudio();
      const host = document.createElement('div'); host.className = 'showbig fade';
      host.innerHTML = String(h`<button class="x" data-act="close" aria-label="Schließen">${raw(icon('close'))}</button><div class="t" lang="${ctx.lang.code}">${it.text}</div>${it.reading && it.reading !== it.text ? h`<div class="hnt" lang="${ctx.lang.code}">${it.reading}</div>` : ''}${it.roman ? h`<div class="hnt">${it.roman}</div>` : ''}<div class="d">${it.de}</div>${it.hint ? h`<div class="hnt">Klingt wie: ${it.hint}</div>` : ''}<button class="spk" data-act="say" aria-label="Anhören">${raw(icon('speaker'))}</button>`);
      host.addEventListener('click', e => { const b = e.target.closest('[data-act]'); if (!b) return; if (b.dataset.act === 'close') host.remove(); else ctx.speak(ctx.lang.speakText(it)); });
      document.body.appendChild(host);
      ctx.speak(ctx.lang.speakText(it));
    }
  }
};
