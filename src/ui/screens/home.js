import { h, raw, $ } from '../dom.js';
import { icon } from '../icons.js';
import * as sheet from '../sheet.js';
import { langChip } from '../shell.js';
import { streak, todayXp, nextLesson, unitProgress, dueItems, learnedItems, daysSinceLearning } from '../../core/progress.js';
import { voiceState } from '../../platform/tts.js';
import * as swc from '../../platform/sw-client.js';
import { buildForLesson, buildReviewSession, buildWelcomeBack } from '../../core/builders.js';

export default {
  id: 'home', tab: 'home',
  header(ctx) {
    const st = streak(ctx.state);
    return h`<div class="topbar">${langChip(ctx)}<div class="streak ${st ? '' : 'zero'}">${raw(icon('flame'))} ${st}</div></div>`;
  },
  render(ctx) {
    const s = ctx.state, ls = ctx.ls, lang = ctx.lang;
    const xp = todayXp(s), goal = s.settings.goal, due = dueItems(lang, ls).length, next = nextLesson(lang, ls);
    const goalSessions = Math.max(1, Math.round(goal / 10)), doneSessions = Math.floor(xp / 10);
    const pct = Math.min(100, Math.round(100 * xp / goal));
    const st = streak(s);
    const pause = daysSinceLearning(s);
    const welcome = pause !== null && pause >= 7 && learnedItems(lang, ls).length >= 8;
    const lessonSub = e => `Einheit ${e.unitIndex + 1} · ${e.lesson.title}${e.lesson.type === 'script' ? '' : ' · ' + lang.itemsOf(e.lesson.id).length + (e.lesson.type === 'understand' ? ' Sätze zum Verstehen' : ' neue Wörter')} · ~4 Min`;
    const primary = welcome
      ? h`<button class="btn primary" data-act="start-welcome">Willkommen zurück<span class="sub">Kurze Auffrischung, 2 Minuten, nichts Neues</span></button>`
      : next
        ? h`<button class="btn primary" data-act="start-lesson" data-id="${next.lesson.id}">Weiter lernen<span class="sub">${lessonSub(next)}</span></button>`
        : h`<button class="btn primary" data-act="start-review">Üben<span class="sub">Alle Lektionen geschafft, jetzt festigen</span></button>`;
    const dueLabel = due > 12 ? 'Wiederholung bereit · 12 Wörter · ~3 Min' : `${due} ${due === 1 ? 'Wort ist' : 'Wörter sind'} fällig · ~3 Min`;
    const review = due > 0 && !welcome ? h`<button class="btn ghost" data-act="start-review">Wiederholen<span class="sub">${dueLabel}</span></button>` : (welcome && next ? h`<button class="btn ghost" data-act="start-lesson" data-id="${next.lesson.id}">Weiter lernen<span class="sub">${next.lesson.title}</span></button>` : '');
    const env = ctx.env;
    const showInstall = !env.standalone && !s.flags.installHintDismissed && (env.isIOS || ctx.installPrompt);
    const install = !showInstall ? '' : ctx.installPrompt
      ? h`<div class="banner"><span>📲</span><div><b>Als App installieren</b><div class="muted small">Dann startet Sprachpfad direkt vom Homescreen und läuft offline.</div><div style="margin-top:8px"><button class="btn small primary" data-act="install" style="width:auto;display:inline-flex;padding:8px 14px;min-height:38px">Installieren</button></div></div><button class="x" data-act="dismiss-install" aria-label="Schließen">×</button></div>`
      : h`<div class="banner"><span>📲</span><div><b>Auf den Homescreen legen</b><div class="muted small">In Safari unten das Teilen-Symbol tippen (Viereck mit Pfeil nach oben), dann „Zum Home-Bildschirm“. Danach läuft die App offline.</div></div><button class="x" data-act="dismiss-install" aria-label="Schließen">×</button></div>`;
    const voice = voiceState(lang) === 'missing' && !s.flags['voiceHintDismissed:' + lang.code] ? h`<div class="banner"><span>🔈</span><div><b>Keine Stimme für ${lang.name} gefunden</b><div class="muted small">iPhone: Einstellungen › Bedienungshilfen › Gesprochene Inhalte › Stimmen › ${lang.name} › Stimme laden. Danach die App neu öffnen. Hörübungen werden bis dahin durch Leseübungen ersetzt.</div></div><button class="x" data-act="dismiss-voice" aria-label="Schließen">×</button></div>` : '';
    const update = swc.hasUpdate() ? h`<div class="banner update"><span>✨</span><div><b>Neue Version bereit</b><div class="muted small">Einmal neu starten, dann ist sie aktiv.</div></div><button class="btn small primary" data-act="update" style="width:auto;padding:8px 14px;min-height:38px;margin-left:auto">Neu starten</button></div>` : '';
    const units = lang.data.units.map((u, ui) => {
      const nodes = u.lessons.map((l, li) => {
        const L = ls.lessons[l.id]; const done = L && L.done; const isNext = next && next.lesson.id === l.id;
        const cls = done ? 'done' : isNext ? 'next' : '';
        const iconTxt = done ? '✓' : l.type === 'script' ? '♪' : isNext ? '★' : (li + 1);
        const meta = done ? `${L.count}× gemacht · nochmal üben` : isNext ? 'Jetzt dran' : (l.type === 'script' ? 'Hören & erkennen' : l.type === 'understand' ? `${lang.itemsOf(l.id).length} Sätze verstehen` : `${lang.itemsOf(l.id).length} neue Wörter`);
        return h`<button class="node ${cls}" data-act="start-lesson" data-id="${l.id}"><div class="c">${iconTxt}</div><div><div class="l">${l.title}</div><div class="m">${meta}</div></div></button>`;
      });
      return h`<section class="unit" style="--uc:${u.color}"><div class="unit-head"><div><div class="n">Einheit ${ui + 1}</div><div class="t">${u.title}</div><div class="s">${u.subtitle}</div></div><div class="pct">${unitProgress(u, ls)}%</div></div><div class="path">${nodes}</div></section>`;
    });
    return h`<div class="screen fade">
      ${update}${install}${voice}
      <div class="card goal"><div class="ring" style="--p:${pct}"><span>${doneSessions}/${goalSessions}</span></div><div><div class="t">${xp >= goal ? 'Tagesziel geschafft!' : `Heute ${doneSessions} von ${goalSessions} ${goalSessions === 1 ? 'Session' : 'Sessions'}`}</div><div class="s">${st ? `${st} ${st === 1 ? 'Tag' : 'Tage'} am Stück` : 'Eine Session pro Tag hält die Serie'}</div></div></div>
      <div class="stack">${primary}${review}</div>
      ${units}
    </div>`;
  },
  onShow(ctx, opts) {
    const p = ctx.state.pending;
    if (p && p.lang === ctx.state.activeLang && !ctx.resumeAsked) {
      ctx.resumeAsked = true;
      sheet.open(h`<h3>Session fortsetzen?</h3><p>Du warst mitten in „${p.def.title}“ (${p.idx} von ${p.queue.length} Aufgaben).</p><div class="stack"><button class="btn primary" data-act="resume">Fortsetzen</button><button class="btn ghost" data-act="discard">Verwerfen</button></div>`, {
        resume() { sheet.close(); ctx.resumeSession(p); },
        discard() { sheet.close(); ctx.discardPending(); },
        __dismiss: false
      });
    }
    if (!(opts && opts.restoreScroll)) { const n = $('.node.next'); if (n && n.scrollIntoView) { try { n.scrollIntoView({ block: 'center' }); } catch (e) { /* */ } } }
  },
  actions: {
    'start-lesson'(ctx, el) {
      const lesson = ctx.lang.lessonById(el.dataset.id); if (!lesson) return;
      ctx.unlockAudio();
      const done = !!(ctx.ls.lessons[lesson.id] && ctx.ls.lessons[lesson.id].done);
      const entry = ctx.lang.lessons.find(e => e.lesson.id === lesson.id);
      const tonesDone = !!(ctx.ls.plugins.tones && ctx.ls.plugins.tones.done);
      ctx.startSession(buildForLesson(ctx.lang, ctx.ls, lesson, { repeat: done, allowSpeak: ctx.speakAllowed(), allowListen: ctx.listenAllowed(), toneWords: tonesDone && entry && entry.unitIndex <= 2 }));
    },
    'start-review'(ctx) { ctx.unlockAudio(); ctx.startSession(buildReviewSession(ctx.lang, ctx.ls, { allowSpeak: ctx.speakAllowed(), allowListen: ctx.listenAllowed() })); },
    'start-welcome'(ctx) { ctx.unlockAudio(); ctx.startSession(buildWelcomeBack(ctx.lang, ctx.ls, { allowListen: ctx.listenAllowed() })); },
    'dismiss-install'(ctx) { ctx.update(s => { s.flags.installHintDismissed = true; }); ctx.render(); },
    'dismiss-voice'(ctx) { ctx.update(s => { s.flags['voiceHintDismissed:' + ctx.lang.code] = true; }); ctx.render(); },
    async install(ctx) { const p = ctx.installPrompt; if (!p) return; p.prompt(); try { await p.userChoice; } catch (e) { /* */ } ctx.installPrompt = null; ctx.render(); },
    update() { swc.applyUpdate(); }
  }
};
