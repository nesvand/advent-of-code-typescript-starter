// Advent of Code - Day 10 - Part Two
import { chunk } from 'remeda';

import { inputToOpCode } from './part1';

export function part2(input: string): string {
  const opcodes = input.split('\n').filter(Boolean).map(inputToOpCode);
  const visualOutput: string[] = [];

  let xRegister = 1;
  let cycle = 0;
  let opcode = opcodes.shift();
  let executing = -1;
  while (opcode) {
    const lineIndex = cycle % 40;
    if (lineIndex === xRegister || lineIndex === xRegister - 1 || lineIndex === xRegister + 1) {
      visualOutput.push('#');
    } else {
      visualOutput.push('.');
    }

    switch (opcode.type) {
      case 'noop':
        opcode = opcodes.shift();
        break;
      case 'addx':
        if (cycle === executing) {
          xRegister += opcode.x;
          opcode = opcodes.shift();
          executing = -1;
          break;
        }
        executing = cycle + 1;
        break;
    }

    cycle++;
  }

  const output = chunk(visualOutput, 40)
    .map(c => c.join(''))
    .join('\n');

  console.log(output);

  return output;
}
