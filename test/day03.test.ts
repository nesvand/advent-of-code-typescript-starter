// Advent of Code - Day 3

import { readFileSync } from 'fs';

const input: string = readFileSync('src/day03/resources/input.txt', 'utf8');

import { part1, part2 } from '../src/day03';

test('part one test', () => {
  expect(part1(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)).toBe(157);
});

test('part one answer', () => {
  expect(part1(input)).toBe(8252);
});

test('part two test', () => {
  expect(part2(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)).toBe(70);
});

test('part two answer', () => {
  expect(part2(input)).toBe(2828);
});
