import { h, raw } from '../dom.js';
import { icon } from '../icons.js';
import { titleBar, openLangSheet } from '../shell.js';
import * as sheet from '../sheet.js';
import * as store from '../../core/store.js';
import { toast } from '../toast.js';
import { streak, streakInfo, learningDays, weekXp, countLearned, countSolid, dueItems, dayXp } from '../../core/progress.js';
import { voiceState, voiceName } from '../../platform/tts.js';
import { applyTheme } from '../theme.js';
import { APP_VERSION } from '../../version.js';
import { todayStr, addDays, pad2 } from '../../core/text.js';
import { LANG_LIST } from '../../lang/registry.js';

const WD = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
function monthName(d) { const [y, m] = d.split('-').map(Number); return MONTHS[m - 1] + ' ' + y; }
function calendar(s, today) {
  const [y, m] = today.split('-').map(Number);
  const first = `${y}-${pad2(m)}-01`; const daysIn = new Date(y, m, 0).getDate();
  const startDow = (new Date(y, m - 1, 1).getDay() + 6) % 7; // Montag = 0
  const frozen = new Set(streakInfo(s, today).frozen);
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(h`<i></i>`);
  for (let d = 1; d <= daysIn; d++) {
    const ds = `${y}-${pad2(m)}-${pad2(d)}`; const xp = dayXp(s, ds);
    const cls = xp >= s.settings.goal ? 'full' : xp > 0 ? 'half' : frozen.has(ds) ? 'frozen' : ds > today ? 'future' : '';
    cells.push(h`<i class="${cls} ${ds === today ? 'today' : ''}" title="${ds}${xp ? ' · ' + xp + ' XP' : ''}">${frozen.has(ds) ? '❄' : d}</i>`);
  }
  return h`<div class="cal"><div class="wd">${['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(w => h`<span>${w}</span>`)}</div><div class="grid">${cells}</div></div>`;
}
function canList(ctx) {
  const lang = ctx.lang, ls = ctx.ls;
  const rows = []; let nextShown = false;
  lang.data.units.forEach(u => {
    if (!u.can) return;
    const done = u.lessons.every(l => ls.lessons[l.id] && ls.lessons[l.id].done);
    if (done) u.can.forEach(c => rows.push(h`<div class="canrow ok">✓ <span>${c}</span></div>`));
    else if (!nextShown) { nextShown = true; u.can.forEach(c => rows.push(h`<div class="canrow"><span class="muted">○ ${c}</span></div>`)); }
  });
  return rows.length ? h`${rows}` : h`<div class="muted small">Nach der ersten Einheit steht hier, was du im Urlaub schon kannst.</div>`;
}
function icsFile(ctx) {
  const hh = ctx.state.settings.remindHour || 20;
  const url = location.href.split('#')[0];
  const start = addDays(todayStr(), 1).replace(/-/g, '') + 'T' + pad2(hh) + '0000';
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Sprachpfad//DE', 'BEGIN:VEVENT', 'UID:sprachpfad-daily-' + Date.now() + '@sprachpfad', 'DTSTAMP:' + stamp, 'DTSTART:' + start, 'DURATION:PT5M', 'RRULE:FREQ=DAILY', 'SUMMARY:Sprachpfad: 4 Minuten lernen', 'DESCRIPTION:' + url, 'URL:' + url, 'BEGIN:VALARM', 'TRIGGER:PT0S', 'ACTION:DISPLAY', 'DESCRIPTION:Sprachpfad', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'];
  return lines.join('\r\n') + '\r\n';
}
export default {
  id: 'profile', tab: 'profile',
  header() { return titleBar('Profil'); },
  render(ctx) {
    const s = ctx.state, lang = ctx.lang, ls = ctx.ls;
    const today = todayStr();
    const st = streak(s), best = Math.max(st, (s.stats && s.stats.bestStreak) || 0);
    const week = weekXp(s); const max = Math.max(s.settings.goal, ...week.map(w => w.xp));
    const bars = week.map(w => { const [y, m, d] = w.d.split('-').map(Number); const wd = WD[new Date(y, m - 1, d).getDay()]; return h`<div class="b ${w.d === todayStr() ? 'today' : ''}"><i style="height:${Math.round(100 * w.xp / max)}%"></i><span>${wd}</span></div>`; });
    const langCards = LANG_LIST.filter(l => l.available).map(l => {
      const L = s.langs[l.code];
      const learned = L ? countLearned(L) : 0, solid = L ? countSolid(L) : 0, lessons = L ? Object.values(L.lessons).filter(x => x.done).length : 0;
      const total = l.code === lang.code ? lang.lessons.length : null;
      const fit = l.code === lang.code ? Math.round(100 * learned / Math.max(1, lang.allItems.length)) : null;
      return h`<div class="card"><div class="row" style="justify-content:space-between"><div><b>${l.flag} ${l.name}</b>${fit !== null ? h` <span class="muted small">· Reisefit ${fit} %</span>` : ''}<div class="muted small">${learned} gelernt · ${solid} sitzen · Lektionen ${lessons}${total ? ' von ' + total : ''}</div></div>${l.code === s.activeLang ? h`<span class="muted small">aktiv</span>` : h`<button class="btn small ghost" style="width:auto" data-act="switch" data-code="${l.code}">Wechseln</button>`}</div></div>`;
    });
    const vs = voiceState(lang);
    const voiceInfo = vs === 'none' ? 'Keine Sprachausgabe in diesem Browser' : vs === 'ok' ? `Stimme: ${voiceName(lang)}` : vs === 'missing' ? `Keine Stimme für ${lang.name} gefunden` : 'Stimme wird beim ersten Abspielen geladen';
    const seg = (key, vals, cur) => h`<div class="seg">${vals.map(v => h`<button data-act="set-${key}" data-v="${v.v}" class="${cur === v.v ? 'on' : ''}">${v.l}</button>`)}</div>`;
    return h`<div class="screen fade">
      <div class="kpis"><div class="kpi"><div class="v">🔥 ${st}</div><div class="k">Serie</div></div><div class="kpi"><div class="v">${learningDays(s)}</div><div class="k">Lerntage</div></div><div class="kpi"><div class="v">${best}</div><div class="k">Beste Serie</div></div></div>
      <div class="card"><div class="row" style="justify-content:space-between"><b>Diese Woche</b><span class="muted small">Ziel ${Math.max(1, Math.round(s.settings.goal / 10))} ${s.settings.goal > 10 ? 'Sessions' : 'Session'} pro Tag</span></div><div class="bars">${bars}</div><div class="muted small" style="margin-top:8px">Ein Pausentag pro Woche kostet die Serie nicht.</div></div>
      <div class="card"><div class="row" style="justify-content:space-between"><b>${monthName(today)}</b><span class="muted small">❄ = Pausentag</span></div>${calendar(s, today)}</div>
      <h3 class="sec">Du kannst jetzt</h3>
      <div class="card">${canList(ctx)}</div>
      <h3 class="sec">Meine Sprachen</h3>
      ${langCards}
      <button class="btn ghost small" data-act="lang-sheet" style="margin-bottom:14px">Sprache wechseln</button>
      <h3 class="sec">Einstellungen</h3>
      <div class="card">
        <div class="setrow"><div><div class="l">Tagesziel</div><div class="d">Sessions pro Tag</div></div>${seg('goal', [{ v: 10, l: '1' }, { v: 20, l: '2' }, { v: 30, l: '3' }], s.settings.goal)}</div>
        <div class="setrow"><div><div class="l">Erscheinungsbild</div><div class="d">Hell, dunkel oder wie das System</div></div>${seg('theme', [{ v: 'auto', l: 'Auto' }, { v: 'light', l: 'Hell' }, { v: 'dark', l: 'Dunkel' }], s.settings.theme)}</div>
        ${lang.hasRoman ? h`<div class="setrow"><div><div class="l">Umschrift zeigen</div><div class="d">Lateinische Umschrift unter der Schrift. Wird nach der Schrift-Einheit automatisch ausgeblendet.</div></div><button class="switch ${s.settings.showRoman !== false ? 'on' : ''}" role="switch" aria-checked="${s.settings.showRoman !== false}" data-act="toggle" data-key="showRoman"></button></div>` : ''}
        <div class="setrow"><div><div class="l">Sprechübungen</div><div class="d">Nachsprechen mit Mikrofon, braucht Internet</div></div><button class="switch ${s.settings.speak ? 'on' : ''}" role="switch" aria-checked="${!!s.settings.speak}" data-act="toggle" data-key="speak"></button></div>
        <div class="setrow"><div><div class="l">Feedback-Töne</div><div class="d">Kurzer Klang bei richtig und falsch</div></div><button class="switch ${s.settings.sound ? 'on' : ''}" role="switch" aria-checked="${!!s.settings.sound}" data-act="toggle" data-key="sound"></button></div>
        <div class="setrow"><div><div class="l">Sprachausgabe</div><div class="d">${voiceInfo}. Nichts zu hören? Lautlos-Schalter und Lautstärke prüfen.</div></div><button class="spk small" data-act="say-test" aria-label="Testen">${raw(icon('speaker'))}</button></div>
      </div>
      <details><summary>Erinnerung</summary><div class="body stack">
        <div class="muted small">Ein täglicher Kalender-Termin mit Link zur App. Die Datei öffnen, dann trägt der Kalender den Termin ein.</div>
        <div class="seg">${[8, 12, 18, 20].map(hh => h`<button data-act="set-remind" data-v="${hh}" class="${(s.settings.remindHour || 20) === hh ? 'on' : ''}">${hh} Uhr</button>`)}</div>
        <button class="btn ghost small" data-act="ics">In Kalender eintragen</button>
        ${typeof navigator !== 'undefined' && 'setAppBadge' in navigator ? h`<div class="setrow" style="border:0;padding-top:4px"><div><div class="l">Badge am App-Icon</div><div class="d">Zeigt die Zahl fälliger Wörter. Braucht einmal die Erlaubnis für Mitteilungen.</div></div><button class="switch ${s.flags.badge ? 'on' : ''}" role="switch" aria-checked="${!!s.flags.badge}" data-act="badge"></button></div>` : ''}
      </div></details>
      <details><summary>Backup</summary><div class="body stack">
        <div class="muted small">Der Fortschritt liegt nur auf diesem Gerät. Mit einem Backup kannst du ihn auf ein anderes Handy mitnehmen.${s.flags.lastBackup ? ' Letztes Backup: ' + s.flags.lastBackup + '.' : ''}</div>
        <button class="btn ghost small" data-act="export">Backup speichern</button>
        <label class="btn ghost small" style="cursor:pointer">Backup laden<input type="file" accept="application/json,.json" data-change="import" style="display:none"></label>
        <button class="btn ghost small" data-act="reset" style="color:var(--bad)">Fortschritt zurücksetzen</button>
      </div></details>
      <div class="muted small" style="text-align:center;margin:10px 0">Sprachpfad ${APP_VERSION} · ${dueItems(lang, ls).length} fällig</div>
    </div>`;
  },
  actions: {
    'set-goal'(ctx, el) { ctx.update(s => { s.settings.goal = Number(el.dataset.v); }); ctx.render(); },
    'set-remind'(ctx, el) { ctx.update(s => { s.settings.remindHour = Number(el.dataset.v); }); ctx.render(); },
    ics(ctx) {
      const data = icsFile(ctx); const name = 'sprachpfad-erinnerung.ics';
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([data], { type: 'text/calendar' })); a.download = name;
      document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
      toast('Kalenderdatei erstellt. Öffnen, dann „Zum Kalender hinzufügen“.', 4000);
    },
    async badge(ctx) {
      if (ctx.state.flags.badge) { ctx.update(s => { s.flags.badge = false; }); try { await navigator.clearAppBadge(); } catch (e) { /* */ } ctx.render(); return; }
      let ok = true;
      try { if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') ok = (await Notification.requestPermission()) === 'granted'; } catch (e) { ok = false; }
      if (!ok) { toast('Ohne Erlaubnis für Mitteilungen geht kein Badge.'); return; }
      ctx.update(s => { s.flags.badge = true; }); ctx.updateBadge(); ctx.render();
    },
    'set-theme'(ctx, el) { ctx.update(s => { s.settings.theme = el.dataset.v; }); applyTheme(el.dataset.v); ctx.render(); },
    toggle(ctx, el) { const k = el.dataset.key; ctx.update(s => { s.settings[k] = k === 'showRoman' ? s.settings.showRoman === false : !s.settings[k]; }); if (k === 'speak') ctx.resetSpeech(); ctx.render(); },
    'say-test'(ctx) { ctx.unlockAudio(); ctx.speak(ctx.lang.data.testPhrase || ctx.lang.allItems[0].text); setTimeout(() => ctx.render(), 500); },
    switch(ctx, el) { ctx.switchLang(el.dataset.code); },
    'lang-sheet'(ctx) { openLangSheet(ctx); },
    export(ctx) { exportBackup(ctx); },
    import(ctx, el) { importBackup(ctx, el.files && el.files[0]); },
    reset(ctx) {
      sheet.open(h`<h3>Wirklich alles löschen?</h3><p>Gelernte Wörter, Serie und XP aller Sprachen werden zurückgesetzt.</p><div class="stack"><button class="btn ghost" data-act="cancel">Abbrechen</button><button class="btn bad" data-act="ok">Ja, zurücksetzen</button></div>`, {
        cancel() { sheet.close(); },
        ok() { sheet.close(); store.reset(); ctx.update(s => { s.onboardingDone = true; }); ctx.afterStateReplaced(); toast('Zurückgesetzt'); ctx.render(); }
      });
    }
  }
};
function exportBackup(ctx) {
  const data = store.exportJson();
  const name = 'sprachpfad-backup-' + todayStr() + '.json';
  ctx.update(s => { s.flags.lastBackup = todayStr(); });
  try {
    const file = new File([data], name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { navigator.share({ files: [file], title: 'Sprachpfad Backup' }).catch(() => {}); return; }
  } catch (e) { /* weiter unten */ }
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' })); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
function importBackup(ctx, file) {
  if (!file) return;
  const rd = new FileReader();
  rd.onload = () => {
    try {
      const s = JSON.parse(rd.result);
      if (!s || typeof s !== 'object' || (!s.langs && !s.items)) throw new Error('format');
      store.replaceState(s); ctx.afterStateReplaced(); toast('Backup geladen'); ctx.render();
    } catch (e) { toast('Datei nicht lesbar'); }
  };
  rd.readAsText(file);
}
