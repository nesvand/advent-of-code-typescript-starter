// Advent of Code - Day 12

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day12/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day12';

test('part one test', () => {
  expect(part1(`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`)).toBe(31);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(517);
  });
}

test('part two test', () => {
  expect(part2(`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`)).toBe(29);
});

if (input) {
  test('part two answer', () => {
    expect(part2(input)).toBe(512);
  });
}
