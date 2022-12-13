// Advent of Code - Day 13 - Part Two

import { ArrayOfNumberOrNumber, comparePairs, Order } from './part1';

export function part2(input: string): number {
  const pairs = input
    .trim()
    .split('\n\n')
    .flatMap(pair => pair.split('\n').map(line => JSON.parse(line) as ArrayOfNumberOrNumber));
  const divider1 = [[2]] as ArrayOfNumberOrNumber;
  const divider2 = [[6]] as ArrayOfNumberOrNumber;

  const pairsWithDividers = [divider1, divider2, ...pairs];

  pairsWithDividers.sort((left, right) => {
    const outcome = comparePairs(left, right);
    if (outcome === Order.Unknown) return 0;
    return outcome === Order.Correct ? -1 : 1;
  });

  return (pairsWithDividers.indexOf(divider1) + 1) * (pairsWithDividers.indexOf(divider2) + 1);
}
