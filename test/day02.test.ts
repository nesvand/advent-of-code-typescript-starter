// Advent of Code - Day 2

import { readFileSync } from 'fs';

const input: string = readFileSync('src/day02/resources/input.txt', 'utf8');

import { part1, part2 } from '../src/day02';

test('part one test', () => {
  expect(
    part1(`A Y
B X
C Z`)
  ).toBe(15);
});

test('part one answer', () => {
  expect(part1(input)).toBe(12276);
});

test('part two test', () => {
  expect(
    part2(`A Y
B X
C Z`)
  ).toBe(12);
});

test('part two answer', () => {
  expect(part2(input)).toBe(9975);
});
