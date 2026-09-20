// Hangul-Trainer (Plugin): Zeichen einführen, lesen, hören, Silben bauen
import { JAMO, FINALS, WORDS, compose } from '../../../data/hangul.js';
import { shuffle, pick, rand, random } from '../../core/text.js';

const CONS = JAMO.filter(j => j.kind === 'C'), VOW = JAMO.filter(j => j.kind === 'V');
const ROMAN = Object.fromEntries(JAMO.map(j => [j.j, j.r]));
const ROMAN_T = Object.fromEntries(FINALS.map(f => [f.j, f.r]));
function upTo(stage) { return { c: CONS.filter(j => j.stage <= stage), v: VOW.filter(j => j.stage <= stage), t: stage >= 4 ? FINALS : [] }; }
function romanOf(l, v, t) { return (ROMAN[l] || '') + ROMAN[v] + (t ? ROMAN_T[t] : ''); }
function randomSyllable(stage, must) {
  const p = upTo(stage);
  let l = rand(p.c).j, v = rand(p.v).j, t = p.t.length && random() < 0.6 ? rand(p.t).j : '';
  if (must) { if (must.kind === 'C') l = must.j; else if (must.kind === 'V') v = must.j; else if (must.kind === 'T') t = must.j; }
  return { l, v, t, s: compose(l, v, t), r: romanOf(l, v, t) };
}
function distinctSyllables(stage, first, n) {
  const out = [first]; const seen = new Set([first.r]); let guard = 0;
  while (out.length < n && guard++ < 200) {
    const must = random() < 0.5 ? { kind: 'V', j: first.v } : { kind: 'C', j: first.l };
    const s = random() < 0.7 ? randomSyllable(stage, must) : randomSyllable(stage);
    if (!seen.has(s.r) && s.s) { seen.add(s.r); out.push(s); }
  }
  return out;
}
function recognizeEx(stage, must) {
  const set = shuffle(distinctSyllables(stage, randomSyllable(stage, must), 4));
  const answer = set.findIndex(x => x === set.find(y => y.r === set[0].r)) >= 0 ? 0 : 0;
  const target = set[0]; const opts = shuffle(set);
  return { type: 'script_recognize', plugin: 'hangul', prompt: 'Wie liest man das?', glyph: target.s, options: opts.map(x => x.r), answer: opts.indexOf(target), speak: target.s, info: opts.map(x => ({ title: x.r })) };
}
function listenEx(stage, must) {
  const set = distinctSyllables(stage, randomSyllable(stage, must), 4);
  const target = set[0]; const opts = shuffle(set);
  return { type: 'script_listen', plugin: 'hangul', prompt: 'Was hörst du?', options: opts.map(x => x.s), answer: opts.indexOf(target), speak: target.s, info: opts.map(x => ({ title: x.r })) };
}
function buildEx(stage) {
  const p = upTo(stage);
  const s = randomSyllable(stage);
  const target = [s.l, s.v].concat(s.t ? [s.t] : []);
  const pool = shuffle(p.c.map(j => j.j).concat(p.v.map(j => j.j)).concat(p.t.map(f => f.j)).filter(j => !target.includes(j)));
  const tiles = shuffle(target.concat(pool.slice(0, 3))).map((w, i) => ({ k: i, w }));
  return { type: 'script_build', plugin: 'hangul', prompt: 'Baue die Silbe', roman: s.r, glyph: s.s, target, tiles, speak: s.s };
}
function wordRecognize(word) {
  const others = pick(WORDS.filter(w => w.r !== word.r), 3);
  const opts = shuffle([word].concat(others));
  return { type: 'script_recognize', plugin: 'hangul', prompt: 'Wie liest man das?', glyph: word.w, options: opts.map(x => x.r), answer: opts.indexOf(word), speak: word.w, info: opts.map(x => ({ title: x.r + ' = ' + x.de })) };
}
function wordListen(word) {
  const others = pick(WORDS.filter(w => w.r !== word.r), 3);
  const opts = shuffle([word].concat(others));
  return { type: 'script_listen', plugin: 'hangul', prompt: 'Was hörst du?', options: opts.map(x => x.w), answer: opts.indexOf(word), speak: word.w, info: opts.map(x => ({ title: x.r + ' = ' + x.de })) };
}
export default {
  id: 'hangul', title: 'Hangul-Trainer', icon: '한', subtitle: '10 Übungen: lesen, hören, Silben bauen', lessonMeta: 'Lesen, hören, Silben bauen',
  compose(seq) {
    if (!seq.length) return '';
    if (seq.length === 1) return seq[0];
    return compose(seq[0], seq[1], seq[2] || '') || '?';
  },
  build(lesson, ctx, opts) {
    const stage = lesson.stage || 1; const ex = [];
    if (stage <= 4) {
      const fresh = JAMO.filter(j => j.stage === stage);
      if (!opts.repeat) {
        if (stage === 1) ex.push({ type: 'script_overview', plugin: 'hangul', title: 'So funktioniert Hangul', text: 'Jede Silbe ist ein Block aus Konsonant und Vokal, manchmal mit Endkonsonant darunter: ㄱ + ㅏ = 가, ㄱ + ㅏ + ㅁ = 감. Steht kein Konsonant am Anfang, schreibt man den stummen Platzhalter ㅇ: ㅇ + ㅏ = 아.', samples: ['가', '나', '아', '감'], hint: 'Tippe die Silben an und hör sie dir an.' });
        if (stage === 4) ex.push({ type: 'script_overview', plugin: 'hangul', title: 'Endkonsonanten', text: 'Ein Konsonant unter dem Block wird am Silbenende kurz und nicht gelöst gesprochen. Es gibt nur sieben Lautwerte: k, n, t, l, m, p, ng.', samples: FINALS.map(f => f.ex), hint: 'Höre den Unterschied am Ende.' });
        fresh.forEach(j => ex.push({ type: 'script_intro', plugin: 'hangul', glyph: j.j, title: (j.kind === 'V' ? 'Vokal ' : 'Konsonant ') + j.j, label: j.r ? `„${j.r}“` : 'stumm am Silbenanfang', desc: j.hint, example: `${j.ex} = ${j.exr}`, speak: j.ex }));
        if (stage === 4) FINALS.forEach(f => ex.push({ type: 'script_intro', plugin: 'hangul', glyph: f.ex, title: `Endkonsonant ${f.j}`, label: `„-${f.r}“`, desc: f.hint, example: `${f.ex} = ${f.exr}`, speak: f.ex }));
      }
      const focus = opts.repeat ? shuffle(fresh) : fresh;
      focus.forEach(j => ex.push(recognizeEx(stage, j)));
      if (stage === 4) pick(FINALS, 3).forEach(f => ex.push(recognizeEx(stage, { kind: 'T', j: f.j })));
      pick(fresh, Math.ceil(fresh.length / 2)).forEach(j => ex.push(listenEx(stage, j)));
      for (let i = 0; i < 3; i++) ex.push(buildEx(stage));
    } else {
      const words = shuffle(WORDS);
      words.slice(0, 8).forEach(w => ex.push(wordRecognize(w)));
      words.slice(8, 14).forEach(w => ex.push(wordListen(w)));
      for (let i = 0; i < 2; i++) ex.push(buildEx(4));
    }
    return ex;
  },
  drill(ctx, n) {
    const ex = [];
    for (let i = 0; i < (n || 10); i++) {
      const k = i % 4;
      ex.push(k === 0 ? recognizeEx(4) : k === 1 ? listenEx(4) : k === 2 ? buildEx(4) : wordRecognize(rand(WORDS)));
    }
    return ex;
  },
  regen(ex) {
    if (ex.type === 'script_build') return buildEx(4);
    if (ex.type === 'script_listen') return WORDS.some(w => w.w === ex.speak) ? wordListen(rand(WORDS)) : listenEx(4);
    return WORDS.some(w => w.w === ex.glyph) ? wordRecognize(rand(WORDS)) : recognizeEx(4);
  },
  progress(ls) { return ls.plugins.hangul || { done: false }; }
};
