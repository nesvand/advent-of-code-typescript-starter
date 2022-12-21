// Advent of Code - Day 21 - Part Two

import * as nerdamer from 'nerdamer/all.min';
import { parseInput, replaceMonkeys } from './part1';

export function part2(input: string): number {
  const monkeys = parseInput(input);
  monkeys.set('humn', 'x');
  const expression = replaceMonkeys(monkeys, monkeys.get('root')?.replace('+', '='));
  const solution = JSON.parse(nerdamer.solve(expression, 'x').toString());
  return solution[0];
}
