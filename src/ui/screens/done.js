import { h, $ } from '../dom.js';
import * as router from '../router.js';
import { buildReviewSession } from '../../core/builders.js';

function countUp(el, to, suffix, ms) {
  if (!el) return;
  const start = performance.now();
  const tick = now => { const p = Math.min(1, (now - start) / ms); const v = Math.round(to * (1 - Math.pow(1 - p, 3))); el.textContent = v + (suffix || ''); if (p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}
export default {
  id: 'done', noDirect: true,
  header() { return ''; },
  render(ctx) {
    const d = ctx.done || { xp: 0, accuracy: 100, streak: 0, perfect: false, kind: 'lesson', goalHit: false, milestones: [], due: 0 };
    const title = d.perfect ? 'Fehlerfrei!' : d.accuracy >= 80 ? 'Stark!' : 'Geschafft!';
    const emoji = d.perfect ? '🏆' : d.kind === 'review' || d.kind === 'quick' ? '🔁' : '🎉';
    const goal = ctx.state.settings.goal;
    const newStreakDay = d.streak > d.streakBefore;
    const sub = d.goalHit ? (newStreakDay ? `Tagesziel erreicht. Serie: Tag ${d.streak}.` : 'Tagesziel erreicht.') : 'Noch eine Session und das Tagesziel ist voll.';
    return h`<div class="screen done fade">
      <div class="emoji" aria-hidden="true">${emoji}</div><h2>${title}</h2>
      <div class="muted">${sub}</div>
      <div class="stats"><div class="stat"><div class="v" id="d-xp">+0</div><div class="k">XP</div></div><div class="stat"><div class="v" id="d-acc">0%</div><div class="k">Richtig</div></div><div class="stat"><div class="v">🔥 <span id="d-streak">${d.streakBefore}</span></div><div class="k">Serie</div></div></div>
      <div class="card goal" style="width:100%"><div class="ring" id="d-ring" style="--p:${Math.min(100, Math.round(100 * (d.xpBefore || 0) / goal))}"><span id="d-ringv">${Math.floor((d.xpBefore || 0) / 10)}/${Math.max(1, Math.round(goal / 10))}</span></div><div><div class="t">Tagesziel</div><div class="s">${d.seconds ? Math.max(1, Math.round(d.seconds / 60)) + ' Min gelernt' : ''}</div></div></div>
      ${(d.milestones || []).slice(0, 2).map(m => h`<div class="mile fade"><div class="i">${m.icon}</div><div><div class="t">${m.title}</div><div class="x">${m.text}</div></div></div>`)}
    </div>`;
  },
  footer(ctx) {
    const d = ctx.done || {};
    return h`<div class="bottom"><div class="in stack"><button class="btn primary" data-act="home">Fertig</button>${d.due > 0 ? h`<button class="btn ghost small" data-act="again">Noch eine Runde · ${d.due > 12 ? '12' : d.due} ${d.due === 1 ? 'Wort' : 'Wörter'} wiederholen</button>` : ''}</div></div>`;
  },
  onShow(ctx) {
    const d = ctx.done; if (!d) return;
    const goal = ctx.state.settings.goal;
    countUp($('#d-xp'), d.xp, '', 600); $('#d-xp') && ($('#d-xp').textContent = '+0');
    const xpEl = $('#d-xp'); if (xpEl) { const start = performance.now(); const tick = now => { const p = Math.min(1, (now - start) / 600); xpEl.textContent = '+' + Math.round(d.xp * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }
    countUp($('#d-acc'), d.accuracy, '%', 700);
    setTimeout(() => { const el = $('#d-streak'); if (el) el.textContent = d.streak; }, 500);
    const ring = $('#d-ring'), rv = $('#d-ringv');
    if (ring) {
      const from = Math.min(100, Math.round(100 * (d.xpBefore || 0) / goal)), to = Math.min(100, Math.round(100 * ((d.xpBefore || 0) + d.xp) / goal));
      const start = performance.now();
      const tick = now => { const p = Math.min(1, (now - start) / 800); ring.style.setProperty('--p', Math.round(from + (to - from) * p)); if (p < 1) requestAnimationFrame(tick); else if (rv) rv.textContent = `${Math.floor(((d.xpBefore || 0) + d.xp) / 10)}/${Math.max(1, Math.round(goal / 10))}`; };
      setTimeout(() => requestAnimationFrame(tick), 300);
    }
  },
  actions: {
    home() { router.go('home', { replace: true }); },
    again(ctx) { ctx.unlockAudio(); ctx.startSession(buildReviewSession(ctx.lang, ctx.ls, { allowSpeak: ctx.speakAllowed(), allowListen: ctx.listenAllowed() }), { replace: true }); }
  }
};
