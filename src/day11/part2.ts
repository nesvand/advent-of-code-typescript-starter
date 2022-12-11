// Advent of Code - Day 11 - Part Two

export type WorryLevel = number;
export type MonkeyStartingItems = WorryLevel[];
export type MonkeyOperationCallback = (old: WorryLevel) => WorryLevel;
export type MonkeyID = number;
export type MonkeyTestCallback = (level: WorryLevel) => MonkeyID;
export type Monkey = {
  id: MonkeyID;
  startingItems: MonkeyStartingItems;
  operation: MonkeyOperationCallback;
  test: MonkeyTestCallback;
  mod: number;
  inspections: number;
};

export function part2(input: string): number {
  const monkeys: Monkey[] = input
    .split('\n\n')
    .filter(Boolean)
    .map((monkeyDataString: string, id) => {
      const lines = monkeyDataString.split('\n');
      const monkeyStartingItemsStringArray = lines[1].match(/\d+/g)!;
      const startingItems = monkeyStartingItemsStringArray.map((item: string) => parseInt(item, 10));
      const [, monkeyOperationCallbackString] = /Operation: new = (.*)/g.exec(lines[2])!;
      const operation = (old: WorryLevel) => {
        const mappedOperationString = monkeyOperationCallbackString.split(' ');
        const param1 = mappedOperationString[0] === 'old' ? old : parseInt(mappedOperationString[0], 10);
        const param2 = mappedOperationString[2] === 'old' ? old : parseInt(mappedOperationString[2], 10);
        return mappedOperationString[1] === '+' ? param1 + param2 : param1 * param2;
      };
      const [modValueString] = lines[3].match(/\d+/g)!;
      const modValue = parseInt(modValueString, 10);
      const [trueMonkeyString] = lines[4].match(/\d+/g)!;
      const trueMonkey = parseInt(trueMonkeyString, 10) as MonkeyID;
      const [falseMonkeyString] = lines[5].match(/\d+/g)!;
      const falseMonkey = parseInt(falseMonkeyString, 10) as MonkeyID;
      const test = (level: WorryLevel) => {
        return level % modValue === 0 ? trueMonkey : falseMonkey;
      };

      return {
        id,
        startingItems,
        operation,
        test,
        mod: modValue,
        inspections: 0,
      };
    });

  const commonDivisor = monkeys.map(m => m.mod).reduce((mul, v) => mul * v);

  for (let round = 0; round < 10_000; round++) {
    for (const monkey of monkeys) {
      let item = monkey.startingItems.shift();
      while (item !== undefined) {
        item = monkey.operation(item);
        // item = Math.floor(item / 3);
        item = item % commonDivisor;
        const monkeyId = monkey.test(item);
        monkeys[monkeyId].startingItems.push(item);
        item = monkey.startingItems.shift();
        monkey.inspections++;
      }
    }
  }

  return monkeys
    .map(monkey => monkey.inspections)
    .sort((a, b) => Number(b - a))
    .slice(0, 2)
    .reduce((sum, i) => sum * Number(i), 1);
}
