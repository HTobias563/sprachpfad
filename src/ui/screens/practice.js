import { h } from '../dom.js';
import { titleBar } from '../shell.js';
import { dueItems, learnedItems } from '../../core/progress.js';
import { buildReviewSession, buildQuickRound, buildListenOnly, buildDrill, buildPriceDrill } from '../../core/builders.js';
import { NUMBERS } from '../../lang/numbers.js';

export default {
  id: 'practice', tab: 'practice',
  header() { return titleBar('Üben'); },
  render(ctx) {
    const lang = ctx.lang, ls = ctx.ls;
    const learned = learnedItems(lang, ls).length, due = dueItems(lang, ls).length;
    const canListen = ctx.listenAllowed();
    const card = (act, ico, t, s, disabled) => h`<button class="pcard" data-act="${act}" ${disabled ? 'disabled' : ''}><div class="ico">${ico}</div><div><div class="t">${t}</div><div class="s">${s}</div></div></button>`;
    const empty = learned ? '' : h`<div class="banner"><span>🌱</span><div><b>Erst eine Lektion, dann gibt es hier etwas zu üben.</b><div class="muted small">Alles, was du im Lernpfad gelernt hast, kannst du hier wiederholen, hören und trainieren.</div></div></div>`;
    const plugins = Object.values(lang.plugins).map(p => card('drill', p.icon, p.title, p.subtitle || '', false));
    return h`<div class="screen fade">${empty}
      ${card('review', '🔁', 'Wiederholen', due ? `${due > 12 ? '12+' : due} ${due === 1 ? 'Wort' : 'Wörter'} fällig · ~3 Min` : 'Nichts fällig, festigt trotzdem · ~3 Min', !learned)}
      ${card('quick', '⚡', 'Schnellrunde', '6 Wörter · ~2 Min', !learned)}
      ${card('listen', '🎧', 'Nur hören', canListen ? '8 Wörter, nur mit den Ohren · ~2 Min' : 'Braucht eine Stimme für ' + lang.name, !learned || !canListen)}
      <h3 class="sec">Trainer</h3>
      ${plugins}
      ${NUMBERS[lang.code] ? card('prices', '💴', 'Preise hören', canListen ? '10 Beträge hören und erkennen · ~2 Min' : 'Braucht eine Stimme für ' + lang.name, !canListen) : ''}
    </div>`;
  },
  actions: {
    review(ctx) { ctx.unlockAudio(); ctx.startSession(buildReviewSession(ctx.lang, ctx.ls, { allowSpeak: ctx.speakAllowed(), allowListen: ctx.listenAllowed() })); },
    quick(ctx) { ctx.unlockAudio(); ctx.startSession(buildQuickRound(ctx.lang, ctx.ls, { allowSpeak: ctx.speakAllowed(), allowListen: ctx.listenAllowed() })); },
    listen(ctx) { ctx.unlockAudio(); ctx.startSession(buildListenOnly(ctx.lang, ctx.ls, {})); },
    drill(ctx, el) { ctx.unlockAudio(); const id = Object.keys(ctx.lang.plugins)[0]; ctx.startSession(buildDrill(ctx.lang, ctx.ls, id, 10)); },
    prices(ctx) { ctx.unlockAudio(); ctx.startSession(buildPriceDrill(ctx.lang, ctx.ls, 10)); }
  }
};
