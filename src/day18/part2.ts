// Advent of Code - Day 18 - Part Two

import { Set } from 'immutable';
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

  let possibleInsidePoints = Set<Point>();

  for (const point of points) {
    for (const neighbour of point.neighbours()) {
      if (!points.has(neighbour)) {
        possibleInsidePoints = possibleInsidePoints.add(neighbour);
      }
    }
  }

  // Get bounding box
  const minX = points.minBy(p => p.x)!.x;
  const maxX = points.maxBy(p => p.x)!.x;
  const minY = points.minBy(p => p.y)!.y;
  const maxY = points.maxBy(p => p.y)!.y;
  const minZ = points.minBy(p => p.z)!.z;
  const maxZ = points.maxBy(p => p.z)!.z;

  for (const possibleInsidePoint of possibleInsidePoints) {
    if (points.has(possibleInsidePoint)) {
      continue;
    }

    let seen = Set.of(possibleInsidePoint);
    const queue = [possibleInsidePoint];
    let interior = true;

    outer: while (queue.length > 0) {
      const next = queue.shift()!;
      for (const neighbour of next.neighbours()) {
        if (neighbour.x < minX || neighbour.x > maxX || neighbour.y < minY || neighbour.y > maxY || neighbour.z < minZ || neighbour.z > maxZ) {
          interior = false;
          break outer;
        }

        if (points.has(neighbour)) {
          continue;
        }

        if (!seen.has(neighbour)) {
          seen = seen.add(neighbour);
          queue.push(neighbour);
        }
      }
    }

    if (interior) {
      points = points.union(seen);
    }
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
