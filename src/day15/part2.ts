// Advent of Code - Day 15 - Part Two

import { SensorType } from './part1';

function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function part2(input: string): number {
  let minX = Infinity,
    minY = Infinity,
    maxX = 0,
    maxY = 0;
  const sensors: { x: number; y: number; distance: number }[] = [];
  const grid: Record<string, Record<string, SensorType | undefined>> = {};

  input
    .split('\n')
    .filter(Boolean)
    .map(text => {
      const matches = text.match(/(-?\d+)/g);
      if (!matches) throw new Error('match not founc');
      return matches.map(r => +r);
    })
    .forEach(([x1, y1, x2, y2]) => {
      addSensorType('S', x1, y1);
      addSensorType('B', x2, y2);

      const distance = dist(x1, y1, x2, y2);
      sensors.push({ x: x1, y: y1, distance });
      minX = Math.min(minX, x1 - distance, x2 - distance);
      maxX = Math.max(maxX, x1 + distance, x2 + distance);
    });

  function addSensorType(entity: SensorType, x: number, y: number): void {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    if (!grid[y]) {
      grid[y] = {};
    }
    grid[y][x] = entity;
  }

  let found = false;
  let result = 0;
  for (let y = 0; y <= 4000000; y++) {
    grid[y] = grid[y] ?? {};
    if (found) break;
    for (let x = 0; x <= 4000000; x++) {
      const sensor = sensors.find(s => dist(s.x, s.y, x, y) <= s.distance);
      if (sensor) {
        x = sensor.x + sensor.distance - Math.abs(sensor.y - y);
      } else {
        result = x * 4000000 + y;
        found = true;
        break;
      }
    }
  }

  return result;
}
