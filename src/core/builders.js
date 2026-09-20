// Sessions zusammenstellen: Lektion, Wiederholung, Willkommen zurück, Plugin-Lektion, Kurztraining
import { shuffle, pick, rand, random } from './text.js';
import { NUMBERS, CURRENCY, randomPrice, fmt } from '../lang/numbers.js';
import { registry } from '../exercises/index.js';
import { dueItems, learnedItems } from './progress.js';

export function makeCtx(profile, ls) { return { lang: profile, ls, item: id => profile.items[id] }; }
export function makeMixed(t, item, ctx) {
  switch (t) {
    case 'listen': return registry.choose.make(item, ctx, { dir: 'listen' });
    case 'choose_t': return registry.choose.make(item, ctx, { dir: 'de2t' });
    case 'choose_de': return registry.choose.make(item, ctx, { dir: 't2de' });
    case 'tiles': return registry.tiles.canMake(item, ctx.lang) ? registry.tiles.make(item, ctx) : registry.choose.make(item, ctx, { dir: 'de2t' });
    case 'cloze': return registry.cloze.canMake(item, ctx.lang) ? registry.cloze.make(item, ctx) : registry.choose.make(item, ctx, { dir: 'de2t' });
    case 'speak': return registry.speak.make(item);
  }
  return registry.choose.make(item, ctx, { dir: 't2de' });
}
// Erkennen (Runde 1) und Produzieren (Runde 2)
function recognizeType(item, opts) { return opts.allowListen !== false && rand([true, false]) ? 'listen' : (item.understand ? 'choose_de' : 'choose_t'); }
function produceType(item, lang, opts, budget) {
  if (item.understand) return opts.allowListen !== false ? 'listen' : 'choose_de';
  const t = [];
  if (registry.tiles.canMake(item, lang)) t.push('tiles', 'tiles');
  if (registry.cloze.canMake(item, lang)) t.push('cloze');
  if (opts.allowSpeak && budget.speak > 0) t.push('speak');
  if (!t.length) t.push('choose_t');
  const c = rand(t); if (c === 'speak') budget.speak--;
  return c;
}
function mixedType(item, lang, opts, budget) {
  if (item.understand) return opts.allowListen !== false ? rand(['listen', 'choose_de']) : 'choose_de';
  const t = ['choose_t', 'choose_de'];
  if (opts.allowListen !== false) t.push('listen');
  if (registry.tiles.canMake(item, lang)) t.push('tiles', 'tiles');
  if (registry.cloze.canMake(item, lang)) t.push('cloze');
  if (opts.allowSpeak && budget.speak > 0) t.push('speak');
  const c = rand(t); if (c === 'speak') budget.speak--;
  return c;
}

export function buildLessonSession(profile, ls, lesson, opts) {
  opts = opts || {};
  const ctx = makeCtx(profile, ls);
  const items = shuffle(profile.itemsOf(lesson.id));
  const ex = [];
  const repeat = !!opts.repeat;
  const budget = { speak: 2 };
  const due = shuffle(dueItems(profile, ls, opts.today).filter(d => d.lessonId !== lesson.id));
  if (!repeat) {
    if (lesson.tip) ex.push({ type: 'tip', title: lesson.title, text: lesson.tip });
    // Aufwärmen mit fälligen Wörtern
    const warm = due.splice(0, Math.min(5, due.length));
    if (warm.length >= 3) ex.push(registry.match.make(warm, ctx));
    else warm.forEach(it => ex.push(makeMixed('choose_de', it, ctx)));
    // Neue Wörter in Dreierblöcken: erst sehen, dann erkennen
    for (let i = 0; i < items.length; i += 3) {
      const chunk = items.slice(i, i + 3);
      chunk.forEach(it => ex.push(registry.intro.make(it)));
      shuffle(chunk).forEach(it => ex.push(makeMixed('choose_de', it, ctx)));
    }
  } else if (items.length >= 4) {
    ex.push(registry.match.make(pick(items, Math.min(5, items.length)), ctx));
  }
  // Runde 1: jedes Wort einmal erkennen
  shuffle(items).forEach(it => ex.push(makeMixed(recognizeType(it, opts), it, ctx)));
  // Runde 2: die Hälfte produzieren (Verstehen-Lektionen brauchen nur Runde 1)
  if (lesson.type !== 'understand') pick(items, Math.ceil(items.length / 2)).forEach(it => ex.push(makeMixed(produceType(it, profile, opts, budget), it, ctx)));
  // Tonwort-Übung einstreuen
  if (opts.toneWords && profile.plugins.tones && profile.plugins.tones.sprinkle) { const e = profile.plugins.tones.sprinkle(ctx); if (e) ex.push(e); }
  // Fällige Wörter aus anderen Lektionen
  due.splice(0, repeat ? 2 : 3).forEach(it => ex.push(makeMixed(mixedType(it, profile, { allowListen: opts.allowListen, allowSpeak: false }, budget), it, ctx)));
  return { kind: repeat ? 'repeat' : 'lesson', lessonId: lesson.id, title: lesson.title, exercises: ex, xp: 10 };
}
export function buildReviewSession(profile, ls, opts) {
  opts = opts || {};
  const ctx = makeCtx(profile, ls);
  let items = dueItems(profile, ls, opts.today).sort((a, b) => ls.items[a.id].due.localeCompare(ls.items[b.id].due));
  if (items.length < 6) {
    const rest = learnedItems(profile, ls).filter(i => !items.includes(i)).sort((a, b) => (ls.items[a.id].step - ls.items[b.id].step) || ls.items[a.id].due.localeCompare(ls.items[b.id].due));
    items = items.concat(rest.slice(0, 6 - items.length));
  }
  items = items.slice(0, 12);
  const ex = [];
  const budget = { speak: 3 };
  if (items.length >= 5) { ex.push(registry.match.make(items.slice(0, 5), ctx)); items = items.slice(5); }
  shuffle(items).forEach(it => ex.push(makeMixed(mixedType(it, profile, opts, budget), it, ctx)));
  return { kind: 'review', lessonId: null, title: 'Wiederholung', exercises: ex, xp: 10 };
}
// Nach längerer Pause: nur erkennen, keine neuen Wörter, keine Fehlerwiederholung
export function buildWelcomeBack(profile, ls, opts) {
  opts = opts || {};
  const ctx = makeCtx(profile, ls);
  const items = learnedItems(profile, ls).sort((a, b) => ls.items[a.id].due.localeCompare(ls.items[b.id].due)).slice(0, 8);
  const ex = [];
  if (items.length >= 5) ex.push(registry.match.make(items.slice(0, 5), ctx));
  items.slice(items.length >= 5 ? 5 : 0).forEach(it => ex.push(makeMixed(opts.allowListen !== false && rand([true, false]) ? 'listen' : 'choose_de', it, ctx)));
  return { kind: 'welcome', lessonId: null, title: 'Willkommen zurück', exercises: ex, xp: 10, noRequeue: true };
}
export function buildPluginSession(profile, ls, lesson, opts) {
  opts = opts || {};
  const plugin = profile.plugins[lesson.plugin];
  if (!plugin) throw new Error('Plugin fehlt: ' + lesson.plugin);
  const ex = plugin.build(lesson, makeCtx(profile, ls), opts);
  return { kind: opts.repeat ? 'repeat' : 'lesson', lessonId: lesson.id, plugin: lesson.plugin, title: lesson.title, exercises: ex, xp: 10 };
}
export function buildDrill(profile, ls, pluginId, n) {
  const plugin = profile.plugins[pluginId];
  return { kind: 'drill', lessonId: null, plugin: pluginId, title: plugin.title, exercises: plugin.drill(makeCtx(profile, ls), n || 10), xp: 10 };
}
export function buildForLesson(profile, ls, lesson, opts) {
  if (lesson.type === 'script') return buildPluginSession(profile, ls, lesson, opts);
  return buildLessonSession(profile, ls, lesson, opts);
}
// Schnellrunde: 6 Wörter, fällige zuerst, gemischte Übungen
export function buildQuickRound(profile, ls, opts) {
  opts = opts || {};
  const ctx = makeCtx(profile, ls);
  const due = shuffle(dueItems(profile, ls, opts.today));
  let items = due.slice(0, 6);
  if (items.length < 6) items = items.concat(shuffle(learnedItems(profile, ls).filter(i => !items.includes(i))).slice(0, 6 - items.length));
  const budget = { speak: 1 };
  return { kind: 'quick', lessonId: null, title: 'Schnellrunde', exercises: items.map(it => makeMixed(mixedType(it, profile, opts, budget), it, ctx)), xp: 10 };
}
// Nur hören: 8 Wörter, ausschließlich Hörübungen
export function buildListenOnly(profile, ls, opts) {
  opts = opts || {};
  const ctx = makeCtx(profile, ls);
  const items = shuffle(learnedItems(profile, ls)).slice(0, 8);
  return { kind: 'listen', lessonId: null, title: 'Nur hören', exercises: items.map(it => makeMixed('listen', it, ctx)), xp: 10 };
}
// Preise hören: Zahl in der Zielsprache hören, richtigen Betrag wählen
export function buildPriceDrill(profile, ls, n) {
  const code = profile.code; const gen = NUMBERS[code]; const cur = CURRENCY[code];
  if (!gen) return { kind: 'prices', lessonId: null, title: 'Preise hören', exercises: [], xp: 10 };
  const ex = [];
  for (let i = 0; i < (n || 10); i++) {
    const set = new Set(); let guard = 0; while (set.size < 4 && guard++ < 50) set.add(randomPrice(code, random));
    const nums = shuffle(Array.from(set)); const answer = Math.floor(random() * nums.length); const w = gen(nums[answer]);
    ex.push({ type: 'script_listen', plugin: 'prices', prompt: 'Welchen Preis hörst du?', options: nums.map(x => fmt(x) + ' ' + cur.sym), answer, speak: w.speak + ' ' + (cur.speakUnit || cur.unit), info: nums.map(x => { const g = gen(x); return { title: g.text + (g.reading ? ' · ' + g.reading : ''), desc: '' }; }) });
  }
  return { kind: 'prices', lessonId: null, title: 'Preise hören', exercises: ex, xp: 10 };
}
