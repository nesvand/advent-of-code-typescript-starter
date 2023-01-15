// Advent of Code - Day 6 - Part One
import { uniq, flatten } from 'remeda';

export const findUniqueChunkIndex = (buffer: string[][], size: number): number => {
  let start = 0;
  let end = size;
  while (end < buffer.length) {
    const union = uniq(flatten([...buffer.slice(start, end)]));
    if (union.length < size) {
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
