// Advent of Code - Day 18 - Part One

import { Set, ValueObject } from 'immutable';

export class Point implements ValueObject {
  constructor(public x: number, public y: number, public z: number) {}

  public *neighbours(): Iterable<Point> {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (Math.abs(dx) + Math.abs(dy) + Math.abs(dz) === 1) {
            yield new Point(this.x + dx, this.y + dy, this.z + dz);
          }
        }
      }
    }
  }

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  hashCode(): number {
    return this.x * 1_000_000 + this.y * 1_000 + this.z;
  }
  
  toString(): string {
    return `${this.x},${this.y},${this.z}`;
  }
}

export function part1(input: string): number {
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

  let answer = 0;
  for (const point of points) {
    for (const neighbour of point.neighbours()) {
      if (!points.has(neighbour)) {
        answer++;
      }
    }
  }

  return answer;
}
