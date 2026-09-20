import vi from './vi/index.js';
export const PROFILES = { vi };
export const LANG_LIST = [
  { code: 'vi', name: 'Vietnamesisch', flag: '🇻🇳', available: true },
  { code: 'ko', name: 'Koreanisch', flag: '🇰🇷', available: false },
  { code: 'ja', name: 'Japanisch', flag: '🇯🇵', available: false }
];
export function profileFor(code) { return PROFILES[code] || PROFILES.vi; }
