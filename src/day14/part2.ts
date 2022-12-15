// Advent of Code - Day 14 - Part Two

import { Input } from '../../lib/advent';
import { parseInput } from './part1';

export function part2(input: Input): number {
  const { rockPaths, lowestY } = parseInput(input);
  const floor = lowestY + 2;
  const settledSand = new Set<string>();
  let done = false;

  function isNotBlocked(x: number, y: number): boolean {
    if (y === floor) return false;

    return !rockPaths.has(`${x},${y}`) && !settledSand.has(`${x},${y}`);
  }

  while (!done) {
    const sand = { x: 500, y: 0 };
    let settled = false;

    while (!settled) {
      const { x, y } = sand;
      if (isNotBlocked(x, y + 1)) {
        sand.y += 1;
        continue;
      }
      if (isNotBlocked(x - 1, y + 1)) {
        sand.y += 1;
        sand.x -= 1;
        continue;
      }
      if (isNotBlocked(x + 1, y + 1)) {
        sand.y += 1;
        sand.x += 1;
        continue;
      }

      settled = true;
    }

    if (sand.x === 500 && sand.y === 0) done = true;
    settledSand.add(`${sand.x},${sand.y}`);
  }

  return settledSand.size;
}
