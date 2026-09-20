import { h } from '../dom.js';
import { tabs } from '../shell.js';
import * as sheet from '../sheet.js';
import { streak, todayXp, nextLesson, unitProgress, dueItems } from '../../core/progress.js';
import { voiceState } from '../../platform/tts.js';
import * as swc from '../../platform/sw-client.js';
import { buildForLesson, buildReviewSession } from '../../core/builders.js';

export default {
  id: 'home', tab: 'home',
  render(ctx) {
    const s = ctx.state, ls = ctx.ls, lang = ctx.lang;
    const st = streak(s), xp = todayXp(s), goal = s.settings.goal, due = dueItems(lang, ls).length, next = nextLesson(lang, ls);
    const pct = Math.min(100, Math.round(100 * xp / goal));
    const primary = next
      ? h`<button class="btn primary" data-act="start-lesson" data-id="${next.lesson.id}">Weiter lernen<span class="sub">Einheit ${next.unitIndex + 1} · ${next.lesson.title}${next.lesson.type === 'script' ? '' : ' · ' + lang.itemsOf(next.lesson.id).length + ' neue Wörter'}</span></button>`
      : h`<button class="btn primary" data-act="start-review">Üben<span class="sub">Alle Lektionen geschafft, jetzt festigen</span></button>`;
    const review = due > 0 ? h`<button class="btn ghost" data-act="start-review">Wiederholen<span class="sub">${due} ${due === 1 ? 'Wort ist' : 'Wörter sind'} fällig</span></button>` : '';
    const env = ctx.env;
    const showInstall = !env.standalone && !s.flags.installHintDismissed && (env.isIOS || ctx.installPrompt);
    const install = !showInstall ? '' : ctx.installPrompt
      ? h`<div class="banner"><span>📲</span><div><b>Als App installieren</b><div class="muted small">Dann startet Sprachpfad direkt vom Homescreen und läuft offline.</div><div style="margin-top:8px"><button class="btn small primary" data-act="install" style="width:auto;display:inline-flex;padding:8px 14px;min-height:38px">Installieren</button></div></div><button class="x" data-act="dismiss-install" aria-label="Schließen">×</button></div>`
      : h`<div class="banner"><span>📲</span><div><b>Auf den Homescreen legen</b><div class="muted small">In Safari unten das Teilen-Symbol tippen (Viereck mit Pfeil nach oben), dann „Zum Home-Bildschirm“. Danach läuft die App offline.</div></div><button class="x" data-act="dismiss-install" aria-label="Schließen">×</button></div>`;
    const voice = voiceState(lang) === 'missing' && !s.flags['voiceHintDismissed:' + lang.code] ? h`<div class="banner"><span>🔈</span><div><b>Keine ${lang.name.replace(/isch$/, 'ische')} Stimme gefunden</b><div class="muted small">iPhone: Einstellungen › Bedienungshilfen › Gesprochene Inhalte › Stimmen › ${lang.name} › Stimme laden. Danach die App neu öffnen. Hörübungen werden bis dahin durch Leseübungen ersetzt.</div></div><button class="x" data-act="dismiss-voice" aria-label="Schließen">×</button></div>` : '';
    const update = swc.hasUpdate() ? h`<div class="banner update"><span>✨</span><div><b>Neue Version bereit</b><div class="muted small">Einmal neu starten, dann ist sie aktiv.</div></div><button class="btn small primary" data-act="update" style="width:auto;padding:8px 14px;min-height:38px;margin-left:auto">Neu starten</button></div>` : '';
    const units = lang.data.units.map((u, ui) => {
      const nodes = u.lessons.map((l, li) => {
        const L = ls.lessons[l.id]; const done = L && L.done; const isNext = next && next.lesson.id === l.id;
        const cls = done ? 'done' : isNext ? 'next' : '';
        const icon = done ? '✓' : l.type === 'script' ? '♪' : isNext ? '★' : (li + 1);
        const meta = done ? `${L.count}× gemacht · nochmal üben` : isNext ? 'Jetzt dran' : (l.type === 'script' ? 'Hören & erkennen' : `${lang.itemsOf(l.id).length} neue Wörter`);
        return h`<button class="node ${cls}" data-act="start-lesson" data-id="${l.id}"><div class="c">${icon}</div><div><div class="l">${l.title}</div><div class="m">${meta}</div></div></button>`;
      });
      return h`<section class="unit" style="--uc:${u.color}"><div class="unit-head"><div><div class="n">Einheit ${ui + 1}</div><div class="t">${u.title}</div><div class="s">${u.subtitle}</div></div><div class="pct">${unitProgress(u, ls)}%</div></div><div class="path">${nodes}</div></section>`;
    });
    return h`<div class="screen with-nav fade">
      <div class="topbar"><h1>${lang.flag} ${lang.name}</h1><div class="streak ${st ? '' : 'zero'}"><span aria-hidden="true">🔥</span> ${st}</div></div>
      ${update}${install}${voice}
      <div class="card goal"><div class="ring" style="--p:${pct}"><span>${xp}</span></div><div><div class="t">${xp >= goal ? 'Tagesziel geschafft!' : `Heute ${xp} von ${goal} XP`}</div><div class="s">${st ? `${st} ${st === 1 ? 'Tag' : 'Tage'} am Stück` : 'Eine Session pro Tag hält die Serie'}</div></div></div>
      <div class="stack">${primary}${review}</div>
      ${units}
    </div>${tabs('home')}`;
  },
  onShow(ctx) {
    const p = ctx.state.pending;
    if (p && p.lang === ctx.state.activeLang && !ctx.resumeAsked) {
      ctx.resumeAsked = true;
      sheet.open(h`<h3>Session fortsetzen?</h3><p>Du warst mitten in „${p.def.title}“ (${p.idx} von ${p.queue.length} Aufgaben).</p><div class="stack"><button class="btn primary" data-act="resume">Fortsetzen</button><button class="btn ghost" data-act="discard">Verwerfen</button></div>`, {
        resume() { sheet.close(); ctx.resumeSession(p); },
        discard() { sheet.close(); ctx.discardPending(); },
        __dismiss: false
      });
    }
  },
  actions: {
    'start-lesson'(ctx, el) {
      const lesson = ctx.lang.lessonById(el.dataset.id); if (!lesson) return;
      ctx.unlockAudio();
      const done = !!(ctx.ls.lessons[lesson.id] && ctx.ls.lessons[lesson.id].done);
      ctx.startSession(buildForLesson(ctx.lang, ctx.ls, lesson, { repeat: done, allowSpeak: ctx.speakAllowed(), allowListen: ctx.listenAllowed() }));
    },
    'start-review'(ctx) { ctx.unlockAudio(); ctx.startSession(buildReviewSession(ctx.lang, ctx.ls, { allowSpeak: ctx.speakAllowed(), allowListen: ctx.listenAllowed() })); },
    'dismiss-install'(ctx) { ctx.update(s => { s.flags.installHintDismissed = true; }); ctx.render(); },
    'dismiss-voice'(ctx) { ctx.update(s => { s.flags['voiceHintDismissed:' + ctx.lang.code] = true; }); ctx.render(); },
    async install(ctx) { const p = ctx.installPrompt; if (!p) return; p.prompt(); try { await p.userChoice; } catch (e) { /* */ } ctx.installPrompt = null; ctx.render(); },
    update() { swc.applyUpdate(); }
  }
};
