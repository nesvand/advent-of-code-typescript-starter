// Advent of Code - Day 15 - Part One

export type SensorType = 'S' | 'B';

function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function part1(input: string, target: number): number {
  let minX = Infinity,
    minY = Infinity,
    maxX = 0,
    maxY = 0;
  const sensors: { x: number; y: number; distance: number }[] = [];
  const grid: Record<string, Record<string, SensorType | undefined>> = {};

  function addEntity(entity: SensorType, x: number, y: number): void {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    if (!grid[y]) {
      grid[y] = {};
    }
    grid[y][x] = entity;
  }

  // parse beacon signals to points on grid
  input
    .split('\n')
    .filter(Boolean)
    .map(text => {
      const matches = text.match(/(-?\d+)/g);
      if (!matches) throw new Error('failed to match');
      return matches.map(r => +r);
    })
    .forEach(([x1, y1, x2, y2]) => {
      addEntity('S', x1, y1);
      addEntity('B', x2, y2);

      const distance = dist(x1, y1, x2, y2);
      sensors.push({ x: x1, y: y1, distance });
      minX = Math.min(minX, x1 - distance, x2 - distance);
      maxX = Math.max(maxX, x1 + distance, x2 + distance);
    });
  let count = 0;
  if (!grid[target]) grid[target] = {};
  for (let x = minX; x <= maxX; x++) {
    if (!grid[target][x] && sensors.some(s => dist(s.x, s.y, x, target) <= s.distance)) count++;
  }
  return count;
}
