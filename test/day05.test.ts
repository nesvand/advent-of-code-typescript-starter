// Advent of Code - Day 5

import { readFileSync } from 'fs';

const input: string = readFileSync('src/day05/resources/input.txt', 'utf8');

import { part1, part2 } from '../src/day05';

test('part one test', () => {
  expect(
    part1(`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`)
  ).toBe('CMZ');
});

test('part one answer', () => {
  expect(part1(input)).toBe('MQTPGLLDN');
});

test('part two test', () => {
  expect(
    part2(`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`)
  ).toBe('MCD');
});

test('part two answer', () => {
  expect(part2(input)).toBe('LVZPSTTCZ');
});
