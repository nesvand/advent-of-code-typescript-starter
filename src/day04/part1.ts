// Advent of Code - Day 4 - Part One
import { intersection } from 'remeda';

export function part1(input: string): number {
  return input
    .split('\n')
    .filter(Boolean)
    .reduce((sum, pair) => {
      const [a, b] = pair.split(',').map(elf => {
        const [start, end] = elf.split('-').map(n => parseInt(n, 10));
        const assignments: number[] = [];
        for (let i = start; i <= end; i++) {
          assignments.push(i);
        }
        return assignments;
      });
      const inter = intersection(a, b);
      return sum + (inter.length === a.length || inter.length === b.length ? 1 : 0);
    }, 0);
}
