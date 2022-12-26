// Advent of Code - Day 19 - Part One
export type Blueprint = {
  id: number;
  oreRobotCost: RobotCost;
  clayRobotCost: RobotCost;
  obsidianRobotCost: RobotCost;
  geodeRobotCost: RobotCost;
};

export type RobotCost = {
  ore: number;
  clay: number;
  obsidian: number;
};

export type Robots = {
  ore: number;
  clay: number;
  obsidian: number;
};

export type Materials = {
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
};

export const getMaxGeodes = (
  blueprint: Blueprint,
  robotsAvailable: Robots,
  materialsAvailable: Materials,
  time: number,
  currMaxGeodes: number
): number => {
  if (time <= 0) return currMaxGeodes;

  currMaxGeodes = Math.max(materialsAvailable.geode, currMaxGeodes);

  const maxOreNeeded = Math.max(
    blueprint.oreRobotCost.ore,
    blueprint.clayRobotCost.ore,
    blueprint.obsidianRobotCost.ore,
    blueprint.geodeRobotCost.ore
  );

  if (robotsAvailable.obsidian > 0) {
    const canBuildGeodeRobot = blueprint.geodeRobotCost.ore <= materialsAvailable.ore && blueprint.geodeRobotCost.obsidian <= materialsAvailable.obsidian;

    const timeUntilEnoughOre = Math.ceil((blueprint.geodeRobotCost.ore - materialsAvailable.ore) / robotsAvailable.ore);
    const timeUntilEnoughObsidian = Math.ceil((blueprint.geodeRobotCost.obsidian - materialsAvailable.obsidian) / robotsAvailable.obsidian);
    const timeUntilEnoughResources = Math.max(timeUntilEnoughOre, timeUntilEnoughObsidian);

    const totalTime = 1 + (canBuildGeodeRobot ? 0 : timeUntilEnoughResources);

    const newMaterials = {
      ...materialsAvailable,
      ores: materialsAvailable.ore + totalTime * robotsAvailable.ore - blueprint.geodeRobotCost.ore,
      clays: materialsAvailable.clay + totalTime * robotsAvailable.clay,
      obsidians: materialsAvailable.obsidian + totalTime * robotsAvailable.obsidian - blueprint.geodeRobotCost.obsidian,
      geodes: materialsAvailable.geode + time - totalTime,
    };

    currMaxGeodes = Math.max(getMaxGeodes(blueprint, robotsAvailable, newMaterials, time - totalTime, currMaxGeodes), currMaxGeodes);

    if (canBuildGeodeRobot) return currMaxGeodes;
  }

  if (robotsAvailable.clay > 0) {
    const enoughOre = blueprint.obsidianRobotCost.ore <= materialsAvailable.ore;
    const enoughClay = blueprint.obsidianRobotCost.clay <= materialsAvailable.clay;
    const canBuildObsidianRobot = enoughOre && enoughClay;

    const timeUntilEnoughOre = Math.ceil((blueprint.obsidianRobotCost.ore - materialsAvailable.ore) / robotsAvailable.ore);
    const timeUntilEnoughClay = Math.ceil((blueprint.obsidianRobotCost.clay - materialsAvailable.clay) / robotsAvailable.clay);
    const timeUntilEnoughResources = Math.max(timeUntilEnoughOre, timeUntilEnoughClay);

    const totalTime = 1 + (canBuildObsidianRobot ? 0 : timeUntilEnoughResources);

    if (time - totalTime > 2) {
      const newRobots = {
        ...robotsAvailable,
        obsidian: robotsAvailable.obsidian + 1,
      };

      const newMaterials = {
        ...materialsAvailable,
        ores: materialsAvailable.ore + totalTime * robotsAvailable.ore - blueprint.obsidianRobotCost.ore,
        clays: materialsAvailable.clay + totalTime * robotsAvailable.clay - blueprint.obsidianRobotCost.clay,
        obsidians: materialsAvailable.obsidian + totalTime * robotsAvailable.obsidian,
      };

      currMaxGeodes = Math.max(getMaxGeodes(blueprint, newRobots, newMaterials, time - totalTime, currMaxGeodes));
    }
  }

  if (robotsAvailable.clay < blueprint.obsidianRobotCost.clay) {
    const canBuildClayRobot = blueprint.clayRobotCost.ore <= materialsAvailable.ore;

    const timeUntilEnoughOre = Math.ceil((blueprint.clayRobotCost.ore - materialsAvailable.ore) / robotsAvailable.ore);

    const totalTime = 1 + (canBuildClayRobot ? 0 : timeUntilEnoughOre);

    if (time - totalTime > 3) {
      const newRobots = {
        ...robotsAvailable,
        clay: robotsAvailable.clay + 1,
      };

      const newMaterials = {
        ...materialsAvailable,
        ores: materialsAvailable.ore + totalTime * robotsAvailable.ore - blueprint.clayRobotCost.ore,
        clays: materialsAvailable.clay + totalTime * robotsAvailable.clay,
        obsidians: materialsAvailable.obsidian + totalTime * robotsAvailable.obsidian,
      };

      currMaxGeodes = Math.max(getMaxGeodes(blueprint, newRobots, newMaterials, time - totalTime, currMaxGeodes));
    }
  }

  if (robotsAvailable.ore < maxOreNeeded) {
    const canBuildOreRobot = blueprint.oreRobotCost.ore <= materialsAvailable.ore;

    const timeUntilEnoughOre = Math.ceil((blueprint.oreRobotCost.ore - materialsAvailable.ore) / robotsAvailable.ore);

    const totalTime = 1 + (canBuildOreRobot ? 0 : timeUntilEnoughOre);

    if (time - totalTime > 4) {
      const newRobots = {
        ...robotsAvailable,
        ore: robotsAvailable.ore + 1,
      };

      const newMaterials = {
        ...materialsAvailable,
        ores: materialsAvailable.ore + totalTime * robotsAvailable.ore - blueprint.oreRobotCost.ore,
        clays: materialsAvailable.clay + totalTime * robotsAvailable.clay,
        obsidians: materialsAvailable.obsidian + totalTime * robotsAvailable.obsidian,
      };

      currMaxGeodes = Math.max(getMaxGeodes(blueprint, newRobots, newMaterials, time - totalTime, currMaxGeodes));
    }
  }

  return currMaxGeodes;
};

export function part1(input: string): number {
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
    .map(blueprint => getMaxGeodes(blueprint, availableRobots, materials, 24, 0) * blueprint.id)
    .reduce((a, b) => a + b);
}
