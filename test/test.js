// Logik-Tests: node test/test.js
const path = require('path');
require(path.join(__dirname, '..', 'data', 'vi.js'));
const A = require(path.join(__dirname, '..', 'app.js'));
let fails = 0;
function ok(cond, msg) { if (!cond) { fails++; console.log('FAIL', msg); } }

// Daten
ok(A.LESSONS.length === 19, 'lesson count');
ok(A.ALL_ITEMS.length === 146, 'item count');
A.ALL_ITEMS.forEach(it => { ok(it.vi && it.de && it.hint, 'fields ' + it.id); ok(it.vi === it.vi.normalize('NFC'), 'nfc ' + it.id); });

// Töne
ok(JSON.stringify([0,1,2,3,4,5].map(i => A.applyTone('ma', i))) === JSON.stringify(['ma','mà','má','mả','mã','mạ']), 'applyTone ma');
ok(A.applyTone('ba', 5) === 'bạ', 'applyTone ba');

// Sessions für jede Vokabel-Lektion
A.LESSONS.filter(e => !e.lesson.type).forEach(e => {
  for (const repeat of [false, true]) {
    const s = A.buildLessonSession(e.lesson, { repeat, allowSpeak: true });
    ok(s.exercises.length >= 6, 'session size ' + e.lesson.id);
    s.exercises.forEach(ex => {
      if (ex.type === 'choose') {
        ok(ex.options.length === 4, 'four options ' + e.lesson.id);
        ok(ex.options.some(o => o.id === ex.item.id), 'correct present ' + e.lesson.id);
        ok(new Set(ex.options.map(o => A.norm(o.text))).size === 4, 'unique options ' + ex.item.id);
      } else if (ex.type === 'tiles') {
        ok(ex.target.length >= 2, 'tiles target ' + ex.item.id);
        const tileWords = ex.tiles.map(t => A.norm(t.w));
        ex.target.forEach(w => ok(tileWords.includes(A.norm(w)), 'tile has ' + w));
        ok(ex.tiles.length > ex.target.length, 'has extras ' + ex.item.id);
      } else ok(['intro','speak'].includes(ex.type), 'type ' + ex.type);
    });
    if (!repeat) ok(s.exercises.filter(x => x.type === 'intro').length === e.lesson.items.length, 'intros ' + e.lesson.id);
  }
});
const t = A.buildToneSession(true);
ok(t.exercises.length === 1 + 6 + 8 && t.lessonId === 'u1l0', 'tone session');
t.exercises.filter(x => x.type === 'tone_listen').forEach(x => ok(x.options.length === 6 && x.options[0] === x.syllable, 'tone options'));

// SRS
const today = '2026-09-20';
let st = A.gradeItem('xin-chao', false, today); ok(st.ivl === 1 && st.due === '2026-09-21', 'srs first');
st = A.gradeItem('xin-chao', false, '2026-09-21'); ok(st.ivl === 3 && st.due === '2026-09-24', 'srs second');
st = A.gradeItem('xin-chao', false, '2026-09-24'); ok(st.ivl === 8 && st.due === '2026-10-02', 'srs third ' + st.ivl);
st = A.gradeItem('xin-chao', true, '2026-10-02'); ok(st.ivl === 1 && st.n === 0 && st.ef < 2.6, 'srs lapse');
ok(A.dueItems('2026-10-03').length === 1 && A.dueItems('2026-10-02').length === 0, 'due calc');
ok(A.learnedItems().length === 1, 'learned');
A.gradeItem('cam-on', false, '2026-09-01');
const r = A.buildReviewSession({ allowSpeak: false });
ok(r.exercises.length === 2 && r.exercises.every(x => ['choose','tiles'].includes(x.type)), 'review session ' + r.exercises.length);

// Streak
const S = A.state();
const T = A.todayStr();
S.days = {}; ok(A.streak() === 0, 'streak 0');
S.days[A.addDays(T, -1)] = 10; ok(A.streak() === 1, 'streak yesterday');
S.days[T] = 10; S.days[A.addDays(T, -2)] = 10; ok(A.streak() === 3, 'streak 3');
delete S.days[A.addDays(T, -1)]; ok(A.streak() === 1, 'streak gap');

// nächste Lektion
S.lessons = {}; ok(A.nextLesson().lesson.id === 'u1l0', 'next first');
S.lessons['u1l0'] = { done: true }; ok(A.nextLesson().lesson.id === 'u1l1', 'next second');

// Sprech-Vergleich
ok(A.speechMatch('Xin chào', ['xin chào']) === 'ok', 'speech exact');
ok(A.speechMatch('Tôi không hiểu', ['tôi không hiểu gì']) === 'ok', 'speech extra word');
ok(A.speechMatch('Cảm ơn nhiều', ['cam on nhieu']) === 'tones', 'speech tones');
ok(A.speechMatch('Cảm ơn nhiều', ['xin lỗi']) === 'no', 'speech no');

console.log(fails ? `${fails} Tests fehlgeschlagen` : 'Alle Tests bestanden');
process.exit(fails ? 1 : 0);
