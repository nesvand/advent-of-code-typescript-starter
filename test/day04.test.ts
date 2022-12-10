// Advent of Code - Day 4

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day01/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day04';

test('part one test', () => {
  expect(
    part1(`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`)
  ).toBe(2);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(567);
  });
}

test('part two test', () => {
  expect(
    part2(`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`)
  ).toBe(4);
});

if (input) {
  test('part two answer', () => {
    expect(part2(input)).toBe(907);
  });
}
