// Advent of Code - Day 5 - Part Two

const instructionRegex = new RegExp(/\w{4}\s(\d+)\s\w{4}\s(\d+)\s\w{2}\s(\d+)/i);

export function part2(input: string): string {
  const lineGroups = input.split('\n\n');
  const lines = lineGroups[0].split('\n').slice(0, -1);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const mappedLines = lines.map(line => {
    const data = line.split('');
    const crate = [];
    for (let i = 1; i < data.length; i += 4) {
      crate.push(data[i] === ' ' ? undefined : data[i]);
    }
    return crate;
  });

  const crateStacks = [];

  for (let i = 0; i < mappedLines[0].length; i++) {
    for (let j = mappedLines.length - 1; j >= 0; j--) {
      if (!Array.isArray(crateStacks[i])) crateStacks[i] = [] as Array<string | undefined>;
      if (mappedLines[j][i]) crateStacks[i].push(mappedLines[j][i]);
    }
  }

  const instructions = lineGroups[1]
    .split('\n')
    .filter(Boolean)
    .map(line => {
      const [, op1, op2, op3] = instructionRegex.exec(line)!;
      return [parseInt(op1, 10), parseInt(op2, 10), parseInt(op3, 10)];
    });

  for (const instruction of instructions) {
    const [count, from, to] = instruction;
    crateStacks[to - 1].push(...crateStacks[from - 1].splice(-count));
  }

  return crateStacks.map(stack => stack[stack.length - 1]).join('');
}
