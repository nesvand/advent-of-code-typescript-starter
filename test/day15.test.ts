// Advent of Code - Day 15

import { readFileSync } from 'fs';

// let input = '';
// try {
//   input = readFileSync('src/day15/resources/input.txt', 'utf8');
// } catch (e) {
//   // ignore
// }

import { part1, part2 } from '../src/day15';

test('part one test', () => {
  expect(
    part1(
      `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3
`
    )
  ).toBe(26);
});

// if (input) {
//   test('part one answer', () => {
//     expect(part1(input)).toBe(0);
//   });
// }

test('part two test', () => {
  expect(part2(``)).toBe(0);
});

// if (input) {
//   test('part two answer', () => {
//     expect(part2(input)).toBe(0);
//   });
// }
