/* Sprachpfad – Lern-App für Urlaubssprachen */
(function (g) {
'use strict';

const APP_VERSION = '1.0.0';
const STORE_KEY = 'sprachpfad.v1';
const LANG_CODE = 'vi';
const HAS_DOM = typeof document !== 'undefined';

// ---------- Hilfsfunktionen ----------
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function pick(a, n) { return shuffle(a).slice(0, n); }
function rand(a) { return a[Math.floor(Math.random() * a.length)]; }
function pad2(n) { return String(n).padStart(2, '0'); }
function todayStr(d) { d = d || new Date(); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
function addDays(dateStr, n) { const [y, m, d] = dateStr.split('-').map(Number); return todayStr(new Date(y, m - 1, d + n)); }
function norm(s) { return String(s || '').normalize('NFC').toLowerCase().replace(/[.,!?;:"'„“”‚‘’()]/g, ' ').replace(/\s+/g, ' ').trim(); }
function strip(s) { return norm(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); }
function tokens(s) { return norm(s).split(' ').filter(Boolean); }
function words(s) { return String(s).replace(/[?!.,;:]/g, '').split(/\s+/).filter(Boolean); }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

// ---------- Daten ----------
const LANG = g.LANG_DATA[LANG_CODE];
const LESSONS = [];
const ITEMS = {};
LANG.units.forEach((u, ui) => u.lessons.forEach((l, li) => {
  LESSONS.push({ unit: u, lesson: l, unitIndex: ui, lessonIndex: li });
  (l.items || []).forEach(it => { ITEMS[it.id] = Object.assign({}, it, { unitId: u.id, lessonId: l.id }); });
}));
const ALL_ITEMS = Object.values(ITEMS);
function lessonById(id) { const e = LESSONS.find(e => e.lesson.id === id); return e ? e.lesson : null; }
function itemsOf(lessonId) { return ALL_ITEMS.filter(i => i.lessonId === lessonId); }
function unitItems(unitId) { return ALL_ITEMS.filter(i => i.unitId === unitId); }

// ---------- Zustand ----------
const DEFAULT_STATE = { v: 1, lang: LANG_CODE, goal: 20, items: {}, lessons: {}, days: {}, settings: { speak: true, sound: true }, flags: {} };
let S = load();
function load() {
  try {
    const raw = g.localStorage.getItem(STORE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      return Object.assign({}, JSON.parse(JSON.stringify(DEFAULT_STATE)), s, { settings: Object.assign({}, DEFAULT_STATE.settings, s.settings || {}), flags: s.flags || {} });
    }
  } catch (e) { /* kein Speicher verfügbar */ }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}
function save() { try { g.localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* ignorieren */ } }
function resetState() { S = JSON.parse(JSON.stringify(DEFAULT_STATE)); save(); }

// ---------- Spaced Repetition (vereinfachtes SM-2) ----------
function gradeItem(id, wrong, today) {
  today = today || todayStr();
  const st = S.items[id] || { n: 0, ef: 2.5, ivl: 0, due: today, seen: 0, wrong: 0 };
  st.seen++;
  if (wrong) { st.n = 0; st.ivl = 1; st.ef = Math.max(1.3, st.ef - 0.2); st.wrong++; }
  else { st.n++; st.ivl = st.n === 1 ? 1 : st.n === 2 ? 3 : Math.round(st.ivl * st.ef); st.ef = Math.min(2.8, st.ef + 0.05); }
  st.due = addDays(today, st.ivl);
  S.items[id] = st;
  return st;
}
function learnedItems() { return ALL_ITEMS.filter(it => S.items[it.id]); }
function dueItems(today) { today = today || todayStr(); return learnedItems().filter(it => S.items[it.id].due <= today); }
function streak() {
  const today = todayStr();
  let d = S.days[today] ? today : addDays(today, -1);
  let n = 0;
  while (S.days[d]) { n++; d = addDays(d, -1); }
  return n;
}
function todayXp() { return S.days[todayStr()] || 0; }
function nextLesson() { return LESSONS.find(e => !(S.lessons[e.lesson.id] && S.lessons[e.lesson.id].done)) || null; }
function unitProgress(u) { const done = u.lessons.filter(l => S.lessons[l.id] && S.lessons[l.id].done).length; return Math.round(100 * done / u.lessons.length); }

// ---------- Übungen bauen ----------
function distractors(item, n, field) {
  const seen = new Set([norm(item[field])]);
  const out = [];
  const pools = [itemsOf(item.lessonId), unitItems(item.unitId), ALL_ITEMS];
  for (const pool of pools) {
    for (const c of shuffle(pool)) {
      if (out.length >= n) break;
      if (c.id === item.id) continue;
      const k = norm(c[field]);
      if (seen.has(k)) continue;
      seen.add(k); out.push(c);
    }
    if (out.length >= n) break;
  }
  return out;
}
function choiceEx(item, dir) {
  const field = dir === 'vi2de' ? 'de' : 'vi';
  const options = shuffle([item].concat(distractors(item, 3, field))).map(c => ({ id: c.id, text: c[field] }));
  return { type: 'choose', dir, item, options };
}
function tilesEx(item) {
  const target = words(item.vi);
  const targetNorm = target.map(w => norm(w));
  const poolMap = new Map();
  ALL_ITEMS.forEach(c => { if (c.id === item.id) return; words(c.vi).forEach(w => { const k = norm(w); if (!targetNorm.includes(k) && !poolMap.has(k)) poolMap.set(k, w); }); });
  const extras = pick(Array.from(poolMap.values()), Math.min(3, Math.max(2, Math.floor(target.length / 2) + 1)));
  const tiles = shuffle(target.concat(extras)).map((w, i) => ({ k: i, w }));
  return { type: 'tiles', item, tiles, target };
}
function speakEx(item) { return { type: 'speak', item }; }
function canTile(item) { return words(item.vi).length >= 2; }
function makeMixed(t, item) {
  switch (t) {
    case 'listen': return choiceEx(item, 'listen');
    case 'choose_vi': return choiceEx(item, 'de2vi');
    case 'choose_de': return choiceEx(item, 'vi2de');
    case 'tiles': return canTile(item) ? tilesEx(item) : choiceEx(item, 'de2vi');
    case 'speak': return speakEx(item);
  }
  return choiceEx(item, 'vi2de');
}
function mixedTypes(item, allowSpeak) {
  const t = ['listen', 'choose_vi', 'choose_de'];
  if (canTile(item)) t.push('tiles', 'tiles');
  if (allowSpeak) t.push('speak');
  return t;
}
function buildLessonSession(lesson, opts) {
  opts = opts || {};
  const items = shuffle(itemsOf(lesson.id));
  const ex = [];
  const repeat = !!opts.repeat;
  if (!repeat) {
    for (let i = 0; i < items.length; i += 3) {
      const chunk = items.slice(i, i + 3);
      chunk.forEach(it => ex.push({ type: 'intro', item: it }));
      shuffle(chunk).forEach(it => ex.push(choiceEx(it, 'vi2de')));
    }
  }
  const mixedCount = repeat ? items.length : Math.max(4, Math.ceil(items.length * 0.75));
  let speakUsed = 0;
  pick(items, mixedCount).forEach(it => {
    const t = rand(mixedTypes(it, opts.allowSpeak && speakUsed < 2));
    if (t === 'speak') speakUsed++;
    ex.push(makeMixed(t, it));
  });
  if (repeat) {
    pick(items, Math.min(4, items.length)).forEach(it => ex.push(makeMixed(rand(['listen', 'tiles', 'choose_de']), it)));
  } else {
    pick(dueItems().filter(d => d.lessonId !== lesson.id), 3).forEach(it => ex.push(makeMixed(rand(['listen', 'choose_vi', 'choose_de']), it)));
  }
  return { kind: repeat ? 'repeat' : 'lesson', lessonId: lesson.id, title: lesson.title, exercises: ex, xp: 10 };
}
function buildReviewSession(opts) {
  opts = opts || {};
  let items = dueItems().sort((a, b) => S.items[a.id].due.localeCompare(S.items[b.id].due));
  if (items.length < 6) {
    const rest = learnedItems().filter(i => !items.includes(i)).sort((a, b) => (S.items[a.id].ef - S.items[b.id].ef) || S.items[a.id].due.localeCompare(S.items[b.id].due));
    items = items.concat(rest.slice(0, 6 - items.length));
  }
  items = items.slice(0, 12);
  let speakUsed = 0;
  const ex = items.map(it => {
    const t = rand(mixedTypes(it, opts.allowSpeak && speakUsed < 3));
    if (t === 'speak') speakUsed++;
    return makeMixed(t, it);
  });
  return { kind: 'review', lessonId: null, title: 'Wiederholung', exercises: shuffle(ex), xp: 10 };
}
function applyTone(syl, idx) {
  const mark = LANG.tones[idx].mark;
  if (!mark) return syl;
  const m = syl.match(/[aeiouyăâêôơư]/gi);
  if (!m) return syl;
  const last = syl.lastIndexOf(m[m.length - 1]);
  return (syl.slice(0, last + 1) + mark + syl.slice(last + 1)).normalize('NFC');
}
function toneListenEx() {
  const syllable = rand(LANG.toneSyllables);
  const toneIdx = Math.floor(Math.random() * LANG.tones.length);
  return { type: 'tone_listen', syllable, toneIdx, options: LANG.tones.map((t, j) => applyTone(syllable, j)) };
}
function buildToneSession(full) {
  const ex = [];
  if (full) { ex.push({ type: 'tone_overview' }); LANG.tones.forEach((t, i) => ex.push({ type: 'tone_intro', tone: t, idx: i })); }
  const n = full ? 8 : 10;
  for (let i = 0; i < n; i++) ex.push(toneListenEx());
  return { kind: full ? 'lesson' : 'tones', lessonId: full ? LANG.units[0].lessons.find(l => l.type === 'tones').id : null, title: 'Die 6 Töne', exercises: ex, xp: 10 };
}
function regen(ex) {
  if (ex.type === 'tone_listen') return toneListenEx();
  if (ex.type === 'tiles') return tilesEx(ex.item);
  if (ex.type === 'choose') return choiceEx(ex.item, ex.dir);
  return choiceEx(ex.item, 'vi2de');
}
function speechMatch(target, heardList) {
  const tt = tokens(target);
  let best = 0, bestStripped = 0;
  heardList.forEach(h => {
    const ht = tokens(h); const hs = ht.map(strip);
    const m = tt.filter(t => ht.includes(t)).length / tt.length;
    const ms = tt.map(strip).filter(t => hs.includes(t)).length / tt.length;
    best = Math.max(best, m); bestStripped = Math.max(bestStripped, ms);
  });
  if (best >= 0.6) return 'ok';
  if (bestStripped >= 0.75) return 'tones';
  return 'no';
}

// Für Tests in Node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { buildLessonSession, buildReviewSession, buildToneSession, gradeItem, dueItems, learnedItems, streak, nextLesson, applyTone, speechMatch, tokens, norm, strip, words, LESSONS, ITEMS, ALL_ITEMS, state: () => S, setState: s => { S = s; }, todayStr, addDays };
}
if (!HAS_DOM) return;

// ================= Browser-Teil =================
const app = document.getElementById('app');
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const standalone = (g.matchMedia && g.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
let installPrompt = null;
g.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installPrompt = e; if (view === 'home') render(); });

// ---------- Sprachausgabe ----------
let VOICE = null, VOICES_CHECKED = false;
function loadVoices() {
  if (!('speechSynthesis' in g)) return;
  const vs = speechSynthesis.getVoices();
  if (!vs.length) return;
  VOICES_CHECKED = true;
  const lang = LANG.ttsLang.toLowerCase().slice(0, 2);
  const cands = vs.filter(v => (v.lang || '').toLowerCase().replace('_', '-').startsWith(lang));
  VOICE = cands.find(v => /premium|enhanced|erweitert/i.test(v.name)) || cands.find(v => /linh/i.test(v.name)) || cands[0] || null;
}
if ('speechSynthesis' in g) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function voiceMissing() { return VOICES_CHECKED && !VOICE; }
function speak(text, slow) {
  if (!('speechSynthesis' in g)) return;
  try {
    if (!VOICE) loadVoices();
    speechSynthesis.cancel();
    setTimeout(() => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = LANG.ttsLang;
      if (VOICE) u.voice = VOICE;
      u.rate = slow ? 0.55 : 0.85;
      speechSynthesis.speak(u);
    }, 60);
  } catch (e) { /* ignorieren */ }
}
function unlockAudio() {
  try { if ('speechSynthesis' in g) { const u = new SpeechSynthesisUtterance(''); speechSynthesis.speak(u); } } catch (e) { /* */ }
  try { AC = AC || new (g.AudioContext || g.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); } catch (e) { /* */ }
}

// ---------- Töne (Feedback-Sounds) ----------
let AC = null;
function beep(freq, dur, type, gain) {
  if (!S.settings.sound) return;
  try {
    AC = AC || new (g.AudioContext || g.webkitAudioContext)();
    if (AC.state === 'suspended') AC.resume();
    const o = AC.createOscillator(), gn = AC.createGain();
    o.type = type || 'sine'; o.frequency.value = freq; gn.gain.value = gain || 0.08;
    o.connect(gn); gn.connect(AC.destination);
    const t = AC.currentTime; o.start(t); gn.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.stop(t + dur);
  } catch (e) { /* ignorieren */ }
}
function sfxOk() { beep(660, 0.12); setTimeout(() => beep(880, 0.2), 90); }
function sfxBad() { beep(200, 0.28, 'triangle', 0.07); }

// ---------- Spracherkennung ----------
const SR = g.SpeechRecognition || g.webkitSpeechRecognition || null;
let SR_BROKEN = false;
function speakAllowed() { return !!SR && S.settings.speak && navigator.onLine !== false && !SR_BROKEN && location.protocol !== 'file:'; }
function listenOnce(cb) {
  let done = false;
  const r = new SR();
  r.lang = LANG.ttsLang; r.interimResults = false; r.maxAlternatives = 5; r.continuous = false;
  r.onresult = e => {
    done = true;
    const alts = [];
    for (let i = 0; i < e.results.length; i++) for (let j = 0; j < e.results[i].length; j++) alts.push(e.results[i][j].transcript);
    cb(null, alts);
  };
  r.onerror = e => { if (done) return; done = true; cb(e.error || 'error'); };
  r.onend = () => { if (!done) { done = true; cb('nothing'); } };
  try { r.start(); } catch (e) { done = true; cb('start-failed'); }
  return r;
}

// ---------- Ansicht ----------
let view = 'home';
let SESSION = null;
let DONE = null;
let overlay = null;

function h(strings, ...vals) { return strings.reduce((a, s, i) => a + s + (i < vals.length ? vals[i] : ''), ''); }
function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast fade'; t.textContent = msg; document.body.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}
function render() {
  if (view === 'session') return renderSession();
  if (view === 'done') return renderDone();
  if (view === 'words') return renderWords();
  if (view === 'more') return renderMore();
  return renderHome();
}
function tabs(on) {
  return h`<nav class="tabs"><div class="in">
    <button data-tab="home" class="${on === 'home' ? 'on' : ''}"><span class="i">🏠</span>Lernen</button>
    <button data-tab="words" class="${on === 'words' ? 'on' : ''}"><span class="i">📖</span>Wörter</button>
    <button data-tab="more" class="${on === 'more' ? 'on' : ''}"><span class="i">⚙️</span>Mehr</button>
  </div></nav>`;
}
function bindTabs() { app.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { view = b.dataset.tab; g.scrollTo(0, 0); render(); }); }

// ---------- Startseite ----------
function renderHome() {
  const st = streak(), xp = todayXp(), goal = S.goal, due = dueItems().length, next = nextLesson();
  const pct = Math.min(100, Math.round(100 * xp / goal));
  let primary;
  if (next) {
    const isTone = next.lesson.type === 'tones';
    primary = h`<button class="btn primary" data-start-lesson="${next.lesson.id}">Weiter lernen<span class="sub">Einheit ${next.unitIndex + 1} · ${esc(next.lesson.title)}${isTone ? '' : ' · ' + itemsOf(next.lesson.id).length + ' neue Wörter'}</span></button>`;
  } else {
    primary = h`<button class="btn primary" data-start-review="1">Üben<span class="sub">Alle Lektionen geschafft, jetzt festigen</span></button>`;
  }
  const review = due > 0 ? h`<button class="btn ghost" data-start-review="1">Wiederholen<span class="sub">${due} ${due === 1 ? 'Wort ist' : 'Wörter sind'} fällig</span></button>` : '';
  const showInstall = !standalone && !S.flags.installHintDismissed && (isIOS || installPrompt);
  const install = showInstall ? (installPrompt
    ? h`<div class="banner"><span>📲</span><div><b>Als App installieren</b><div class="muted small">Dann startet Sprachpfad direkt vom Homescreen und läuft offline.</div><div style="margin-top:8px"><button class="btn small primary" data-install="1" style="width:auto;display:inline-flex;padding:8px 14px;min-height:38px">Installieren</button></div></div><button class="x" data-dismiss-install="1">×</button></div>`
    : h`<div class="banner"><span>📲</span><div><b>Auf den Homescreen legen</b><div class="muted small">In Safari unten das Teilen-Symbol tippen (Viereck mit Pfeil nach oben), dann „Zum Home-Bildschirm“. Danach läuft die App offline.</div></div><button class="x" data-dismiss-install="1">×</button></div>`) : '';
  const voiceWarn = voiceMissing() ? h`<div class="banner"><span>🔈</span><div><b>Keine vietnamesische Stimme gefunden</b><div class="muted small">iPhone: Einstellungen › Bedienungshilfen › Gesprochene Inhalte › Stimmen › Vietnamesisch › „Linh“ laden. Danach die App neu öffnen.</div></div></div>` : '';

  const units = LANG.units.map((u, ui) => {
    const p = unitProgress(u);
    const nodes = u.lessons.map((l, li) => {
      const done = S.lessons[l.id] && S.lessons[l.id].done;
      const isNext = next && next.lesson.id === l.id;
      const cls = done ? 'done' : isNext ? 'next' : '';
      const icon = done ? '✓' : l.type === 'tones' ? '♪' : isNext ? '★' : (li + 1);
      const meta = done ? `${S.lessons[l.id].count}× gemacht · nochmal üben` : isNext ? 'Jetzt dran' : (l.type === 'tones' ? 'Hören & erkennen' : `${itemsOf(l.id).length} neue Wörter`);
      return h`<button class="node ${cls}" data-start-lesson="${l.id}"><div class="c">${icon}</div><div><div class="l">${esc(l.title)}</div><div class="m">${meta}</div></div></button>`;
    }).join('');
    return h`<section class="unit" style="--uc:${u.color}"><div class="unit-head"><div><div class="n">Einheit ${ui + 1}</div><div class="t">${esc(u.title)}</div><div class="s">${esc(u.subtitle)}</div></div><div class="pct">${p}%</div></div><div class="path">${nodes}</div></section>`;
  }).join('');

  app.innerHTML = h`<div class="screen with-nav fade">
    <div class="topbar"><h1>${LANG.flag} ${esc(LANG.name)}</h1><div class="streak ${st ? '' : 'zero'}">🔥 ${st}</div></div>
    ${install}${voiceWarn}
    <div class="card goal"><div class="ring" style="--p:${pct}"><span>${xp}</span></div><div><div class="t">${xp >= goal ? 'Tagesziel geschafft!' : `Heute ${xp} von ${goal} XP`}</div><div class="s">${st ? `${st} ${st === 1 ? 'Tag' : 'Tage'} am Stück` : 'Eine Session pro Tag hält die Serie'}</div></div></div>
    <div class="stack">${primary}${review}</div>
    ${units}
  </div>${tabs('home')}`;
  bindTabs();
  app.querySelectorAll('[data-start-lesson]').forEach(b => b.onclick = () => startLesson(b.dataset.startLesson));
  app.querySelectorAll('[data-start-review]').forEach(b => b.onclick = () => { unlockAudio(); startSession(buildReviewSession({ allowSpeak: speakAllowed() })); });
  app.querySelectorAll('[data-dismiss-install]').forEach(b => b.onclick = () => { S.flags.installHintDismissed = true; save(); render(); });
  app.querySelectorAll('[data-install]').forEach(b => b.onclick = async () => { if (!installPrompt) return; installPrompt.prompt(); try { await installPrompt.userChoice; } catch (e) { /* */ } installPrompt = null; render(); });
}
function startLesson(id) {
  const lesson = lessonById(id);
  if (!lesson) return;
  unlockAudio();
  const done = S.lessons[id] && S.lessons[id].done;
  if (lesson.type === 'tones') return startSession(buildToneSession(!done));
  startSession(buildLessonSession(lesson, { repeat: !!done, allowSpeak: speakAllowed() }));
}

// ---------- Session ----------
function startSession(def) {
  if (!def.exercises.length) { toast('Noch nichts zum Wiederholen'); return; }
  SESSION = { def, queue: def.exercises.slice(), idx: 0, results: {}, correct: 0, answered: 0, fails: {}, anyWrong: false, fb: null, ui: {} };
  view = 'session'; g.scrollTo(0, 0); render();
}
function cur() { return SESSION.queue[SESSION.idx]; }
function record(ex, correct) {
  SESSION.answered++;
  if (correct) SESSION.correct++; else SESSION.anyWrong = true;
  if (ex.item) {
    const r = SESSION.results[ex.item.id] || (SESSION.results[ex.item.id] = { wrong: 0, seen: 0 });
    r.seen++; if (!correct) r.wrong++;
  }
  if (!correct && ex.type !== 'speak') {
    const key = ex.item ? ex.item.id : 'tone';
    const fails = (SESSION.fails[key] = (SESSION.fails[key] || 0) + 1);
    if (fails <= 3) SESSION.queue.push(fails >= 2 && ex.item ? choiceEx(ex.item, 'vi2de') : regen(ex));
  }
}
function answer(correct, extra) {
  const ex = cur();
  record(ex, correct);
  if (correct) sfxOk(); else sfxBad();
  SESSION.fb = Object.assign({ correct }, extra || {});
  renderSession();
}
function next() {
  SESSION.fb = null; SESSION.ui = {};
  SESSION.idx++;
  if (SESSION.idx >= SESSION.queue.length) return finishSession();
  g.scrollTo(0, 0); renderSession();
}
function finishSession() {
  const d = SESSION.def, today = todayStr();
  Object.entries(SESSION.results).forEach(([id, r]) => gradeItem(id, r.wrong > 0, today));
  if (d.lessonId) { const L = S.lessons[d.lessonId] || { count: 0 }; L.count++; L.done = true; L.last = today; S.lessons[d.lessonId] = L; }
  const perfect = !SESSION.anyWrong;
  const xp = d.xp + (perfect ? 5 : 0);
  S.days[today] = (S.days[today] || 0) + xp;
  save();
  DONE = { xp, perfect, accuracy: SESSION.answered ? Math.round(100 * SESSION.correct / SESSION.answered) : 100, streak: streak(), goalHit: todayXp() >= S.goal, kind: d.kind };
  SESSION = null; view = 'done'; g.scrollTo(0, 0); render();
}
function askQuit() {
  overlay = h`<div class="overlay"><div class="sheet"><h3>Session beenden?</h3><p>Der Fortschritt dieser Session geht verloren.</p><div class="stack"><button class="btn primary" data-ov="stay">Weitermachen</button><button class="btn ghost" data-ov="quit">Beenden</button></div></div></div>`;
  renderSession();
}
function renderSession() {
  const ex = cur();
  const total = SESSION.queue.length;
  const pct = Math.round(100 * SESSION.idx / total);
  let body = '';
  switch (ex.type) {
    case 'intro': body = viewIntro(ex); break;
    case 'choose': body = viewChoose(ex); break;
    case 'tiles': body = viewTiles(ex); break;
    case 'speak': body = viewSpeak(ex); break;
    case 'tone_overview': body = viewToneOverview(); break;
    case 'tone_intro': body = viewToneIntro(ex); break;
    case 'tone_listen': body = viewToneListen(ex); break;
  }
  app.innerHTML = h`<div class="screen sess"><div class="sbar"><button class="x" data-quit="1">×</button><div class="prog"><div style="width:${pct}%"></div></div></div>${body}</div>${viewBottom(ex)}${overlay || ''}`;
  bindSession(ex);
}
function spkBtn(text, cls) { return h`<button class="spk ${cls || ''}" data-say="${esc(text)}">🔊</button>`; }
function slowBtn(text) { return h`<button class="spk small slow" data-say-slow="${esc(text)}">🐢</button>`; }

function viewIntro(ex) {
  const it = ex.item;
  return h`<h2 class="qtitle">Neues Wort</h2><div class="intro">
    <div class="row">${spkBtn(it.vi)}<div class="big">${esc(it.vi)}</div></div>
    <div class="mid">${esc(it.de)}</div>
    <div class="hint">Klingt wie: <b>${esc(it.hint)}</b></div>
    ${it.note ? h`<div class="note">${esc(it.note)}</div>` : ''}
    <div class="row">${slowBtn(it.vi)}<span class="muted small">langsam anhören</span></div>
  </div>`;
}
function viewChoose(ex) {
  const it = ex.item, sel = SESSION.ui.sel, fb = SESSION.fb;
  let head;
  if (ex.dir === 'listen') head = h`<h2 class="qtitle">Was hörst du?</h2><div class="row" style="margin-bottom:18px">${spkBtn(it.vi)}${slowBtn(it.vi)}</div>`;
  else if (ex.dir === 'vi2de') head = h`<h2 class="qtitle">Was bedeutet das?</h2><div class="row" style="margin-bottom:18px">${spkBtn(it.vi, 'small')}<div class="big">${esc(it.vi)}</div></div>`;
  else head = h`<h2 class="qtitle">Wie sagt man das?</h2><div class="big" style="margin-bottom:18px">${esc(it.de)}</div>`;
  const opts = ex.options.map((o, i) => {
    let cls = '';
    if (fb) { if (o.id === it.id) cls = 'right'; else if (i === sel) cls = 'wrong'; }
    else if (i === sel) cls = 'sel';
    return h`<button class="opt ${cls}" data-opt="${i}" ${fb ? 'disabled' : ''}><span class="k">${i + 1}</span><span>${esc(o.text)}</span></button>`;
  }).join('');
  return head + h`<div class="opts">${opts}</div>`;
}
function viewTiles(ex) {
  const it = ex.item, used = SESSION.ui.used || [], fb = SESSION.fb;
  const answer = used.map(k => h`<button class="tile rm" data-rm="${k}" ${fb ? 'disabled' : ''}>${esc(ex.tiles[k].w)}</button>`).join('');
  const tiles = ex.tiles.map(t => h`<button class="tile ${used.includes(t.k) ? 'used' : ''}" data-tile="${t.k}" ${fb ? 'disabled' : ''}>${esc(t.w)}</button>`).join('');
  return h`<h2 class="qtitle">Bilde den Satz</h2><div class="row">${spkBtn(it.vi, 'small')}<div class="mid">${esc(it.de)}</div></div>
    <div class="answer">${answer || '<span class="muted small" style="padding:10px 0">Tippe die Wörter in der richtigen Reihenfolge</span>'}</div>
    <div class="tiles">${tiles}</div>`;
}
function viewSpeak(ex) {
  const it = ex.item, ui = SESSION.ui;
  const status = ui.listening ? 'Ich höre zu …' : ui.heard ? `Gehört: „${esc(ui.heard)}“` : ui.err ? esc(ui.err) : 'Tippe das Mikrofon und sprich den Satz';
  return h`<h2 class="qtitle">Sprich nach</h2>
    <div class="row">${spkBtn(it.vi)}<div class="big">${esc(it.vi)}</div></div>
    <div class="mid muted" style="margin-top:8px">${esc(it.de)}</div>
    <div class="hint" style="margin-top:6px">Klingt wie: <b>${esc(it.hint)}</b></div>
    <button class="mic ${ui.listening ? 'on' : ''}" data-mic="1">🎤</button>
    <div class="heard">${status}</div>`;
}
function viewToneOverview() {
  return h`<h2 class="qtitle">Die 6 Töne</h2><div class="stack">
    <div class="note" style="font-size:16px;color:var(--text)">Vietnamesisch hat sechs Töne. Dieselbe Silbe bedeutet je nach Tonverlauf etwas anderes. Die Zeichen über und unter dem Vokal zeigen den Ton an.</div>
    <div class="card" style="margin:0"><div class="grid6">${LANG.tones.map((t, i) => h`<button class="opt" data-say="${esc(t.sample)}">${esc(t.sample)}</button>`).join('')}</div><div class="muted small" style="margin-top:10px">Tippe die Silben an und hör den Unterschied.</div></div>
  </div>`;
}
function viewToneIntro(ex) {
  const t = ex.tone;
  return h`<h2 class="qtitle">Ton ${ex.idx + 1} von 6: ${esc(t.name)}</h2><div class="tonecard">
    <div class="row">${spkBtn(t.sample)}<div class="big">${esc(t.sample)}</div></div>
    <div class="mid">${esc(t.label)}</div>
    <div class="note">${esc(t.desc)}</div>
    <div class="hint">Beispiel: <b>${esc(t.meaning)}</b></div>
    <div class="row">${slowBtn(t.sample)}<span class="muted small">langsam anhören</span></div>
  </div>`;
}
function viewToneListen(ex) {
  const sel = SESSION.ui.sel, fb = SESSION.fb;
  const opts = ex.options.map((o, i) => {
    let cls = '';
    if (fb) { if (i === ex.toneIdx) cls = 'right'; else if (i === sel) cls = 'wrong'; }
    else if (i === sel) cls = 'sel';
    return h`<button class="opt ${cls}" data-opt="${i}" ${fb ? 'disabled' : ''}>${esc(o)}</button>`;
  }).join('');
  return h`<h2 class="qtitle">Welchen Ton hörst du?</h2><div class="row" style="margin-bottom:18px">${spkBtn(ex.options[ex.toneIdx])}${slowBtn(ex.options[ex.toneIdx])}</div><div class="grid6">${opts}</div>`;
}
function viewBottom(ex) {
  const fb = SESSION.fb;
  if (fb) {
    const it = ex.item;
    let inner;
    if (ex.type === 'tone_listen') {
      const t = LANG.tones[ex.toneIdx];
      inner = fb.correct ? h`<div class="h">✅ Richtig!</div><div class="a"><b>${esc(ex.options[ex.toneIdx])}</b> · ${esc(t.name)}, ${esc(t.label.toLowerCase())}</div>`
        : h`<div class="h">❌ Das war <b>${esc(ex.options[ex.toneIdx])}</b></div><div class="a">${esc(t.name)}: ${esc(t.desc)}</div>`;
    } else if (fb.correct) {
      inner = h`<div class="h">✅ ${fb.tones ? 'Fast! Achte auf die Töne.' : fb.msg || 'Richtig!'}</div><div class="a"><b>${esc(it.vi)}</b> · ${esc(it.de)}</div><div class="n">Klingt wie: ${esc(it.hint)}</div>`;
    } else {
      inner = h`<div class="h">❌ Richtige Antwort:</div><div class="a"><b>${esc(it.vi)}</b> · ${esc(it.de)}</div><div class="n">Klingt wie: ${esc(it.hint)}${it.note ? ' · ' + esc(it.note) : ''}</div>`;
    }
    return h`<div class="bottom ${fb.correct ? 'ok' : 'bad'}"><div class="in"><div class="fb">${inner}</div><button class="btn" data-next="1">Weiter</button></div></div>`;
  }
  if (ex.type === 'intro' || ex.type === 'tone_overview' || ex.type === 'tone_intro') return h`<div class="bottom"><div class="in"><button class="btn primary" data-next="1">Weiter</button></div></div>`;
  if (ex.type === 'speak') {
    const ui = SESSION.ui;
    return h`<div class="bottom"><div class="in stack">${ui.heard || ui.err ? h`<button class="btn ghost small" data-mic="1">Nochmal versuchen</button>` : ''}<button class="btn ghost" data-skip="1">Überspringen</button></div></div>`;
  }
  const ready = ex.type === 'tiles' ? (SESSION.ui.used || []).length > 0 : SESSION.ui.sel !== undefined;
  return h`<div class="bottom"><div class="in"><button class="btn primary" data-check="1" ${ready ? '' : 'disabled'}>Prüfen</button></div></div>`;
}
function bindSession(ex) {
  app.querySelectorAll('[data-say]').forEach(b => b.onclick = () => speak(b.dataset.say, false));
  app.querySelectorAll('[data-say-slow]').forEach(b => b.onclick = () => speak(b.dataset.saySlow, true));
  app.querySelectorAll('[data-quit]').forEach(b => b.onclick = askQuit);
  app.querySelectorAll('[data-ov]').forEach(b => b.onclick = () => { overlay = null; if (b.dataset.ov === 'quit') { SESSION = null; view = 'home'; render(); } else renderSession(); });
  app.querySelectorAll('[data-next]').forEach(b => b.onclick = next);
  app.querySelectorAll('[data-check]').forEach(b => b.onclick = check);
  app.querySelectorAll('[data-skip]').forEach(b => b.onclick = next);
  app.querySelectorAll('[data-opt]').forEach(b => b.onclick = () => { if (SESSION.fb) return; SESSION.ui.sel = Number(b.dataset.opt); renderSession(); });
  app.querySelectorAll('[data-tile]').forEach(b => b.onclick = () => { if (SESSION.fb) return; const k = Number(b.dataset.tile); const u = SESSION.ui.used || (SESSION.ui.used = []); if (!u.includes(k)) u.push(k); renderSession(); });
  app.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { if (SESSION.fb) return; const k = Number(b.dataset.rm); SESSION.ui.used = (SESSION.ui.used || []).filter(x => x !== k); renderSession(); });
  app.querySelectorAll('[data-mic]').forEach(b => b.onclick = startMic);
  // Automatisch vorlesen
  if (!SESSION.fb && !SESSION.ui.spoken) {
    SESSION.ui.spoken = true;
    if (ex.type === 'intro') setTimeout(() => speak(ex.item.vi), 250);
    else if (ex.type === 'choose' && ex.dir === 'listen') setTimeout(() => speak(ex.item.vi), 250);
    else if (ex.type === 'choose' && ex.dir === 'vi2de') setTimeout(() => speak(ex.item.vi), 250);
    else if (ex.type === 'tone_intro') setTimeout(() => speak(ex.tone.sample), 250);
    else if (ex.type === 'tone_listen') setTimeout(() => speak(ex.options[ex.toneIdx]), 250);
    else if (ex.type === 'speak') setTimeout(() => speak(ex.item.vi), 250);
  }
  if (SESSION.fb && !SESSION.ui.fbSpoken && ex.item) { SESSION.ui.fbSpoken = true; if (ex.type !== 'speak' && !(ex.type === 'choose' && ex.dir !== 'de2vi' && SESSION.fb.correct)) setTimeout(() => speak(ex.item.vi), 200); }
}
function check() {
  const ex = cur();
  if (ex.type === 'choose') { const o = ex.options[SESSION.ui.sel]; answer(!!o && o.id === ex.item.id); }
  else if (ex.type === 'tone_listen') { answer(SESSION.ui.sel === ex.toneIdx); }
  else if (ex.type === 'tiles') {
    const got = (SESSION.ui.used || []).map(k => norm(ex.tiles[k].w)).join(' ');
    const want = ex.target.map(norm).join(' ');
    answer(got === want);
  }
}
function startMic() {
  if (SESSION.fb || SESSION.ui.listening) return;
  const ex = cur();
  if (!speakAllowed()) { SESSION.ui.err = 'Spracherkennung hier nicht verfügbar. Sprich den Satz laut nach und geh weiter.'; renderSession(); return; }
  SESSION.ui.listening = true; SESSION.ui.heard = null; SESSION.ui.err = null;
  try { speechSynthesis.cancel(); } catch (e) { /* */ }
  renderSession();
  listenOnce((err, alts) => {
    if (!SESSION || cur() !== ex) return;
    SESSION.ui.listening = false;
    if (err) {
      if (err === 'not-allowed' || err === 'service-not-allowed') { SR_BROKEN = true; SESSION.ui.err = 'Kein Mikrofon-Zugriff. Sprich den Satz laut nach und geh weiter.'; }
      else if (err === 'network') SESSION.ui.err = 'Spracherkennung braucht Internet. Sprich laut nach und geh weiter.';
      else SESSION.ui.err = 'Nichts gehört. Nochmal versuchen?';
      renderSession(); return;
    }
    SESSION.ui.heard = alts[0] || '';
    const m = speechMatch(ex.item.vi, alts);
    if (m === 'ok') answer(true);
    else if (m === 'tones') answer(true, { tones: true });
    else renderSession();
  });
}

// ---------- Ergebnis ----------
function renderDone() {
  const d = DONE;
  const title = d.perfect ? 'Fehlerfrei!' : d.accuracy >= 80 ? 'Stark!' : 'Geschafft!';
  const emoji = d.perfect ? '🏆' : d.kind === 'review' ? '🔁' : '🎉';
  app.innerHTML = h`<div class="screen done fade">
    <div class="emoji">${emoji}</div><h2>${title}</h2>
    <div class="muted">${d.goalHit ? 'Tagesziel erreicht. Serie gesichert.' : 'Noch eine Session und das Tagesziel ist voll.'}</div>
    <div class="stats"><div class="stat"><div class="v">+${d.xp}</div><div class="k">XP</div></div><div class="stat"><div class="v">${d.accuracy}%</div><div class="k">Richtig</div></div><div class="stat"><div class="v">🔥 ${d.streak}</div><div class="k">Serie</div></div></div>
    <div class="stack" style="width:100%"><button class="btn primary" data-home="1">Weiter</button></div>
  </div>`;
  app.querySelectorAll('[data-home]').forEach(b => b.onclick = () => { view = 'home'; render(); });
}

// ---------- Wörter ----------
function renderWords() {
  const learned = learnedItems(); const today = todayStr();
  let body;
  if (!learned.length) body = h`<div class="card"><b>Noch keine Wörter gelernt.</b><div class="muted small" style="margin-top:6px">Alles, was du in Lektionen lernst, taucht hier zum Nachschlagen und Anhören auf.</div></div>`;
  else body = LANG.units.map(u => {
    const its = learned.filter(i => i.unitId === u.id);
    if (!its.length) return '';
    return h`<h3 class="sec">${esc(u.title)}</h3><div class="card">${its.map(i => h`<div class="wrow"><button class="spk small" data-say="${esc(i.vi)}">🔊</button><div class="w"><div class="vi">${esc(i.vi)}</div><div class="de">${esc(i.de)} · <i>${esc(i.hint)}</i></div></div>${S.items[i.id].due <= today ? '<div class="due">fällig</div>' : ''}</div>`).join('')}</div>`;
  }).join('');
  app.innerHTML = h`<div class="screen with-nav fade"><div class="topbar"><h1>Wörter</h1><div class="muted small">${learned.length} von ${ALL_ITEMS.length}</div></div>${body}</div>${tabs('words')}`;
  bindTabs();
  app.querySelectorAll('[data-say]').forEach(b => b.onclick = () => { unlockAudio(); speak(b.dataset.say); });
}

// ---------- Mehr ----------
function renderMore() {
  const pron = LANG.pronunciation.map(r => h`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('');
  const tonesRows = LANG.tones.map(t => h`<tr><td>${esc(t.sample)}</td><td><b>${esc(t.name)}</b> · ${esc(t.label)}<br><span class="muted">${esc(t.desc)}</span></td></tr>`).join('');
  const voiceInfo = !('speechSynthesis' in g) ? 'Keine Sprachausgabe in diesem Browser' : VOICE ? `Stimme: ${VOICE.name}` : VOICES_CHECKED ? 'Keine vietnamesische Stimme gefunden' : 'Stimme wird beim ersten Abspielen geladen';
  app.innerHTML = h`<div class="screen with-nav fade"><div class="topbar"><h1>Mehr</h1></div>
    <div class="card">
      <div class="setrow"><div><div class="l">Tagesziel</div><div class="d">Eine Session gibt 10 XP</div></div><div class="seg">${[10, 20, 30].map(v => h`<button data-goal="${v}" class="${S.goal === v ? 'on' : ''}">${v}</button>`).join('')}</div></div>
      <div class="setrow"><div><div class="l">Sprechübungen</div><div class="d">Nachsprechen mit Mikrofon, braucht Internet</div></div><button class="switch ${S.settings.speak ? 'on' : ''}" data-toggle="speak"></button></div>
      <div class="setrow"><div><div class="l">Feedback-Töne</div><div class="d">Kurzer Klang bei richtig und falsch</div></div><button class="switch ${S.settings.sound ? 'on' : ''}" data-toggle="sound"></button></div>
      <div class="setrow"><div><div class="l">Sprachausgabe</div><div class="d">${esc(voiceInfo)}</div></div><button class="spk small" data-say="Xin chào">🔊</button></div>
    </div>
    <div class="stack" style="margin-bottom:14px"><button class="btn ghost" data-tones="1">♪ Ton-Trainer<span class="sub">10 Hörübungen zu den 6 Tönen</span></button></div>
    <details><summary>Aussprache-Spickzettel</summary><div class="body"><table class="pron">${pron}</table></div></details>
    <details><summary>Die 6 Töne</summary><div class="body"><table class="pron">${tonesRows}</table></div></details>
    <details><summary>Backup</summary><div class="body stack">
      <div class="muted small">Der Fortschritt liegt nur auf diesem Gerät. Mit einem Backup kannst du ihn auf ein anderes Handy mitnehmen.</div>
      <button class="btn ghost small" data-export="1">Backup speichern</button>
      <label class="btn ghost small" style="cursor:pointer">Backup laden<input type="file" accept="application/json,.json" data-import="1" style="display:none"></label>
      <button class="btn ghost small" data-reset="1" style="color:var(--bad)">Fortschritt zurücksetzen</button>
    </div></details>
    <div class="muted small" style="text-align:center;margin:10px 0">Sprachpfad ${APP_VERSION} · ${learnedItems().length} Wörter gelernt · ${Object.keys(S.days).length} Lerntage</div>
  </div>${tabs('more')}${overlay || ''}`;
  bindTabs();
  app.querySelectorAll('[data-goal]').forEach(b => b.onclick = () => { S.goal = Number(b.dataset.goal); save(); renderMore(); });
  app.querySelectorAll('[data-toggle]').forEach(b => b.onclick = () => { const k = b.dataset.toggle; S.settings[k] = !S.settings[k]; if (k === 'speak' && S.settings.speak) SR_BROKEN = false; save(); renderMore(); });
  app.querySelectorAll('[data-say]').forEach(b => b.onclick = () => { unlockAudio(); speak(b.dataset.say); setTimeout(renderMore, 400); });
  app.querySelectorAll('[data-tones]').forEach(b => b.onclick = () => { unlockAudio(); startSession(buildToneSession(false)); });
  app.querySelectorAll('[data-export]').forEach(b => b.onclick = exportBackup);
  app.querySelectorAll('[data-import]').forEach(inp => inp.onchange = () => importBackup(inp.files[0]));
  app.querySelectorAll('[data-reset]').forEach(b => b.onclick = () => {
    overlay = h`<div class="overlay"><div class="sheet"><h3>Wirklich alles löschen?</h3><p>Gelernte Wörter, Serie und XP werden zurückgesetzt.</p><div class="stack"><button class="btn ghost" data-ov="cancel">Abbrechen</button><button class="btn bad" data-ov="reset">Ja, zurücksetzen</button></div></div></div>`;
    renderMore();
  });
  app.querySelectorAll('[data-ov]').forEach(b => b.onclick = () => { const a = b.dataset.ov; overlay = null; if (a === 'reset') { resetState(); toast('Zurückgesetzt'); } renderMore(); });
}
function exportBackup() {
  const data = JSON.stringify(S);
  const name = 'sprachpfad-backup-' + todayStr() + '.json';
  try {
    const file = new File([data], name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { navigator.share({ files: [file], title: 'Sprachpfad Backup' }).catch(() => {}); return; }
  } catch (e) { /* weiter unten */ }
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
function importBackup(file) {
  if (!file) return;
  const rd = new FileReader();
  rd.onload = () => {
    try {
      const s = JSON.parse(rd.result);
      if (!s || s.v !== 1 || typeof s.items !== 'object') throw new Error('format');
      S = Object.assign({}, JSON.parse(JSON.stringify(DEFAULT_STATE)), s, { settings: Object.assign({}, DEFAULT_STATE.settings, s.settings || {}) });
      save(); toast('Backup geladen'); renderMore();
    } catch (e) { toast('Datei nicht lesbar'); }
  };
  rd.readAsText(file);
}

// ---------- Service Worker ----------
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  g.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(() => {}); });
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && view === 'home') render(); });
render();
})(typeof window !== 'undefined' ? window : globalThis);
