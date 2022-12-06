// Advent of Code - Day 6

import { readFileSync } from 'fs';

const input: string = readFileSync('src/day06/resources/input.txt', 'utf8');

import { part1, part2 } from '../src/day06';

test('part one test', () => {
  expect(part1(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`)).toBe(7);
  expect(part1(`bvwbjplbgvbhsrlpgdmjqwftvncz`)).toBe(5);
  expect(part1(`nppdvjthqldpwncqszvftbrmjlhg`)).toBe(6);
  expect(part1(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`)).toBe(10);
  expect(part1(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`)).toBe(11);
});

test('part one answer', () => {
  expect(part1(input)).toBe(1100);
});

test('part two test', () => {
  expect(part2(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`)).toBe(19);
  expect(part2(`bvwbjplbgvbhsrlpgdmjqwftvncz`)).toBe(23);
  expect(part2(`nppdvjthqldpwncqszvftbrmjlhg`)).toBe(23);
  expect(part2(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`)).toBe(29);
  expect(part2(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`)).toBe(26);
});

test('part two answer', () => {
  expect(part2(input)).toBe(2421);
});
