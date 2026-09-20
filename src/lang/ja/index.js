import data from '../../../data/ja.js';
import { makeProfile } from '../profile.js';
import { similarity, words } from '../../core/text.js';
import kana from './kana.js';

const toHira = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
const squash = s => toHira(String(s || '').normalize('NFKC')).toLowerCase().replace(/[\s、。！？!?,.\-ー]/g, '');
export default makeProfile(data, {
  tts: { lang: 'ja-JP', prefer: [/kyoko/i, /otoya/i], rate: 0.9, slow: 0.6 },
  sr: { lang: 'ja-JP' },
  hasRoman: true,
  hasReading: true,
  normNative: squash,
  segments: it => it.seg || (it.text.includes(' ') ? words(it.text) : [it.text]),
  speechMatch(item, alts) {
    const cands = [item.text, item.reading].concat(item.alt || []).filter(Boolean).map(squash);
    let best = 0;
    alts.forEach(a => { const n = squash(a); cands.forEach(c => { best = Math.max(best, similarity(c, n)); }); });
    return { correct: best >= 0.7 };
  },
  plugins: { kana }
});
