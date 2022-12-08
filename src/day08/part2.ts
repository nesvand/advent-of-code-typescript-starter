// Advent of Code - Day 8 - Part Two

import { numVisible, Tree } from './part1';
import { Heap } from 'heap-js';

export function part2(input: string): number {
  const lines: Tree[][] = input
    .split('\n')
    .filter(Boolean)
    .map((line, y) =>
      line
        .trim()
        .split('')
        .map((v, x) => {
          return {
            value: parseInt(v, 10),
            position: `${x},${y}`,
          };
        })
    );

  const horizontalInterior = lines.slice(1, lines.length - 1);

  const rotated: Array<Array<Tree>> = [];
  for (let i = 0; i < lines[0].length; i++) {
    for (let j = lines.length - 1; j >= 0; j--) {
      if (!Array.isArray(rotated[i])) rotated[i] = [];
      rotated[i].push(lines[j][i]);
    }
  }

  const verticalInterior = rotated.slice(1, rotated.length - 1);

  const visible = new Set<Tree>();
  numVisible(horizontalInterior, visible);
  numVisible(verticalInterior, visible);

  const treePriorityComparator = (a: number, b: number) => b - a;
  const treePriority = new Heap(treePriorityComparator);

  for (const tree of visible.values()) {
    const [x, y] = tree.position.split(',').map(v => parseInt(v, 10));
    const treeValue = lines[y][x].value;
    let up = 0;
    // Up
    for (let i = y - 1; i >= 0; i--) {
      up++;
      if (lines[i][x].value >= treeValue) break;
    }
    let down = 0;
    // Down
    for (let i = y + 1; i <= lines.length - 1; i++) {
      down++;
      if (lines[i][x].value >= treeValue) break;
    }
    let left = 0;
    // Left
    for (let i = x - 1; i >= 0; i--) {
      left++;
      if (lines[y][i].value >= treeValue) break;
    }
    let right = 0;
    // Right
    for (let i = x + 1; i <= lines[0].length - 1; i++) {
      right++;
      if (lines[y][i].value >= treeValue) {
        break;
      }
    }
    // console.log(up, down, right, left);
    treePriority.push(up * down * right * left);
  }

  return treePriority.pop()!;
}
