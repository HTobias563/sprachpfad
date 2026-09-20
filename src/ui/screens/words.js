import { h } from '../dom.js';
import { tabs } from '../shell.js';
import { learnedItems } from '../../core/progress.js';
import { isDue, itemStatus } from '../../core/srs.js';

const LABEL = { seen: 'neu', learned: 'gelernt', solid: 'sitzt' };
export default {
  id: 'words', tab: 'words',
  render(ctx) {
    const lang = ctx.lang, ls = ctx.ls, learned = learnedItems(lang, ls);
    const body = !learned.length
      ? h`<div class="card"><b>Noch keine Wörter gelernt.</b><div class="muted small" style="margin-top:6px">Alles, was du in Lektionen lernst, taucht hier zum Nachschlagen und Anhören auf.</div></div>`
      : lang.data.units.map(u => {
        const its = learned.filter(i => i.unitId === u.id); if (!its.length) return '';
        return h`<h3 class="sec">${u.title}</h3><div class="card">${its.map(i => { const st = ls.items[i.id]; return h`<div class="wrow"><button class="spk small" data-act="say" data-text="${lang.speakText(i)}" aria-label="Anhören">🔊</button><div class="w"><div class="vi" lang="${lang.code}">${i.text}</div><div class="de">${i.de}${i.hint ? h` · <i>${i.hint}</i>` : ''}</div></div><div class="due ${isDue(st) ? '' : 'muted'}" style="${isDue(st) ? '' : 'color:var(--muted)'}">${isDue(st) ? 'fällig' : LABEL[itemStatus(st)]}</div></div>`; })}</div>`;
      });
    return h`<div class="screen with-nav fade"><div class="topbar"><h1>Wörter</h1><div class="muted small">${learned.length} von ${lang.allItems.length}</div></div>${body}</div>${tabs('words')}`;
  },
  actions: {}
};
