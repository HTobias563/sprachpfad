import intro from './intro.js';
import tip from './tip.js';
import choose from './choose.js';
import tiles from './tiles.js';
import cloze from './cloze.js';
import match from './match.js';
import speak from './speak.js';
import { script_overview, script_intro, script_listen } from './script.js';
export const registry = { intro, tip, choose, tiles, cloze, match, speak, script_overview, script_intro, script_listen };
export function exDef(ex) { return registry[ex.type]; }
