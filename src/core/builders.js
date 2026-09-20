// Sessions zusammenstellen: Lektion, Wiederholung, Plugin-Lektion, Kurztraining
import { shuffle, pick, rand } from './text.js';
import { registry } from '../exercises/index.js';
import { dueItems, learnedItems } from './progress.js';

function mixedTypes(item, lang, opts) {
  const t = ['choose_t', 'choose_de'];
  if (opts.allowListen !== false) t.push('listen');
  if (registry.tiles.canMake(item, lang)) t.push('tiles', 'tiles');
  if (opts.speakNow) t.push('speak');
  return t;
}
export function makeMixed(t, item, ctx) {
  switch (t) {
    case 'listen': return registry.choose.make(item, ctx, { dir: 'listen' });
    case 'choose_t': return registry.choose.make(item, ctx, { dir: 'de2t' });
    case 'choose_de': return registry.choose.make(item, ctx, { dir: 't2de' });
    case 'tiles': return registry.tiles.canMake(item, ctx.lang) ? registry.tiles.make(item, ctx) : registry.choose.make(item, ctx, { dir: 'de2t' });
    case 'speak': return registry.speak.make(item);
  }
  return registry.choose.make(item, ctx, { dir: 't2de' });
}
export function makeCtx(profile, ls) { return { lang: profile, ls, item: id => profile.items[id] }; }

export function buildLessonSession(profile, ls, lesson, opts) {
  opts = opts || {};
  const ctx = makeCtx(profile, ls);
  const items = shuffle(profile.itemsOf(lesson.id));
  const ex = [];
  const repeat = !!opts.repeat;
  if (!repeat) {
    for (let i = 0; i < items.length; i += 3) {
      const chunk = items.slice(i, i + 3);
      chunk.forEach(it => ex.push(registry.intro.make(it)));
      shuffle(chunk).forEach(it => ex.push(registry.choose.make(it, ctx, { dir: 't2de' })));
    }
  }
  const mixedCount = repeat ? items.length : Math.max(4, Math.ceil(items.length * 0.75));
  let speakUsed = 0;
  pick(items, mixedCount).forEach(it => {
    const t = rand(mixedTypes(it, profile, { allowListen: opts.allowListen, speakNow: opts.allowSpeak && speakUsed < 2 }));
    if (t === 'speak') speakUsed++;
    ex.push(makeMixed(t, it, ctx));
  });
  if (repeat) {
    pick(items, Math.min(4, items.length)).forEach(it => ex.push(makeMixed(rand(opts.allowListen === false ? ['tiles', 'choose_de'] : ['listen', 'tiles', 'choose_de']), it, ctx)));
  } else {
    pick(dueItems(profile, ls, opts.today).filter(d => d.lessonId !== lesson.id), 3).forEach(it => ex.push(makeMixed(rand(opts.allowListen === false ? ['choose_t', 'choose_de'] : ['listen', 'choose_t', 'choose_de']), it, ctx)));
  }
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
  let speakUsed = 0;
  const ex = items.map(it => {
    const t = rand(mixedTypes(it, profile, { allowListen: opts.allowListen, speakNow: opts.allowSpeak && speakUsed < 3 }));
    if (t === 'speak') speakUsed++;
    return makeMixed(t, it, ctx);
  });
  return { kind: 'review', lessonId: null, title: 'Wiederholung', exercises: shuffle(ex), xp: 10 };
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
