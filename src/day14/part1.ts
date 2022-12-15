// Advent of Code - Day 14 - Part One

import { Input, f } from '../../lib/advent';

export function parseInput(input: Input): { rockPaths: Set<string>; lowestY: number } {
  const rockPaths = new Set<string>();
  let lowestY = Number.MIN_SAFE_INTEGER;

  const mappedRockPaths = input.parse(
    f.split(
      '\n',
      f.split(' -> ', line => {
        const result = f.split(',', f.num())(line);
        if (result[1] > lowestY) lowestY = result[1];
        return result;
      })
    )
  );

  for (const rockPath of mappedRockPaths) {
    for (const [i, [ax, ay]] of rockPath.entries()) {
      const nextVertex = rockPath[i + 1];
      if (!nextVertex) continue;
      const [bx, by] = nextVertex;

      const dx = bx - ax;
      const dy = by - ay;

      if (dx !== 0) {
        const neg = dx < 0;
        for (let x = neg ? bx : ax; x <= (neg ? ax : bx); x++) {
          rockPaths.add(`${x},${ay}`);
        }
        continue;
      }

      if (dy !== 0) {
        const neg = dy < 0;
        for (let y = neg ? by : ay; y <= (neg ? ay : by); y++) {
          rockPaths.add(`${ax},${y}`);
        }
        continue;
      }
    }
  }

  return { rockPaths, lowestY };
}

export function part1(input: Input): number {
  const { rockPaths, lowestY } = parseInput(input);
  const settledSand = new Set<string>();
  let done = false;

  function isNotBlocked(x: number, y: number): boolean {
    return !rockPaths.has(`${x},${y}`) && !settledSand.has(`${x},${y}`);
  }

  while (!done) {
    const sand = { x: 500, y: 0 };
    let settled = false;

    while (!settled) {
      const { x, y } = sand;
      if (y === lowestY) {
        done = true;
        break;
      }
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

    if (done) break;
    settledSand.add(`${sand.x},${sand.y}`);
  }

  return settledSand.size;
}
