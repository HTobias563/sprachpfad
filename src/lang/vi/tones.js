// Ton-Trainer für Vietnamesisch (Plugin): Übersicht, sechs Intro-Karten, Hörübungen
import { rand, random } from '../../core/text.js';

function listenEx(data) {
  const set = rand(data.toneSets);
  const answer = Math.floor(random() * set.length);
  return {
    type: 'script_listen', plugin: 'tones', prompt: 'Welchen Ton hörst du?',
    options: set.slice(), answer, speak: set[answer],
    info: data.tones.map(t => ({ name: t.name, label: t.label, desc: t.desc }))
  };
}
export default {
  id: 'tones', title: 'Ton-Trainer', icon: '♪', subtitle: '10 Hörübungen zu den 6 Tönen',
  build(lesson, ctx, opts) {
    const d = ctx.lang.data; const ex = [];
    if (!opts.repeat) {
      ex.push({ type: 'script_overview', plugin: 'tones', title: 'Die 6 Töne', text: 'Vietnamesisch hat sechs Töne. Dieselbe Silbe bedeutet je nach Tonverlauf etwas anderes. Die Zeichen über und unter dem Vokal zeigen den Ton an.', samples: d.tones.map(t => t.sample), hint: 'Tippe die Silben an und hör den Unterschied.' });
      d.tones.forEach((t, i) => ex.push({ type: 'script_intro', plugin: 'tones', glyph: t.sample, title: `Ton ${i + 1} von 6: ${t.name}`, label: t.label, desc: t.desc, example: t.meaning }));
    }
    for (let i = 0; i < (opts.repeat ? 10 : 8); i++) ex.push(listenEx(d));
    return ex;
  },
  drill(ctx, n) { const ex = []; for (let i = 0; i < (n || 10); i++) ex.push(listenEx(ctx.lang.data)); return ex; },
  regen(ex, ctx) { return listenEx(ctx.lang.data); },
  progress(ls) { return ls.plugins.tones || { done: false }; }
};
