import { h } from '../dom.js';
import { tabs } from '../shell.js';
import * as sheet from '../sheet.js';
import * as store from '../../core/store.js';
import { toast } from '../toast.js';
import { learnedItems, learningDays } from '../../core/progress.js';
import { voiceState, voiceName } from '../../platform/tts.js';
import { buildDrill } from '../../core/builders.js';
import { APP_VERSION } from '../../version.js';
import { todayStr } from '../../core/text.js';

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light' || theme === 'dark') root.dataset.theme = theme; else delete root.dataset.theme;
}
export default {
  id: 'more', tab: 'more',
  render(ctx) {
    const s = ctx.state, lang = ctx.lang, d = lang.data;
    const vs = voiceState(lang);
    const voiceInfo = vs === 'none' ? 'Keine Sprachausgabe in diesem Browser' : vs === 'ok' ? `Stimme: ${voiceName(lang)}` : vs === 'missing' ? `Keine ${lang.name.toLowerCase()}e Stimme gefunden` : 'Stimme wird beim ersten Abspielen geladen';
    const pron = (d.pronunciation || []).map(r => h`<tr><td lang="${lang.code}">${r[0]}</td><td>${r[1]}</td></tr>`);
    const tonesRows = (d.tones || []).map(t => h`<tr><td lang="${lang.code}">${t.sample}</td><td><b>${t.name}</b> · ${t.label}<br><span class="muted">${t.desc}</span></td></tr>`);
    const plugins = Object.values(lang.plugins).map(p => h`<button class="btn ghost" data-act="drill" data-plugin="${p.id}">${p.icon} ${p.title}<span class="sub">${p.subtitle || ''}</span></button>`);
    const seg = (key, vals, cur) => h`<div class="seg">${vals.map(v => h`<button data-act="set-${key}" data-v="${v.v}" class="${cur === v.v ? 'on' : ''}">${v.l}</button>`)}</div>`;
    return h`<div class="screen with-nav fade"><div class="topbar"><h1>Mehr</h1></div>
      <div class="card">
        <div class="setrow"><div><div class="l">Tagesziel</div><div class="d">Eine Session gibt 10 XP</div></div>${seg('goal', [{ v: 10, l: '10' }, { v: 20, l: '20' }, { v: 30, l: '30' }], s.settings.goal)}</div>
        <div class="setrow"><div><div class="l">Erscheinungsbild</div><div class="d">Hell, dunkel oder wie das System</div></div>${seg('theme', [{ v: 'auto', l: 'Auto' }, { v: 'light', l: 'Hell' }, { v: 'dark', l: 'Dunkel' }], s.settings.theme)}</div>
        <div class="setrow"><div><div class="l">Sprechübungen</div><div class="d">Nachsprechen mit Mikrofon, braucht Internet</div></div><button class="switch ${s.settings.speak ? 'on' : ''}" role="switch" aria-checked="${!!s.settings.speak}" data-act="toggle" data-key="speak"></button></div>
        <div class="setrow"><div><div class="l">Feedback-Töne</div><div class="d">Kurzer Klang bei richtig und falsch</div></div><button class="switch ${s.settings.sound ? 'on' : ''}" role="switch" aria-checked="${!!s.settings.sound}" data-act="toggle" data-key="sound"></button></div>
        <div class="setrow"><div><div class="l">Sprachausgabe</div><div class="d">${voiceInfo}</div></div><button class="spk small" data-act="say-test" aria-label="Testen">🔊</button></div>
      </div>
      <div class="stack" style="margin-bottom:14px">${plugins}</div>
      ${pron.length ? h`<details><summary>Lautschrift-Legende</summary><div class="body"><table class="pron">${pron}</table></div></details>` : ''}
      ${tonesRows.length ? h`<details><summary>Die 6 Töne</summary><div class="body"><table class="pron">${tonesRows}</table></div></details>` : ''}
      <details><summary>Backup</summary><div class="body stack">
        <div class="muted small">Der Fortschritt liegt nur auf diesem Gerät. Mit einem Backup kannst du ihn auf ein anderes Handy mitnehmen.${s.flags.persisted ? ' Speicher ist als dauerhaft markiert.' : ''}</div>
        <button class="btn ghost small" data-act="export">Backup speichern</button>
        <label class="btn ghost small" style="cursor:pointer">Backup laden<input type="file" accept="application/json,.json" data-change="import" style="display:none"></label>
        <button class="btn ghost small" data-act="reset" style="color:var(--bad)">Fortschritt zurücksetzen</button>
      </div></details>
      <div class="muted small" style="text-align:center;margin:10px 0">Sprachpfad ${APP_VERSION} · ${learnedItems(lang, ctx.ls).length} Wörter gelernt · ${learningDays(s)} Lerntage</div>
    </div>${tabs('more')}`;
  },
  actions: {
    'set-goal'(ctx, el) { ctx.update(s => { s.settings.goal = Number(el.dataset.v); }); ctx.render(); },
    'set-theme'(ctx, el) { ctx.update(s => { s.settings.theme = el.dataset.v; }); applyTheme(el.dataset.v); ctx.render(); },
    toggle(ctx, el) { const k = el.dataset.key; ctx.update(s => { s.settings[k] = !s.settings[k]; }); if (k === 'speak') ctx.resetSpeech(); ctx.render(); },
    'say-test'(ctx) { ctx.unlockAudio(); ctx.speak(ctx.lang.data.testPhrase || ctx.lang.allItems[0].text); setTimeout(() => ctx.render(), 500); },
    drill(ctx, el) { ctx.unlockAudio(); ctx.startSession(buildDrill(ctx.lang, ctx.ls, el.dataset.plugin, 10)); },
    export(ctx) { exportBackup(ctx); },
    import(ctx, el) { importBackup(ctx, el.files && el.files[0]); },
    reset(ctx) {
      sheet.open(h`<h3>Wirklich alles löschen?</h3><p>Gelernte Wörter, Serie und XP aller Sprachen werden zurückgesetzt.</p><div class="stack"><button class="btn ghost" data-act="cancel">Abbrechen</button><button class="btn bad" data-act="ok">Ja, zurücksetzen</button></div>`, {
        cancel() { sheet.close(); },
        ok() { sheet.close(); store.reset(); ctx.update(s => { s.onboardingDone = true; }); toast('Zurückgesetzt'); ctx.render(); }
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
