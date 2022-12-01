// Advent of Code - Day 1 - Part One

export function sortedElfCalories(input: string): number[] {
  let i = 0;
  return input
    .split('\n')
    .reduce((map, calories) => {
      const cal = parseInt(calories, 10);
      if (Number.isNaN(cal)) {
        i++;
        return map;
      }
      map[i] = (map[i] ?? 0) + cal;
      return map;
    }, [] as number[])
    .sort((a, b) => a - b);
}

export function part1(input: string): number {
  const elfCalories = sortedElfCalories(input);

  return elfCalories[elfCalories.length - 1];
}
