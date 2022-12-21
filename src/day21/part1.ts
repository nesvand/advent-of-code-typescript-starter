// Advent of Code - Day 21 - Part One

import { isNumber } from 'lodash';

export function parseInput(input: string): Map<string, string> {
  return new Map<string, string>(
    input
      .split('\n')
      .filter(Boolean)
      .map(line => line.split(': ')) as [string, string][]
  );
}

export function replaceMonkeys(monkeys: Map<string, string>, root?: string): string {
  if (typeof root !== 'string') throw new Error('root must be a string');
  const [left, op, right] = root.split(' ');
  return ['+', '-', '*', '/', '='].indexOf(op) !== -1
    ? `(${replaceMonkeys(monkeys, monkeys.get(left))})${op}(${replaceMonkeys(monkeys, monkeys.get(right))})`
    : root;
}

export function part1(input: string): number {
  const monkeys = parseInput(input);

  return eval(replaceMonkeys(monkeys, monkeys.get('root')));
}
