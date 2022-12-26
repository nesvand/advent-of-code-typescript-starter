// Advent of Code - Day 20

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day20/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day20';

test('part one test', () => {
  expect(
    part1(`1
2
-3
3
-2
0
4
`)
  ).toBe(3);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(13522);
  });
}

test('part two test', () => {
  expect(
    part2(`1
2
-3
3
-2
0
4
`)
  ).toBe(1623178306);
});

if (input) {
  test('part two answer', () => {
    expect(part2(input)).toBe(0);
  });
}
