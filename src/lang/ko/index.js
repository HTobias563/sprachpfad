import data from '../../../data/ko.js';
import { makeProfile } from '../profile.js';
import { norm, similarity } from '../../core/text.js';
import hangul from './hangul.js';

const squash = s => norm(s).replace(/\s+/g, '');
export default makeProfile(data, {
  tts: { lang: 'ko-KR', prefer: [/yuna/i], rate: 0.9, slow: 0.6 },
  sr: { lang: 'ko-KR' },
  hasRoman: true,
  normNative: squash,
  speechMatch(item, alts) {
    const cands = [item.text].concat(item.alt || []).map(squash);
    let best = 0;
    alts.forEach(a => { const n = squash(a); cands.forEach(c => { best = Math.max(best, similarity(c, n)); }); });
    return { correct: best >= 0.7 };
  },
  plugins: { hangul }
});
