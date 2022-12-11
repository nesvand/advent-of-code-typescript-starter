// Advent of Code - Day 11

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day11/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day11';

test('part one test', () => {
  expect(
    part1(`Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`)
  ).toBe(10605);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(182293);
  });
}

test('part two test', () => {
  expect(part2(`Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`)).toBe(2713310158);
});

if (input) {
  test('part two answer', () => {
    expect(part2(input)).toBe(54832778815);
  });
}
