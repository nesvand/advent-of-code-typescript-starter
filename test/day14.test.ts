// Advent of Code - Day 14

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day14/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day14';

test('part one test', () => {
  expect(
    part1(`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`)
  ).toBe(24);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(755);
  });
}

test('part two test', () => {
  expect(
    part2(`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`)
  ).toBe(93);
});

if (input) {
  test('part two answer', () => {
    expect(part2(input)).toBe(29805);
  });
}
