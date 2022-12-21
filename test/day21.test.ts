// Advent of Code - Day 21

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day21/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day21';

test('part one test', () => {
  expect(
    part1(`root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32
`)
  ).toBe(152);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(121868120894282);
  });
}

test('part two test', () => {
  expect(
    part2(`root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32
`)
  ).toBe(301);
});

if (input) {
  test('part two answer', () => {
    expect(part2(input)).toBe(3582317956029);
  });
}
