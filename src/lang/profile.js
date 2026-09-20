// Sprachprofil: Daten + Verhalten (Stimme, Normalisierung, Segmente, Sprechvergleich, Plugins)
import { norm, words, tokens } from '../core/text.js';

export function makeProfile(data, overrides) {
  const lessons = []; const items = {};
  data.units.forEach((u, ui) => u.lessons.forEach((l, li) => {
    lessons.push({ unit: u, lesson: l, unitIndex: ui, lessonIndex: li });
    (l.items || []).forEach(it => { items[it.id] = Object.assign({}, it, { unitId: u.id, lessonId: l.id }); });
  }));
  const p = {
    code: data.code, name: data.name, flag: data.flag, data, lessons, items, allItems: Object.values(items),
    tts: { lang: data.ttsLang, prefer: [], rate: 0.85, slow: 0.55 },
    sr: { lang: data.ttsLang },
    speakText: it => it.tts || it.text,
    segments: it => it.seg || words(it.text),
    normNative: norm,
    looseNative: null,
    looseLabel: null,
    plugins: {},
    lessonById(id) { const e = lessons.find(e => e.lesson.id === id); return e ? e.lesson : null; },
    itemsOf(lessonId) { return p.allItems.filter(i => i.lessonId === lessonId); },
    unitItems(unitId) { return p.allItems.filter(i => i.unitId === unitId); },
    // Vergleich Spracherkennung: Anteil der Zielwörter, die im Gehörten vorkommen
    speechMatch(item, alts) {
      const cands = [item.text].concat(item.alt || []);
      let best = 0, loose = 0;
      cands.forEach(c => {
        const tt = tokens(c);
        if (!tt.length) return;
        alts.forEach(a => {
          const ht = tokens(a);
          best = Math.max(best, tt.filter(t => ht.includes(t)).length / tt.length);
          if (p.looseNative) { const hl = ht.map(p.looseNative); loose = Math.max(loose, tt.map(p.looseNative).filter(t => hl.includes(t)).length / tt.length); }
        });
      });
      if (best >= 0.6) return { correct: true };
      if (loose >= 0.75) return { correct: true, near: p.looseLabel };
      return { correct: false };
    }
  };
  return Object.assign(p, overrides || {});
}
