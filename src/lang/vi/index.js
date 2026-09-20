import data from '../../../data/vi.js';
import { makeProfile } from '../profile.js';
import { stripTones } from '../../core/text.js';
import tones from './tones.js';

export default makeProfile(data, {
  tts: { lang: 'vi-VN', prefer: [/linh/i], rate: 0.85, slow: 0.55 },
  sr: { lang: 'vi-VN' },
  looseNative: stripTones,
  looseLabel: 'Töne',
  plugins: { tones }
});
