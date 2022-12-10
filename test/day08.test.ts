// Advent of Code - Day 8

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day01/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day08';

test('part one test', () => {
  expect(
    part1(`30373
25512
65332
33549
35390
`)
  ).toBe(21);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(1807);
  });
}

test('part two test', () => {
  expect(
    part2(`30373
25512
65332
33549
35390
`)
  ).toBe(8);
});

if (input) {
  test('part two answer', () => {
    expect(part2(input)).toBe(480000);
  });
}
