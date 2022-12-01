// Advent of Code - Day 1 - Part One

export function sortedElfCalories(input: string): number[] {
  return input
    .split('\n\n')
    .reduce(
      (elfCalories, elf) => (elfCalories.push(elf.split('\n').reduce((sum, calories) => sum + parseInt(calories, 10), 0)), elfCalories),
      [] as number[]
    )
    .sort((a, b) => b - a);
}

export function part1(input: string): number {
  const elfCalories = sortedElfCalories(input);

  return elfCalories[0];
}
