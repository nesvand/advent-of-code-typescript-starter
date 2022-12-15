// Advent of Code - Day 14

import { Input } from '../lib/advent';

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day14/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day14';

test('part one test', () => {
  expect(
    part1(
      Input.from(
        `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`,
        true
      )
    )
  ).toBe(24);
});

if (input) {
  test('part one answer', () => {
    expect(part1(Input.from(input, true))).toBe(755);
  });
}

test('part two test', () => {
  expect(
    part2(
      Input.from(
        `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`,
        true
      )
    )
  ).toBe(93);
});

if (input) {
  test('part two answer', () => {
    expect(part2(Input.from(input, true))).toBe(29805);
  });
}
