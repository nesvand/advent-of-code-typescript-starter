// Advent of Code - Day 16 - Part One

// NOTE - not my own solution! Keeping a record to understand what's being done here

/** NODE => flow rate */
const flowRates: Record<string, number> = {};
/** NODE:NODE -> Hops */
const shortestPaths: Record<string, number> = {};
const allNodes = new Array<string>();
const nodesWithFlow = new Array<string>();
const flowNodeIndexes: Record<string, number> = {};

function addOpen(current: number, node: string): number {
  const openMask = 1 << flowNodeIndexes[node];
  return current | openMask;
}

function isOpen(current: number, node: string): boolean {
  const openMask = 1 << flowNodeIndexes[node];
  return (current & openMask) > 0;
}

/** This is AFTER we've visited a node and OPENED it. */
export type Item = {
  /** Valves that are open */
  openMask: number;
  /** How many minutes left */
  remaining: number;
  /** Current node */
  current: string;
  /** How much gas will flow out. */
  total: number;
};

export function graphSearch(minutes: number, onVisit: (item: Item) => void) {
  const fringe: Array<Item> = [];
  fringe.push({ current: 'AA', remaining: minutes, openMask: 0, total: 0 });
  const visited = new Set<string>();
  while (fringe.length > 0) {
    const item = fringe.pop();
    if (!item) throw new ReferenceError('Fringe is empty');
    const { openMask, remaining, current, total } = item;
    const visitedKey = `${current}:${remaining}:${openMask}:${total}`;
    if (visited.has(visitedKey)) continue;
    visited.add(visitedKey);

    onVisit(item);

    if (remaining === 0) {
      continue;
    }

    for (const next of nodesWithFlow) {
      if (isOpen(openMask, next)) continue;
      const nextRemaining = remaining - shortestPaths[`${current}:${next}`] - 1;
      if (nextRemaining <= 0) continue;
      fringe.push({
        current: next,
        openMask: addOpen(openMask, next),
        remaining: nextRemaining,
        total: total + nextRemaining * flowRates[next],
      });
    }
  }
}

export function part(input: string, partTwo = false): number {
  const parsed = input.split(`\n`).filter(Boolean);

  // PARSE THE GRAPH
  for (const row of parsed) {
    const [, from, rate, toArray] = /Valve ([^)]+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/.exec(row) ?? [];
    const flowRate = Number(rate);
    flowRates[from] = flowRate;
    allNodes.push(from);
    if (flowRate > 0) {
      nodesWithFlow.push(from);
      flowNodeIndexes[from] = nodesWithFlow.length;
    }
    shortestPaths[`${from}:${from}`] = 0;
    for (const to of toArray.split(', ')) {
      shortestPaths[`${from}:${to}`] = 1;
    }
  }

  // FLOYD WARSHALL to fill in remaining shortest paths.
  for (const hopNode of allNodes) {
    for (const node1 of allNodes) {
      for (const node2 of allNodes) {
        shortestPaths[`${node1}:${node2}`] = Math.min(
          shortestPaths[`${node1}:${node2}`] ?? Number.MAX_SAFE_INTEGER,
          (shortestPaths[`${node1}:${hopNode}`] ?? Number.MAX_SAFE_INTEGER) + (shortestPaths[`${hopNode}:${node2}`] ?? Number.MAX_SAFE_INTEGER)
        );
      }
    }
  }

  let answer1 = 0;
  graphSearch(30, item => {
    answer1 = Math.max(item.total, answer1);
  });

  if (!partTwo) return answer1;

  let answer2 = 0;
  const bestAt26 = new Map<number, number>();
  graphSearch(26, item => {
    bestAt26.set(item.openMask, Math.max(bestAt26.get(item.openMask) ?? 0, item.total));
  });

  for (const [openMask1, best1] of bestAt26) {
    for (const [openMask2, best2] of bestAt26) {
      const overlap = openMask1 & openMask2;
      if (overlap !== 0) continue;
      answer2 = Math.max(answer2, best1 + best2);
    }
  }

  return answer2;
}
