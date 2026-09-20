import vi from './vi/index.js';
import ko from './ko/index.js';
import ja from './ja/index.js';
export const PROFILES = { vi, ko, ja };
export const LANG_LIST = [
  { code: 'vi', name: 'Vietnamesisch', flag: '🇻🇳', available: true },
  { code: 'ko', name: 'Koreanisch', flag: '🇰🇷', available: true },
  { code: 'ja', name: 'Japanisch', flag: '🇯🇵', available: true }
];
export function profileFor(code) { return PROFILES[code] || PROFILES.vi; }
