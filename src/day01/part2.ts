// Advent of Code - Day 1 - Part Two
import { sortedElfCalories } from './part1';

export function part2(input: string): number {
  const elfCalories = sortedElfCalories(input);

  return elfCalories.slice(0, 3).reduce((a, b) => a + b, 0);
}
