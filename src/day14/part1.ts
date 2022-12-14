// Advent of Code - Day 14 - Part One

export function parseInput(input: string): { rockPaths: Set<string>; lowestY: number } {
  const rockPaths = new Set<string>();
  let lowestY = Number.MIN_SAFE_INTEGER;

  input
    .trim()
    .split('\n')
    .filter(Boolean)
    .map(line =>
      line
        .trim()
        .split(' -> ')
        .map(vertex => {
          const [x, y] = vertex.split(',').map(v => Number(v));

          if (y > lowestY) lowestY = y;

          return { x, y };
        })
    )
    .forEach(rockLine => {
      // console.log(rockLine);
      for (const [i, vertex] of rockLine.entries()) {
        const nextVertex = rockLine[i + 1];
        if (!nextVertex) continue;

        const dx = nextVertex.x - vertex.x;
        const dy = nextVertex.y - vertex.y;
        // console.log(dx, dy);

        if (dx !== 0) {
          const y = vertex.y;
          const neg = dx < 0;
          for (let x = neg ? nextVertex.x : vertex.x; x <= (neg ? vertex.x : nextVertex.x); x++) {
            rockPaths.add(`${x},${y}`);
          }
          continue;
        }

        if (dy !== 0) {
          const x = vertex.x;
          const neg = dy < 0;
          for (let y = neg ? nextVertex.y : vertex.y; y <= (neg ? vertex.y : nextVertex.y); y++) {
            rockPaths.add(`${x},${y}`);
          }
          continue;
        }
      }
    });

  return { rockPaths, lowestY };
}

export function part1(input: string): number {
  const { rockPaths, lowestY } = parseInput(input);
  const settledSand = new Set<string>();
  let done = false;

  function isNotBlocked(x: number, y: number): boolean {
    return !rockPaths.has(`${x},${y}`) && !settledSand.has(`${x},${y}`);
  }

  while (!done) {
    const sand = { x: 500, y: 0 };
    let settled = false;

    while (!settled) {
      const { x, y } = sand;
      if (y === lowestY) {
        done = true;
        break;
      }
      if (isNotBlocked(x, y + 1)) {
        sand.y += 1;
        continue;
      }
      if (isNotBlocked(x - 1, y + 1)) {
        sand.y += 1;
        sand.x -= 1;
        continue;
      }
      if (isNotBlocked(x + 1, y + 1)) {
        sand.y += 1;
        sand.x += 1;
        continue;
      }

      settled = true;
    }

    if (done) break;
    settledSand.add(`${sand.x},${sand.y}`);
  }

  return settledSand.size;
}
