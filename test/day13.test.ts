// Advent of Code - Day 13

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day13/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day13';

test('part one test', () => {
  expect(
    part1(`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`)
  ).toBe(13);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(4643);
  });
}

test('part two test', () => {
  expect(
    part2(`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`)
  ).toBe(140);
});

if (input) {
  test('part two answer', () => {
    expect(part2(input)).toBe(21614);
  });
}
