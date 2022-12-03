// Advent of Code - Day 3 - Part Two

import _ from 'lodash';

export function part2(input: string): number {
  const lines = input.split('\n').filter(Boolean);
  const groups = _.chunk(lines, 3);
  return groups.reduce((sum, group) => {
    const intersection = _.intersection(group[0].split(''), group[1].split(''), group[2].split(''))[0].charCodeAt(0);
    if (intersection >= 97 && intersection <= 123) {
      return sum + (intersection - 96);
    } else {
      return sum + (intersection - 38);
    }
  }, 0);
}
