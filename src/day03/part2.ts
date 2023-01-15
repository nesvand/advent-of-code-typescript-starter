// Advent of Code - Day 3 - Part Two
import { chunk, intersection } from 'remeda';

export function part2(input: string): number {
  const lines = input.split('\n').filter(Boolean);
  const groups = chunk(lines, 3);
  return groups.reduce((sum, group) => {
    const inter = intersection(group[0].split(''), intersection(group[1].split(''), group[2].split('')))[0].charCodeAt(0);
    if (inter >= 97 && inter <= 123) {
      return sum + (inter - 96);
    } else {
      return sum + (inter - 38);
    }
  }, 0);
}
