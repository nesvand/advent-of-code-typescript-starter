// Advent of Code - Day 18 - Part Two

import { Set, Map, ValueObject } from 'immutable';
import { Point } from './part1';

export function part2(input: string): number {
  const pointData = input
    .split('\n')
    .filter(Boolean)
    .map(line =>
      line
        .trim()
        .split(',')
        .map(v => parseInt(v, 10))
    );

  let points = Set<Point>();

  for (const [x, y, z] of pointData) {
    points = points.add(new Point(x, y, z));
  }

  return 0;
}
