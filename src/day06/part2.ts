// Advent of Code - Day 6 - Part Two

import { findUniqueChunkIndex } from './part1';

export function part2(input: string): number {
  const buffer = input
    .split('\n\n')[0]
    .split('')
    .map(x => [x]);
  return findUniqueChunkIndex(buffer, 14);
}
