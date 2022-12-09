// Advent of Code - Day 9 - Part One

export type Move = {
  direction: 'U' | 'D' | 'L' | 'R';
  distance: number;
};

export class Position {
  public x = 0;
  public y = 0;

  moveX(offset: number) {
    this.x += offset;
  }

  moveY(offset: number) {
    this.y += offset;
  }

  moveRelativeTo(offset: Position) {
    const deltaX = offset.x - this.x;
    const absDeltaX = Math.abs(deltaX);
    const deltaY = offset.y - this.y;
    const absDeltaY = Math.abs(deltaY);

    // Same position? Stay
    if (absDeltaX === 0 && absDeltaY === 0) {
      // console.log('Same position, not moving');
      return;
    }

    // Only one space away? Stay
    if ((absDeltaX === 0 && absDeltaY === 1) || (absDeltaY === 0 && absDeltaX === 1) || (absDeltaX === 1 && absDeltaY === 1)) {
      // console.log('Only one space away, not moving');
      return;
    }

    // Same X? Move towards on Y
    if (this.x === offset.x) {
      this.moveY(this.y < offset.y ? 1 : -1);
      return;
    }

    // Same Y? Move towards on X
    if (this.y === offset.y) {
      this.moveX(this.x < offset.x ? 1 : -1);
      return;
    }

    // Otherwise move as close as possible diagonally
    this.moveX(this.x < offset.x ? 1 : -1);
    this.moveY(this.y < offset.y ? 1 : -1);
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}

export function isDirection(direction: any): direction is 'U' | 'L' | 'R' | 'D' {
  return ['U', 'L', 'R', 'D'].indexOf(direction) !== -1;
}

function moveTail(head: Position, tail: Position, tailPositions: Set<string>) {
  tail.moveRelativeTo(head);
  tailPositions.add(tail.toString());
}

export function part1(input: string): number {
  const tailPositions = new Set<string>();
  const head = new Position();
  const tail = new Position();
  tailPositions.add(tail.toString());

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
          moveTail(head, tail, tailPositions);
        }
        break;
      case 'D':
        for (let i = 0; i < move.distance; i++) {
          head.moveY(-1);
          moveTail(head, tail, tailPositions);
        }
        break;
      case 'L':
        for (let i = 0; i < move.distance; i++) {
          head.moveX(-1);
          moveTail(head, tail, tailPositions);
        }
        break;
      case 'R':
        for (let i = 0; i < move.distance; i++) {
          head.moveX(1);
          moveTail(head, tail, tailPositions);
        }
        break;
      default:
        throw new Error(`Unknown move direction: ${move.direction}`);
    }
  }

  return tailPositions.size;
}
