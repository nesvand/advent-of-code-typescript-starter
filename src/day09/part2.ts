// Advent of Code - Day 9 - Part Two

import { isDirection, Move, Position } from './part1';

function moveTails(head: Position, tails: Position[], tailPositions: Set<string>) {
  for (let i = 0; i < tails.length; i++) {
    if (i === 0) {
      tails[i].moveRelativeTo(head);
      continue;
    }
    tails[i].moveRelativeTo(tails[i - 1]);
  }
  tailPositions.add(`${tails[tails.length - 1]}`);
}

export function part2(input: string): number {
  const tailPositions = new Set<string>();
  const head = new Position();
  const tails = new Array(9).fill(null).map(() => new Position());

  // Add tail initial position
  tailPositions.add(`${tails[tails.length - 1]}`);

  const moves: Move[] = input
    .split('\n')
    .filter(Boolean)
    .map(moveString => {
      const [direction, distance] = moveString.split(' ');
      if (!isDirection(direction)) throw new Error(`Invalid move direction: ${direction}`);
      return {
        direction,
        distance: parseInt(distance, 10),
      };
    });

  for (const move of moves) {
    switch (move.direction) {
      case 'U':
        for (let i = 0; i < move.distance; i++) {
          head.moveY(1);
          moveTails(head, tails, tailPositions);
        }
        break;
      case 'D':
        for (let i = 0; i < move.distance; i++) {
          head.moveY(-1);
          moveTails(head, tails, tailPositions);
        }
        break;
      case 'L':
        for (let i = 0; i < move.distance; i++) {
          head.moveX(-1);
          moveTails(head, tails, tailPositions);
        }
        break;
      case 'R':
        for (let i = 0; i < move.distance; i++) {
          head.moveX(1);
          moveTails(head, tails, tailPositions);
        }
        break;
      default:
        throw new Error(`Unknown move direction: ${move.direction}`);
    }
  }

  return tailPositions.size;
}
