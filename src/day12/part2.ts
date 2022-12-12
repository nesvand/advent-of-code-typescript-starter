// Advent of Code - Day 12 - Part Two

import graph from 'graphlib';

import { getGraph } from './part1';

export function part2(input: string): number {
  const inputGraph = input
    .trim()
    .split('\n')
    .filter(Boolean)
    .map(line => line.split(''));
  const { g, end } = getGraph(inputGraph, true);

  return Math.min(
    ...Object.entries(graph.alg.dijkstra(g, end))
      .filter(([key]) => g.node(key) === 'a')
      .map(([, node]) => node.distance)
  );
}
