// Advent of Code - Day 11 - Part One

export type WorryLevel = number;
export type MonkeyStartingItems = WorryLevel[];
export type MonkeyOperationCallback = (old: WorryLevel) => WorryLevel;
export type MonkeyID = number;
export type MonkeyTestCallback = (level: WorryLevel) => MonkeyID;
export type Monkey = {
  id: MonkeyID;
  startingItems: MonkeyStartingItems;
  modValue: number;
  operation: MonkeyOperationCallback;
  test: MonkeyTestCallback;
  inspections: number;
};

export function part1(input: string): number {
  const monkeys: Monkey[] = input
    .split('\n\n')
    .filter(Boolean)
    .map((monkeyDataString: string, id) => {
      const lines = monkeyDataString.split('\n');
      const monkeyStartingItemsStringArray = lines[1].match(/\d+/g)!;
      const startingItems = monkeyStartingItemsStringArray.map((item: string) => parseInt(item, 10));
      const [, monkeyOperationCallbackString] = /Operation: new = (.*)/g.exec(lines[2])!;
      const operation = (old: WorryLevel) => {
        const mappedOperationString = monkeyOperationCallbackString.split(' ').map((item: string) => {
          if (item === 'old') return old;
          if (['*', '+'].includes(item)) return item;
          return parseInt(item, 10);
        });
        return eval(mappedOperationString.join(' ')) as WorryLevel;
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
        modValue,
        operation,
        test,
        inspections: 0,
      };
    });

  for (let round = 0; round < 20; round++) {
    for (const monkey of monkeys) {
      let item = monkey.startingItems.shift();
      while (item !== undefined) {
        monkey.inspections += 1;
        item = monkey.operation(item);
        item = Math.floor(item / 3);
        const monkeyId = monkey.test(item);
        // console.log(`throwing to monkey ${monkeyId}`);
        monkeys[monkeyId].startingItems.push(item);
        item = monkey.startingItems.shift();
      }
    }
  }

  return monkeys
    .map(monkey => monkey.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((sum, i) => sum * i, 1);
}
