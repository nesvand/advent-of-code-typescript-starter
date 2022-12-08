// Advent of Code - Day 8 - Part One

export type Tree = {
  value: number;
  position: string;
};

export function numVisible(interior: Array<Array<Tree>>, visible: Set<Tree>) {
  for (const left of interior) {
    let leftPeak = left[0].value;
    const right = [...left].reverse();
    let rightPeak = right[0].value;

    for (const tree of left.slice(1, left.length - 1)) {
      if (tree.value > leftPeak) {
        leftPeak = tree.value;
        visible.add(tree);
      }
    }
    for (const tree of right.slice(1, right.length - 1)) {
      if (tree.value > rightPeak) {
        rightPeak = tree.value;
        visible.add(tree);
      }
    }
  }
}

export function part1(input: string): number {
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

  return horizontalInterior[0].length * 2 + horizontalInterior.length * 2 + visible.size;
}
