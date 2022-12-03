// Advent of Code - Day 3 - Part One

import _ from 'lodash';

export function part1(input: string): number {
  return input.split('\n').reduce((sum, rucksack) => {
    if (!rucksack) return sum;
    const compartmentOne = rucksack.slice(0, rucksack.length / 2);
    const compartmentTwo = rucksack.slice(rucksack.length / 2);
    const intersection = _.intersection(compartmentOne.split(''), compartmentTwo.split(''))[0].charCodeAt(0);
    if (intersection >= 97 && intersection <= 123) {
      return sum + (intersection - 96);
    } else {
      return sum + (intersection - 38);
    }
  }, 0);
}
