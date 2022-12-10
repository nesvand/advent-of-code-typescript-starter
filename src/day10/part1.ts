// Advent of Code - Day 10 - Part One

export type OpCodeType = 'noop' | 'addx';

export interface OpCodeBase {
  type: OpCodeType;
}

export interface Noop extends OpCodeBase {
  type: 'noop';
}

export interface Addx extends OpCodeBase {
  type: 'addx';
  x: number;
}

export type OpCodes = Noop | Addx;

export const isOpCode = (opcode: any): opcode is OpCodeType => {
  return ['noop', 'addx'].indexOf(opcode) !== -1;
};

export const inputToOpCode = (opcode: string): OpCodes => {
  const args = opcode.split(' ');

  if (!isOpCode(args[0])) throw new Error(`Unknown opcode: ${args[0]}`);

  switch (args[0]) {
    case 'noop':
      return { type: args[0] };
    case 'addx':
      return { type: args[0], x: parseInt(args[1], 10) };
    default:
      throw new Error(`Unknown opcode: ${args[0]}`);
  }
};

const interestingCycles = [20, 60, 100, 140, 180, 220];

export function part1(input: string): number {
  const opcodes = input.split('\n').filter(Boolean).map(inputToOpCode);
  const interestingCycleValues: number[] = [];

  let xRegister = 1;
  let cycle = 0;
  let opcode = opcodes.shift();
  let executing = -1;
  while (opcode) {
    if (interestingCycles.indexOf(cycle + 1) !== -1) {
      interestingCycleValues.push(xRegister * (cycle + 1));
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

  return interestingCycleValues.reduce((a, b) => a + b, 0);
}
