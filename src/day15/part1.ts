// Advent of Code - Day 15 - Part One

import { Input, f, fm } from '../../lib/advent';

export function part1(input: string): number {
  const sensors = Input.from(input, true)
    .parse(f.nl(f.match`Sensor at x=${fm.num().as('sx')}, y=${fm.num().as('sy')}: closest .* x=${fm.num().as('bx')}, y=${fm.num().as('by')}`))
    .map(({ sx, sy, bx, by }) => ({
      sx,
      sy,
      bx,
      by,
      range: Math.abs(sx - bx) + Math.abs(sy - by),
    }));

  console.log(sensors);

  return 0;
}
