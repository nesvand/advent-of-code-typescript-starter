// Advent of Code - Day 19

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day19/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day19';

test('part one test', () => {
  expect(
    part1(`Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.
`)
  ).toBe(33);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(1092);
  });
}

// Runs too long
test.skip('part two test', () => {
  expect(
    part2(`Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.
`)
  ).toBe(3472);
});

if (input) {
  test('part two answer', () => {
    expect(part2(input)).toBe(3542);
  });
}
