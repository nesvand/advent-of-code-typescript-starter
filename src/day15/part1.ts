// Advent of Code - Day 15 - Part One

import { Input, f, fm } from '../../lib/advent';

export function part1(input: string, checkDepth: number): number {
  let minX = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  const beaconsAtDepth = new Set<string>();
  const beaconsCantExist = new Set<string>();

  const sensors = Input.from(input, true)
    .parse(f.nl(f.match`Sensor at x=${fm.num().as('sx')}, y=${fm.num().as('sy')}: closest .* x=${fm.num().as('bx')}, y=${fm.num().as('by')}`))
    .map(({ sx, sy, bx, by }) => {
      if (sx > maxX) maxX = sx;
      if (bx > maxX) maxX = bx;
      if (sx < minX) minX = sx;
      if (bx < minX) minX = bx;
      if (by === checkDepth) beaconsAtDepth.add(`${bx},${by}`);

      return {
        sx,
        sy,
        bx,
        by,
        range: Math.abs(sx - bx) + Math.abs(sy - by),
      };
    });

  for (const { sx, sy, range } of sensors) {
    const rangeToDepth = Math.abs(sy - checkDepth);
    if (rangeToDepth > range) continue;
    const remainder = range - rangeToDepth;
    const xMin = sx - remainder;
    const xMax = sx + remainder;
    for (let x = xMin; x <= xMax; x++) {
      beaconsCantExist.add(`${x},${checkDepth}`);
    }
  }

  return beaconsCantExist.size - beaconsAtDepth.size;
}
