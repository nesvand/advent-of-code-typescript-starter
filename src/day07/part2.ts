// Advent of Code - Day 7 - Part Two

import { calculateDirectorySize, Directory, isDirectory, parseInput } from './part1';

const TOTAL_DISK_SPACE = 70_000_000;
const NEEDED_DISK_SPACE = 30_000_000;

export function part2(input: string): number {
  const filesystem = parseInput(input);
  calculateDirectorySize(filesystem);
  const directorySizes: number[] = [];
  function dive(dir: Directory) {
    dir.files.filter(isDirectory).forEach(dive);
    directorySizes.push(dir.size);
  }
  dive(filesystem);

  directorySizes.sort((a, b) => a - b);

  const totalUsedSpace = filesystem.size;
  const minimumToDelete = NEEDED_DISK_SPACE - (TOTAL_DISK_SPACE - totalUsedSpace);
  for (const size of directorySizes) {
    if (size > minimumToDelete) {
      return size;
    }
  }

  return 0;
}
