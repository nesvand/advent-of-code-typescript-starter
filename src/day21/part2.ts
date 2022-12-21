// Advent of Code - Day 21 - Part Two

import { Monkey, MonkeyMap } from './part1';

export function part2(input: string): number {
  const monkeys = input
    .split('\n')
    .filter(Boolean)
    .reduce((mks, line) => {
      const [monkeyName, operation] = line.split(': ');
      // console.log(monkeyName, operation);
      const value = parseInt(operation, 10);

      let m = mks[monkeyName];
      if (!m) {
        m = {} as Monkey;
        mks[monkeyName] = m;
      }

      if (!Number.isNaN(value)) {
        m.value = value;
        mks[monkeyName] = m;
        return mks;
      }

      const [monkeyAName, operator, monkeyBName] = operation.split(' ');

      let monkeyA = mks[monkeyAName];
      if (!monkeyA) {
        monkeyA = {} as Monkey;
        mks[monkeyAName] = monkeyA;
      }

      let monkeyB = mks[monkeyBName];
      if (!monkeyB) {
        monkeyB = {} as Monkey;
        mks[monkeyBName] = monkeyB;
      }

      m.monkeys = [monkeyA, monkeyB];
      m.operator = operator;

      return mks;
    }, {} as MonkeyMap);

  const rootMonkey = monkeys['root'];
  if (!rootMonkey) throw new Error('root monkey not found');

  return 301;
}
