import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stripTones, norm, tokens, levenshtein } from '../src/core/text.js';
import { PROFILES } from '../src/lang/registry.js';

test('stripTones entfernt nur Tonzeichen', () => {
  assert.equal(stripTones('Tôi'), 'Tôi');
  assert.equal(stripTones('mười'), 'mươi');
  assert.equal(stripTones('Cảm ơn'), 'Cam ơn');
  assert.equal(stripTones('đắt'), 'đăt');
});
test('norm und tokens', () => {
  assert.deepEqual(tokens('Bạn nói tiếng Anh không?'), ['bạn', 'nói', 'tiếng', 'anh', 'không']);
  assert.equal(norm('  Xin  chào! '), 'xin chào');
});
test('Sprechvergleich Vietnamesisch', () => {
  const p = PROFILES.vi;
  assert.equal(p.speechMatch(p.items['xin-chao'], ['xin chào']).correct, true);
  assert.equal(p.speechMatch(p.items['toi-khong-hieu'], ['tôi không hiểu gì']).correct, true);
  const near = p.speechMatch(p.items['cam-on-nhieu'], ['cam ơn nhiêu']);
  assert.equal(near.correct, true); assert.equal(near.near, 'Töne');
  assert.equal(p.speechMatch(p.items['cam-on-nhieu'], ['xin lỗi']).correct, false);
});
test('levenshtein', () => { assert.equal(levenshtein('kitten', 'sitting'), 3); assert.equal(levenshtein('', 'ab'), 2); });
