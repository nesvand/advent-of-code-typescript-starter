// Advent of Code - Day 18

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day18/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day18';

test('part one test', () => {
  expect(
    part1(`1,1,1
  2,1,1
`)
  ).toBe(10);
  expect(
    part1(`2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5
`)
  ).toBe(64);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(3374);
  });
}

test('part two test', () => {
  expect(
    part2(`2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5
`)
  ).toBe(58);
});

if (input) {
  test('part two answer', () => {
    expect(part2(input)).toBe(0);
  });
}
