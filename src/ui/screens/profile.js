import { h, raw } from '../dom.js';
import { icon } from '../icons.js';
import { titleBar, openLangSheet } from '../shell.js';
import * as sheet from '../sheet.js';
import * as store from '../../core/store.js';
import { toast } from '../toast.js';
import { streak, learningDays, weekXp, countLearned, countSolid, dueItems } from '../../core/progress.js';
import { voiceState, voiceName } from '../../platform/tts.js';
import { applyTheme } from '../theme.js';
import { APP_VERSION } from '../../version.js';
import { todayStr } from '../../core/text.js';
import { LANG_LIST } from '../../lang/registry.js';

const WD = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
export default {
  id: 'profile', tab: 'profile',
  header() { return titleBar('Profil'); },
  render(ctx) {
    const s = ctx.state, lang = ctx.lang, ls = ctx.ls;
    const st = streak(s), best = Math.max(st, (s.stats && s.stats.bestStreak) || 0);
    const week = weekXp(s); const max = Math.max(s.settings.goal, ...week.map(w => w.xp));
    const bars = week.map(w => { const [y, m, d] = w.d.split('-').map(Number); const wd = WD[new Date(y, m - 1, d).getDay()]; return h`<div class="b ${w.d === todayStr() ? 'today' : ''}"><i style="height:${Math.round(100 * w.xp / max)}%"></i><span>${wd}</span></div>`; });
    const langCards = LANG_LIST.filter(l => l.available).map(l => {
      const L = s.langs[l.code];
      const learned = L ? countLearned(L) : 0, solid = L ? countSolid(L) : 0, lessons = L ? Object.values(L.lessons).filter(x => x.done).length : 0;
      const total = l.code === lang.code ? lang.lessons.length : null;
      return h`<div class="card"><div class="row" style="justify-content:space-between"><div><b>${l.flag} ${l.name}</b><div class="muted small">${learned} gelernt · ${solid} sitzen · Lektionen ${lessons}${total ? ' von ' + total : ''}</div></div>${l.code === s.activeLang ? h`<span class="muted small">aktiv</span>` : h`<button class="btn small ghost" style="width:auto" data-act="switch" data-code="${l.code}">Wechseln</button>`}</div></div>`;
    });
    const vs = voiceState(lang);
    const voiceInfo = vs === 'none' ? 'Keine Sprachausgabe in diesem Browser' : vs === 'ok' ? `Stimme: ${voiceName(lang)}` : vs === 'missing' ? `Keine Stimme für ${lang.name} gefunden` : 'Stimme wird beim ersten Abspielen geladen';
    const seg = (key, vals, cur) => h`<div class="seg">${vals.map(v => h`<button data-act="set-${key}" data-v="${v.v}" class="${cur === v.v ? 'on' : ''}">${v.l}</button>`)}</div>`;
    return h`<div class="screen fade">
      <div class="kpis"><div class="kpi"><div class="v">🔥 ${st}</div><div class="k">Serie</div></div><div class="kpi"><div class="v">${learningDays(s)}</div><div class="k">Lerntage</div></div><div class="kpi"><div class="v">${best}</div><div class="k">Beste Serie</div></div></div>
      <div class="card"><div class="row" style="justify-content:space-between"><b>Diese Woche</b><span class="muted small">Ziel ${Math.max(1, Math.round(s.settings.goal / 10))} ${s.settings.goal > 10 ? 'Sessions' : 'Session'} pro Tag</span></div><div class="bars">${bars}</div><div class="muted small" style="margin-top:8px">Ein Pausentag pro Woche kostet die Serie nicht.</div></div>
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
