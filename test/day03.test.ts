// Advent of Code - Day 3

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day01/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day03';

test('part one test', () => {
  expect(
    part1(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)
  ).toBe(157);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(8252);
  });
}

test('part two test', () => {
  expect(
    part2(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)
  ).toBe(70);
});

if (input) {
  test('part two answer', () => {
    expect(part2(input)).toBe(2828);
  });
}
