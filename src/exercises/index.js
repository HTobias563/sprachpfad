import intro from './intro.js';
import choose from './choose.js';
import tiles from './tiles.js';
import speak from './speak.js';
import { script_overview, script_intro, script_listen } from './script.js';
export const registry = { intro, choose, tiles, speak, script_overview, script_intro, script_listen };
export function exDef(ex) { return registry[ex.type]; }
