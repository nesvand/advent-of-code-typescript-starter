// Advent of Code - Day 1

import { part1, part2 } from '../src/day01';
import { readFileSync } from 'fs';

const input: string = readFileSync('src/day01/resources/input.txt', 'utf8');

test('part one test', () => {
  expect(
    part1(`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`)
  ).toBe(24000);
});

test('part one answer', () => {
  expect(part1(input)).toBe(72602);
});

test('part two test', () => {
  expect(
    part2(`1000
  2000
  3000

  4000

  5000
  6000

  7000
  8000
  9000

  10000`)
  ).toBe(45000);
});

test('part two answer', () => {
  expect(part2(input)).toBe(207410);
});
