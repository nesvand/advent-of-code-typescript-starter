// Advent of Code - Day 3 - Part One
import { intersection } from 'remeda';

export function part1(input: string): number {
  return input.split('\n').reduce((sum, rucksack) => {
    if (!rucksack) return sum;
    const compartmentOne = rucksack.slice(0, rucksack.length / 2);
    const compartmentTwo = rucksack.slice(rucksack.length / 2);
    const inter = intersection(compartmentOne.split(''), compartmentTwo.split(''))[0].charCodeAt(0);
    if (inter >= 97 && inter <= 123) {
      return sum + (inter - 96);
    } else {
      return sum + (inter - 38);
    }
  }, 0);
}
