import graph, { Graph } from 'graphlib';

function isNotUndefined<T>(value: T | undefined): value is Exclude<T, undefined> {
  return value !== undefined;
}

type Coord = {
  value: string;
  x: number;
  y: number;
};

const findNeighbors = (x: number, y: number, grid: string[][]): Coord[] => {
  return [
    grid[y - 1]?.[x] ? { value: grid[y - 1][x], x, y: y - 1 } : undefined,
    grid[y + 1]?.[x] ? { value: grid[y + 1][x], x, y: y + 1 } : undefined,
    grid[y][x - 1] ? { value: grid[y][x - 1], x: x - 1, y } : undefined,
    grid[y][x + 1] ? { value: grid[y][x + 1], x: x + 1, y } : undefined,
  ].filter(isNotUndefined);
};

const getElevation = (item: string) => {
  return item === 'S' ? 1 : item === 'E' ? 26 : item.charCodeAt(0) - 96;
};

export const getGraph = (inputGraph: string[][], reverse = false) => {
  const g = new Graph({ directed: true });
  let start = '';
  let end = '';

  for (let y = 0; y < inputGraph.length; y++) {
    for (let x = 0; x < inputGraph[0].length; x++) {
      const node = inputGraph[y][x];
      const nodeName = `${x},${y}`;
      const neighbors = findNeighbors(x, y, inputGraph);
      const currentElevation = getElevation(node);

      if (node === 'S') {
        start = nodeName;
      }

      if (node === 'E') {
        end = nodeName;
      }

      g.setNode(nodeName, inputGraph[y][x]);

      for (const neighbor of neighbors) {
        const neighborElevation = getElevation(neighbor.value);
        const neighborName = `${neighbor.x},${neighbor.y}`;
        if (neighborElevation <= currentElevation + 1) {
          g.setNode(neighborName, neighbor.value);

          if (reverse) {
            g.setEdge(neighborName, nodeName);
          } else {
            g.setEdge(nodeName, neighborName);
          }
        }
      }
    }
  }

  return { g, start, end };
};

export const part1 = (input: string) => {
  const inputGraph = input
    .trim()
    .split('\n')
    .filter(Boolean)
    .map(line => line.split(''));
  const { g, start, end } = getGraph(inputGraph);

  return graph.alg.dijkstra(g, start)[end].distance;
};
