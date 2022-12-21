// Advent of Code - Day 21 - Part One

import { isNumber } from 'lodash';

export type Monkey = {
  value?: number;
  monkeys?: [Monkey, Monkey];
  operator?: string;
};

export type MonkeyMap = Record<string, Monkey>;

export function part1(input: string): number {
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

  // for (const [monkeyName, monkey] of Object.entries(monkeys)) {
  //   console.log(monkeyName, JSON.stringify(monkey, null, 2));
  // }

  while (!isNumber(rootMonkey.value)) {
    for (const [, monkey] of Object.entries(monkeys)) {
      if (isNumber(monkey.value)) continue;

      const [monkeyA, monkeyB] = monkey.monkeys ?? [];
      // console.log(monkeyA, monkeyB);
      if (!monkeyA || !monkeyB) throw new Error('invalid graph, monkeys not found');

      if (isNumber(monkeyA.value) && isNumber(monkeyB.value)) {
        monkey.value = eval(`${monkeyA.value} ${monkey.operator} ${monkeyB.value}`);
        if (!isNumber(monkey.value)) throw new Error('invalid operation');
      }
    }
  }

  return rootMonkey.value;
}
