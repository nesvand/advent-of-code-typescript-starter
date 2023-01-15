// Advent of Code - Day 22 - Part One
import { flatten, zip } from 'remeda';

export type Map = Array<Array<string | null>>;

export const parseInput = (input: string): { map: Map; steps: Array<number | string> } => {
  const [mapInput, stepsInput] = input.split('\n\n').filter(Boolean);
  const mapLines = mapInput.split('\n').filter(Boolean);
  const stepNumbers = stepsInput.trim().split(/[RL]/).filter(Boolean);
  const stepTurns = stepsInput.trim().split(/\d+/).filter(Boolean);

  const steps: Array<number | string> = flatten(zip(stepNumbers, stepTurns))
    .filter(Boolean)
    .map(step => {
      if (typeof step === 'undefined') throw new Error('invalid step');

      const val = Number(step);
      if (!Number.isNaN(val)) {
        return val;
      }
      return step;
    });

  const mapHeight = mapLines.length;
  const mapWidth = Math.max(...mapLines.map(l => l.length));
  const map: Map = Array.from({ length: mapHeight }, () => Array.from({ length: mapWidth }, () => null));

  for (const [y, line] of mapLines.entries()) {
    const row = line.trimEnd().split('');
    for (let x = 0; x < row.length; x++) {
      switch (row[x]) {
        case ' ': {
          break;
        }
        default: {
          map[y][x] = row[x];
        }
      }
    }
  }

  return {
    map,
    steps,
  };
};

export const traverse = (map: Map, steps: Array<number | string>): { x: number; y: number; facing: number } => {
  let currPos = {} as { x: number; y: number; facing: number };

  for (let x = 0; x < map[0].length; x++) {
    if (map[0][x] === '.') {
      currPos = { x, y: 0, facing: 0 };
      break;
    }
  }

  // Sanity check
  if (typeof currPos?.x === 'undefined') throw new Error('startingPosition invalid');

  for (const [, step] of steps.entries()) {
    // console.log(`currPos before step ${i}: ${step} :: `, JSON.stringify(currPos));
    if (typeof step !== 'number') {
      switch (step) {
        case 'L': {
          currPos.facing -= 1;
          if (currPos.facing === -1) currPos.facing = 3;
          break;
        }
        case 'R': {
          currPos.facing = (currPos.facing + 1) % 4;
          break;
        }
        default: {
          throw new Error('invalid step');
        }
      }
      continue;
    }

    for (let movesRemaining = step; movesRemaining > 0; movesRemaining--) {
      switch (currPos.facing) {
        // Right
        case 0: {
          let nextPos = map[currPos.y]?.[currPos.x + 1];
          if (nextPos === '#') continue;
          if (nextPos === null) {
            let newX = currPos.x + 1;
            while (nextPos === null) {
              newX += 1;
              nextPos = map[currPos.y]?.[newX];
            }
          }
          if (typeof nextPos === 'undefined') {
            let newX = 0;
            nextPos = map[currPos.y]?.[newX];
            while (nextPos === null) {
              newX += 1;
              nextPos = map[currPos.y]?.[newX];
            }
            if (nextPos === '#') continue;
            currPos.x = newX;
            break;
          }
          currPos.x += 1;
          break;
        }
        // Down
        case 1: {
          let nextPos = map[currPos.y + 1]?.[currPos.x];
          if (nextPos === '#') continue;
          if (nextPos === null) {
            let newY = currPos.y + 1;
            while (nextPos === null) {
              newY += 1;
              nextPos = map[newY]?.[currPos.x];
            }
          }
          if (typeof nextPos === 'undefined') {
            let newY = 0;
            nextPos = map[newY]?.[currPos.x];
            while (nextPos === null) {
              newY += 1;
              nextPos = map[newY]?.[currPos.x];
            }
            if (nextPos === '#') continue;
            currPos.y = newY;
            break;
          }
          currPos.y += 1;
          break;
        }
        // Left
        case 2: {
          let nextPos = map[currPos.y]?.[currPos.x - 1];
          if (nextPos === '#') continue;
          if (nextPos === null) {
            let newX = currPos.x - 1;
            while (nextPos === null) {
              newX -= 1;
              nextPos = map[currPos.y]?.[newX];
            }
          }
          if (typeof nextPos === 'undefined') {
            let newX = map[0].length - 1;
            nextPos = map[currPos.y]?.[newX];
            while (nextPos === null) {
              newX -= 1;
              nextPos = map[currPos.y]?.[newX];
            }
            if (nextPos === '#') continue;
            currPos.x = newX;
            break;
          }
          currPos.x -= 1;
          break;
        }
        // Up
        case 3: {
          let nextPos = map[currPos.y - 1]?.[currPos.x];
          if (nextPos === '#') continue;
          if (nextPos === null) {
            let newY = currPos.y - 1;
            while (nextPos === null) {
              newY -= 1;
              nextPos = map[newY]?.[currPos.x];
            }
          }
          if (typeof nextPos === 'undefined') {
            let newY = map.length - 1;
            nextPos = map[newY]?.[currPos.x];
            while (nextPos === null) {
              newY -= 1;
              nextPos = map[newY]?.[currPos.x];
            }
            if (nextPos === '#') continue;
            currPos.y = newY;
            break;
          }
          currPos.y -= 1;
          break;
        }
        default: {
          throw new Error('invalid facing');
        }
      }
    }
  }

  return currPos;
};

export function part1(input: string): number {
  const { map, steps } = parseInput(input);
  const { x, y, facing } = traverse(map, steps);

  return 1000 * (y + 1) + 4 * (x + 1) + facing;
}
