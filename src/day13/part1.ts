// Advent of Code - Day 13 - Part One

export type ArrayOfNumberOrNumber = Array<ArrayOfNumberOrNumber | number> | number;

export enum Order {
  Unknown,
  Correct,
  Incorrect,
}

export function comparePairs(left: ArrayOfNumberOrNumber, right: ArrayOfNumberOrNumber): Order {
  if (typeof left === 'number' && typeof right === 'number') {
    return left < right ? Order.Correct : left > right ? Order.Incorrect : Order.Unknown;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length && i < right.length; i++) {
      const order = comparePairs(left[i], right[i]);
      if (order !== Order.Unknown) return order;
    }

    if (left.length < right.length) {
      return Order.Correct;
    }

    if (left.length > right.length) {
      return Order.Incorrect;
    }

    return Order.Unknown;
  }

  return comparePairs(typeof left === 'number' ? [left] : left, typeof right === 'number' ? [right] : right);
}

export function part1(input: string): number {
  const pairs = input
    .trim()
    .split('\n\n')
    .map(pair => pair.split('\n').map(line => JSON.parse(line) as ArrayOfNumberOrNumber));

  let output = 0;

  for (const [i, [left, right]] of pairs.entries()) {
    if (comparePairs(left, right) === Order.Correct) output += i + 1;
  }

  return output;
}
