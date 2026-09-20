import vi from './vi/index.js';
import ko from './ko/index.js';
export const PROFILES = { vi, ko };
export const LANG_LIST = [
  { code: 'vi', name: 'Vietnamesisch', flag: '🇻🇳', available: true },
  { code: 'ko', name: 'Koreanisch', flag: '🇰🇷', available: true },
  { code: 'ja', name: 'Japanisch', flag: '🇯🇵', available: false }
];
export function profileFor(code) { return PROFILES[code] || PROFILES.vi; }
