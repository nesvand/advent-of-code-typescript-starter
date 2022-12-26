// Advent of Code - Day 19 - Part Two

import { Blueprint, Materials, Robots, getMaxGeodes } from './part1';

export function part2(input: string): number {
  const availableRobots: Robots = {
    ore: 1,
    clay: 0,
    obsidian: 0,
  };

  const materials: Materials = {
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0,
  };

  return input
    .split('\n')
    .filter(Boolean)
    .map(line => {
      const [, id, oreRobotOreCost, clayRobotOreCost, obsidianRobotOreCost, obsidianRobotClayCost, geodeRobotOreCost, geodeRobotObsidianCost] =
        line.match(
          /Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./
        )!;

      return {
        id: parseInt(id, 10),
        oreRobotCost: {
          ore: parseInt(oreRobotOreCost, 10),
          clay: 0,
          obsidian: 0,
        },
        clayRobotCost: {
          ore: parseInt(clayRobotOreCost, 10),
          clay: 0,
          obsidian: 0,
        },
        obsidianRobotCost: {
          ore: parseInt(obsidianRobotOreCost, 10),
          clay: parseInt(obsidianRobotClayCost, 10),
          obsidian: 0,
        },
        geodeRobotCost: {
          ore: parseInt(geodeRobotOreCost, 10),
          clay: 0,
          obsidian: parseInt(geodeRobotObsidianCost, 10),
        },
      } as Blueprint;
    })
    .filter(bp => bp.id <= 3)
    .map(blueprint => getMaxGeodes(blueprint, availableRobots, materials, 32, 0))
    .reduce((a, b) => {
      console.log(b);
      return a * b;
    }, 1);
}
