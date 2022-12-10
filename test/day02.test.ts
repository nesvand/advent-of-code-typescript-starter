// Advent of Code - Day 2

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day01/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day02';

test('part one test', () => {
  expect(
    part1(`A Y
B X
C Z`)
  ).toBe(15);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(12276);
  });
}

test('part two test', () => {
  expect(
    part2(`A Y
B X
C Z`)
  ).toBe(12);
});

if (input) {
  test('part two answer', () => {
    expect(part2(input)).toBe(9975);
  });
}
