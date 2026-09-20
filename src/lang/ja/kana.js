// Kana-Trainer (Plugin): Hiragana und Katakana lesen, hören, Wörter bauen. Distraktoren bevorzugt aus Verwechselpaaren.
import { STAGES, CONFUSABLE, WORDS, ALL_CHARS } from '../../../data/kana.js';
import { shuffle, pick, rand } from '../../core/text.js';

function stageIndex(id) { return Math.max(0, STAGES.findIndex(s => s.id === id)); }
function stageOf(id) { return STAGES[stageIndex(id)]; }
function charsUpTo(id, kind) { return STAGES.slice(0, stageIndex(id) + 1).flatMap(s => s.chars).filter(c => !kind || c.kind === kind); }
function wordsUpTo(id) { return STAGES.slice(0, stageIndex(id) + 1).flatMap(s => (WORDS[s.id] || []).map(([k, r, de]) => ({ k, r, de }))); }
const ALL_WORDS = STAGES.flatMap(s => (WORDS[s.id] || []).map(([k, r, de]) => ({ k, r, de })));

function distractors(ch, pool, n) {
  const out = []; const seen = new Set([ch.k, ch.r]);
  const add = c => { if (c && out.length < n && !seen.has(c.k) && !seen.has(c.r)) { seen.add(c.k); seen.add(c.r); out.push(c); } };
  (CONFUSABLE[ch.k] || []).forEach(k => add(pool.find(x => x.k === k) || ALL_CHARS.find(x => x.k === k)));
  shuffle(pool).forEach(add);
  if (out.length < n) shuffle(ALL_CHARS.filter(c => c.kind === ch.kind)).forEach(add);
  return out;
}
function recognizeChar(ch, pool) {
  const opts = shuffle([ch].concat(distractors(ch, pool, 3)));
  return { type: 'script_recognize', plugin: 'kana', prompt: 'Wie liest man das?', glyph: ch.k, options: opts.map(x => x.r), answer: opts.indexOf(ch), speak: ch.k, info: opts.map(x => ({ title: x.r })) };
}
function listenChar(ch, pool) {
  const opts = shuffle([ch].concat(distractors(ch, pool, 3)));
  return { type: 'script_listen', plugin: 'kana', prompt: 'Was hörst du?', options: opts.map(x => x.k), answer: opts.indexOf(ch), speak: ch.k, info: opts.map(x => ({ title: x.r })) };
}
function wordRecognize(w, words) {
  const others = shuffle(words.filter(x => x.r !== w.r && x.k !== w.k)).slice(0, 3);
  const opts = shuffle([w].concat(others));
  return { type: 'script_recognize', plugin: 'kana', prompt: 'Wie liest man das?', glyph: w.k, options: opts.map(x => x.r), answer: opts.indexOf(w), speak: w.k, info: opts.map(x => ({ title: x.r + ' = ' + x.de })) };
}
function wordListen(w, words) {
  const others = shuffle(words.filter(x => x.r !== w.r && x.k !== w.k)).slice(0, 3);
  const opts = shuffle([w].concat(others));
  return { type: 'script_listen', plugin: 'kana', prompt: 'Was hörst du?', options: opts.map(x => x.k), answer: opts.indexOf(w), speak: w.k, info: opts.map(x => ({ title: x.r + ' = ' + x.de })) };
}
function wordBuild(w, pool) {
  const target = Array.from(w.k);
  const extra = []; const seen = new Set(target);
  target.forEach(k => (CONFUSABLE[k] || []).forEach(c => { if (!seen.has(c) && extra.length < 3) { seen.add(c); extra.push(c); } }));
  shuffle(pool).forEach(c => { if (extra.length < 3 && !seen.has(c.k)) { seen.add(c.k); extra.push(c.k); } });
  const tiles = shuffle(target.concat(extra)).map((k, i) => ({ k: i, w: k }));
  return { type: 'script_build', plugin: 'kana', prompt: 'Baue das Wort', roman: `${w.r} (${w.de})`, glyph: w.k, target, tiles, speak: w.k };
}
export default {
  id: 'kana', title: 'Kana-Trainer', icon: 'あ', subtitle: '10 Übungen: Hiragana und Katakana lesen, hören, bauen', lessonMeta: 'Lesen, hören, Wörter bauen',
  compose(seq) { return seq.join(''); },
  build(lesson, ctx, opts) {
    const st = stageOf(lesson.stage); const ex = [];
    const pool = charsUpTo(st.id, st.kind); const words = wordsUpTo(st.id); const stageWords = (WORDS[st.id] || []).map(([k, r, de]) => ({ k, r, de }));
    if (!opts.repeat) {
      if (st.id === 'H1') ex.push({ type: 'script_overview', plugin: 'kana', title: 'So funktioniert Hiragana', text: 'Jedes Zeichen ist eine Silbe: あ = a, か = ka, き = ki. 46 Grundzeichen, dazu ein paar Regeln. Hiragana schreibt japanische Wörter und Endungen.', samples: ['あ', 'か', 'さ', 'た'], hint: 'Tippe die Zeichen an und hör sie dir an.' });
      if (st.id === 'K1') ex.push({ type: 'script_overview', plugin: 'kana', title: 'Katakana', text: 'Dieselben Silben mit eckigen Zeichen. Katakana schreibt Fremdwörter und Namen: コーヒー, ホテル, ドイツ. Auf Speisekarten und Schildern überall.', samples: ['ア', 'カ', 'サ', 'コーヒー'], hint: 'Tippe die Zeichen an.' });
      st.chars.forEach(c => { const w = words.find(x => x.k.includes(c.k)); ex.push({ type: 'script_intro', plugin: 'kana', glyph: c.k, title: (c.kind === 'H' ? 'Hiragana ' : 'Katakana ') + c.k, label: `„${c.r}“`, desc: c.hint === c.r ? '' : c.hint, example: w ? `${w.k} = ${w.r} (${w.de})` : '', speak: c.k }); });
      (st.rules || []).forEach(r => ex.push({ type: 'script_intro', plugin: 'kana', glyph: r.k, title: 'Regel: ' + r.r, label: r.r, desc: r.hint, example: r.ex, speak: r.ex.split(' ')[0] }));
    }
    const focus = opts.repeat ? shuffle(st.chars) : st.chars;
    focus.forEach(c => ex.push(recognizeChar(c, pool)));
    pick(st.chars, Math.ceil(st.chars.length / 2)).forEach(c => ex.push(listenChar(c, pool)));
    const wpool = stageWords.length >= 4 ? stageWords : words;
    if (wpool.length >= 4) {
      pick(wpool, st.rules ? 6 : 3).forEach(w => ex.push(wordRecognize(w, wpool)));
      if (st.rules) pick(wpool, 3).forEach(w => ex.push(wordListen(w, wpool)));
      pick(wpool, 3).forEach(w => ex.push(wordBuild(w, pool)));
    }
    return ex;
  },
  drill(ctx, n) {
    const ex = []; const hs = ALL_CHARS.filter(c => c.kind === 'H'), ks = ALL_CHARS.filter(c => c.kind === 'K');
    for (let i = 0; i < (n || 10); i++) {
      const k = i % 5; const pool = i % 2 ? ks : hs;
      ex.push(k === 0 ? recognizeChar(rand(pool), pool) : k === 1 ? listenChar(rand(pool), pool) : k === 2 ? wordBuild(rand(ALL_WORDS), pool) : k === 3 ? wordRecognize(rand(ALL_WORDS), ALL_WORDS) : wordListen(rand(ALL_WORDS), ALL_WORDS));
    }
    return ex;
  },
  regen(ex) {
    const isWord = ALL_WORDS.some(w => w.k === (ex.glyph || ex.speak));
    const kind = /[ァ-ヶ]/.test(ex.glyph || ex.speak || '') ? 'K' : 'H';
    const pool = ALL_CHARS.filter(c => c.kind === kind);
    if (ex.type === 'script_build') return wordBuild(rand(ALL_WORDS), pool);
    if (ex.type === 'script_listen') return isWord ? wordListen(rand(ALL_WORDS), ALL_WORDS) : listenChar(rand(pool), pool);
    return isWord ? wordRecognize(rand(ALL_WORDS), ALL_WORDS) : recognizeChar(rand(pool), pool);
  },
  progress(ls) { return ls.plugins.kana || { done: false }; }
};
