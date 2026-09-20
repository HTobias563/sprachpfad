import { test } from 'node:test';
import assert from 'node:assert/strict';
import { vi, ko, ja, fmt } from '../src/lang/numbers.js';

test('Vietnamesische Zahlen', () => {
  assert.equal(vi(0), 'không'); assert.equal(vi(5), 'năm'); assert.equal(vi(10), 'mười'); assert.equal(vi(11), 'mười một'); assert.equal(vi(15), 'mười lăm');
  assert.equal(vi(20), 'hai mươi'); assert.equal(vi(21), 'hai mươi mốt'); assert.equal(vi(25), 'hai mươi lăm'); assert.equal(vi(99), 'chín mươi chín');
  assert.equal(vi(100), 'một trăm'); assert.equal(vi(105), 'một trăm linh năm'); assert.equal(vi(110), 'một trăm mười'); assert.equal(vi(250), 'hai trăm năm mươi');
  assert.equal(vi(1000), 'một nghìn'); assert.equal(vi(15000), 'mười lăm nghìn'); assert.equal(vi(20000), 'hai mươi nghìn'); assert.equal(vi(100000), 'một trăm nghìn');
  assert.equal(vi(150000), 'một trăm năm mươi nghìn'); assert.equal(vi(1000000), 'một triệu'); assert.equal(vi(2500000), 'hai triệu năm trăm nghìn');
  assert.equal(vi(1005), 'một nghìn không trăm linh năm');
});
test('Koreanische Zahlen (sino)', () => {
  assert.equal(ko(0), '영'); assert.equal(ko(1), '일'); assert.equal(ko(10), '십'); assert.equal(ko(11), '십일'); assert.equal(ko(20), '이십'); assert.equal(ko(25), '이십오');
  assert.equal(ko(100), '백'); assert.equal(ko(300), '삼백'); assert.equal(ko(1000), '천'); assert.equal(ko(1500), '천오백'); assert.equal(ko(4000), '사천');
  assert.equal(ko(10000), '만'); assert.equal(ko(25000), '이만 오천'); assert.equal(ko(100000), '십만'); assert.equal(ko(1000000), '백만'); assert.equal(ko(12500), '만 이천오백');
});
test('Japanische Zahlen mit Lesung', () => {
  assert.deepEqual(ja(1), { text: '一', reading: 'いち' }); assert.deepEqual(ja(10), { text: '十', reading: 'じゅう' }); assert.deepEqual(ja(11), { text: '十一', reading: 'じゅういち' });
  assert.deepEqual(ja(25), { text: '二十五', reading: 'にじゅうご' }); assert.deepEqual(ja(100), { text: '百', reading: 'ひゃく' }); assert.deepEqual(ja(300), { text: '三百', reading: 'さんびゃく' });
  assert.deepEqual(ja(600), { text: '六百', reading: 'ろっぴゃく' }); assert.deepEqual(ja(800), { text: '八百', reading: 'はっぴゃく' }); assert.deepEqual(ja(1000), { text: '千', reading: 'せん' });
  assert.deepEqual(ja(3000), { text: '三千', reading: 'さんぜん' }); assert.deepEqual(ja(8000), { text: '八千', reading: 'はっせん' }); assert.deepEqual(ja(1500), { text: '千五百', reading: 'せんごひゃく' });
  assert.deepEqual(ja(10000), { text: '一万', reading: 'いちまん' }); assert.deepEqual(ja(25000), { text: '二万五千', reading: 'にまんごせん' }); assert.deepEqual(ja(100000), { text: '十万', reading: 'じゅうまん' });
  assert.equal(fmt(150000), '150.000');
});
