// Advent of Code - Day 8

import { readFileSync } from 'fs';

const input: string = readFileSync('src/day08/resources/input.txt', 'utf8');

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

test('part one answer', () => {
  expect(part1(input)).toBe(1807);
});

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

test('part two answer', () => {
  expect(part2(input)).toBe(480000);
});
