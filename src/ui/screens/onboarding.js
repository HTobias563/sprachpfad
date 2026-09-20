import { h, raw } from '../dom.js';
import { icon } from '../icons.js';
import { LANG_LIST } from '../../lang/registry.js';
import { voiceState, voiceName } from '../../platform/tts.js';
import * as store from '../../core/store.js';
import { nextLesson } from '../../core/progress.js';
import { buildForLesson } from '../../core/builders.js';

function onb(ctx) { return ctx.onb || (ctx.onb = { step: 0, lang: 'vi', goal: 1, tested: false }); }
export default {
  id: 'onboarding',
  header(ctx) { const o = onb(ctx); return h`<div class="topbar"><h1 style="font-size:17px;color:var(--muted)">Sprachpfad</h1>${o.step < 2 ? h`<button class="muted small" data-act="finish">Überspringen</button>` : ''}</div>`; },
  render(ctx) {
    const o = onb(ctx); let body;
    if (o.step === 0) {
      body = h`<h2>Welche Sprache zuerst?</h2><div class="lead">Kurze Sessions, offline, ohne Konto. Du kannst später jederzeit wechseln.</div>
        <div class="pickgrid">${LANG_LIST.map(l => h`<button class="pick ${o.lang === l.code ? 'on' : ''}" data-act="pick-lang" data-code="${l.code}" ${l.available ? '' : 'disabled'}><span class="flag">${l.flag}</span><span><div class="n">${l.name}</div><div class="m">${l.available ? 'Für den Urlaub, bis zum einfachen Gespräch' : 'Bald verfügbar'}</div></span>${o.lang === l.code ? raw(icon('check')) : ''}</button>`)}</div>`;
    } else if (o.step === 1) {
      body = h`<h2>Wie viel pro Tag?</h2><div class="lead">Eine Session dauert etwa vier Minuten. Ein kurzer Block hält die Serie, mehr geht immer.</div>
        <div class="pickgrid">${[[1, 'Eine Session', 'Empfohlen. Klein genug für jeden Tag.'], [2, 'Zwei Sessions', 'Etwa acht Minuten.'], [3, 'Drei Sessions', 'Für Tage mit Luft.']].map(([n, t, m]) => h`<button class="pick ${o.goal === n ? 'on' : ''}" data-act="set-goal" data-n="${n}"><span class="flag">${n === 1 ? '🌱' : n === 2 ? '🌿' : '🌳'}</span><span><div class="n">${t}</div><div class="m">${m}</div></span>${o.goal === n ? raw(icon('check')) : ''}</button>`)}</div>`;
    } else {
      const lang = ctx.lang; const vs = voiceState(lang);
      const status = !o.tested ? 'Tippe auf Probehören.' : vs === 'ok' ? `Stimme gefunden: ${voiceName(lang)}.` : vs === 'missing' ? `Keine Stimme für ${lang.name}. iPhone: Einstellungen › Bedienungshilfen › Gesprochene Inhalte › Stimmen › ${lang.name} laden. Die App ersetzt Hörübungen so lange durch Leseübungen.` : 'Nichts gehört? Lautlos-Schalter und Lautstärke prüfen.';
      const home = !ctx.env.standalone && ctx.env.isIOS ? h`<div class="card" style="margin-top:14px"><b>📲 Auf den Homescreen</b><div class="muted small" style="margin-top:6px">In Safari unten das Teilen-Symbol tippen (Viereck mit Pfeil nach oben), dann „Zum Home-Bildschirm“. Dann startet Sprachpfad wie eine App und läuft offline.</div></div>` : '';
      body = h`<h2>Kurzer Hörtest</h2><div class="lead">Die Aussprache kommt aus der Systemstimme deines Handys.</div>
        <div class="card"><div class="row"><button class="spk" data-act="test-voice" aria-label="Probehören">${raw(icon('speaker'))}</button><div><b>Probehören</b><div class="muted small">${status}</div></div></div></div>${home}`;
    }
    return h`<div class="onb fade">${body}<div class="dots">${[0, 1, 2].map(i => h`<i class="${i === o.step ? 'on' : ''}"></i>`)}</div></div>`;
  },
  footer(ctx) {
    const o = onb(ctx);
    return h`<div class="bottom"><div class="in stack">${o.step < 2 ? h`<button class="btn primary" data-act="next">Weiter</button>` : h`<button class="btn primary" data-act="finish">Los geht’s</button>`}${o.step > 0 ? h`<button class="btn ghost small" data-act="back">Zurück</button>` : ''}</div></div>`;
  },
  actions: {
    'pick-lang'(ctx, el) { onb(ctx).lang = el.dataset.code; ctx.render(); },
    'set-goal'(ctx, el) { onb(ctx).goal = Number(el.dataset.n); ctx.render(); },
    'test-voice'(ctx) { onb(ctx).tested = true; ctx.unlockAudio(); ctx.speak(ctx.lang.data.testPhrase || ctx.lang.allItems[0].text); setTimeout(() => ctx.render(), 600); },
    next(ctx) { const o = onb(ctx); if (o.step === 0) ctx.update(s => { s.activeLang = o.lang; }); o.step++; ctx.render(); },
    back(ctx) { onb(ctx).step--; ctx.render(); },
    finish(ctx) {
      const o = onb(ctx);
      store.update(s => { s.onboardingDone = true; s.activeLang = o.lang; s.settings.goal = o.goal * 10; });
      ctx.afterStateReplaced();
      ctx.go('home', { replace: true });
      const next = nextLesson(ctx.lang, ctx.ls);
      if (next) { ctx.unlockAudio(); ctx.startSession(buildForLesson(ctx.lang, ctx.ls, next.lesson, { allowSpeak: false, allowListen: ctx.listenAllowed() })); }
    }
  }
};
