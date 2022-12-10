// Advent of Code - Day 7

import { readFileSync } from 'fs';

let input = '';
try {
  input = readFileSync('src/day01/resources/input.txt', 'utf8');
} catch (e) {
  // ignore
}

import { part1, part2 } from '../src/day07';

test('part one test', () => {
  expect(
    part1(`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`)
  ).toBe(95437);
});

if (input) {
  test('part one answer', () => {
    expect(part1(input)).toBe(1667443);
  });
}

test('part two test', () => {
  expect(
    part2(`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`)
  ).toBe(24933642);
});

if (input) {
  test('part two answer', () => {
    expect(part2(input)).toBe(8998590);
  });
}
