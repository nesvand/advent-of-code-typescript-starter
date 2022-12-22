// Advent of Code - Day 22

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day22/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day22';

test('part one test', () => {
  expect(
    part1(`        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5
`)
  ).toBe(6032);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(165094);
  });
}

test('part two test', () => {
  expect(part2(``)).toBe(0);
});

// if (input) {
//   test('part two answer', () => {
//     expect(part2(input)).toBe(0);
//   });
// }
