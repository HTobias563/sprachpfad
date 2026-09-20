import { h } from '../dom.js';
import * as router from '../router.js';
export default {
  id: 'done', noDirect: true,
  render(ctx) {
    const d = ctx.done || { xp: 0, accuracy: 100, streak: 0, perfect: false, kind: 'lesson', goalHit: false };
    const title = d.perfect ? 'Fehlerfrei!' : d.accuracy >= 80 ? 'Stark!' : 'Geschafft!';
    const emoji = d.perfect ? '🏆' : d.kind === 'review' ? '🔁' : '🎉';
    return h`<div class="screen done fade">
      <div class="emoji" aria-hidden="true">${emoji}</div><h2>${title}</h2>
      <div class="muted">${d.goalHit ? 'Tagesziel erreicht. Serie gesichert.' : 'Noch eine Session und das Tagesziel ist voll.'}</div>
      <div class="stats"><div class="stat"><div class="v">+${d.xp}</div><div class="k">XP</div></div><div class="stat"><div class="v">${d.accuracy}%</div><div class="k">Richtig</div></div><div class="stat"><div class="v">🔥 ${d.streak}</div><div class="k">Serie</div></div></div>
      <div class="stack" style="width:100%"><button class="btn primary" data-act="home">Weiter</button></div>
    </div>`;
  },
  actions: { home() { router.go('home', { replace: true }); } }
};
