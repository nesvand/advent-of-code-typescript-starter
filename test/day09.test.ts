// Advent of Code - Day 9

import { readFileSync } from 'fs';

const input: string = readFileSync('src/day09/resources/input.txt', 'utf8');

import { part1, part2 } from '../src/day09';

test('part one test', () => {
  expect(
    part1(`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`)
  ).toBe(13);
});

test('part one answer', () => {
  expect(part1(input)).toBe(6357);
});

test('part two test', () => {
  expect(
    part2(`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`)
  ).toBe(1);
  expect(
    part2(`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`)
  ).toBe(36);
});

test('part two answer', () => {
  expect(part2(input)).toBe(2627);
});
