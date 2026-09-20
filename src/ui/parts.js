// Kleine wiederverwendbare Bausteine
import { h } from './dom.js';
export function spkBtn(text, cls) { return h`<button class="spk ${cls || ''}" data-act="say" data-text="${text}" aria-label="Anhören">🔊</button>`; }
export function slowBtn(text) { return h`<button class="spk small slow" data-act="say-slow" data-text="${text}" aria-label="Langsam anhören">🐢</button>`; }
export function target(text, lang, cls) { return h`<span lang="${lang.code}" class="${cls || ''}">${text}</span>`; }
