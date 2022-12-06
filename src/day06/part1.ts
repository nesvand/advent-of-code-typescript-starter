// Advent of Code - Day 6 - Part One

import _ from 'lodash';

export const findUniqueChunkIndex = (buffer: string[][], size: number): number => {
  let start = 0;
  let end = size;
  while (end < buffer.length) {
    if (_.union(...buffer.slice(start, end)).length < size) {
      start++;
      end++;
      continue;
    }
    return end;
  }

  return 0;
};

export function part1(input: string): number {
  const buffer = input
    .split('\n\n')[0]
    .split('')
    .map(x => [x]);
  return findUniqueChunkIndex(buffer, 4);
}
