import * as f from './f';

export { f };
export const int = (x: string): number => parseInt(x, 10);
export const num = (x: string): number => parseFloat(x);
export const str = (x: any): string => x.toString();
export const bool = (x: any): boolean => !!x;

export const arr = <T>(n: number, fn: (i: number) => T) => Array.from(new Array(n), (_, i) => fn(i));

export const print = console.log;

export interface InputOptions {
  strip?: boolean;
}

export class Input {
  constructor(private content: string) {}

  public static from(input: string, strip = true): Input {
    const preprocess = (data: string) => (strip ? data.trimEnd() : data);
    return new Input(preprocess(input));
  }

  public all(): string {
    return this.content;
  }

  public lines(): string[] {
    return this.content.split('\n');
  }

  public forLines<T>(fn: (input: Input) => T): T[] {
    return this.lines().map(line => fn(new Input(line)));
  }

  public tokens(separator = /[\s\n]+/g): string[] {
    return this.content.split(separator);
  }

  public lineTokens(lineSeparator = /\n/g, tokenSeparator = /[\s]+/g): string[][] {
    return this.content.split(lineSeparator).map(line => line.split(tokenSeparator));
  }

  public ints(): number[] {
    return this.tokens().map(int);
  }

  public nums(): number[] {
    return this.tokens().map(num);
  }

  public digitGrid(): number[][] {
    return this.lines().map(line => line.split('').map(int));
  }

  public charGrid(): string[][] {
    return this.lines().map(line => line.split(''));
  }

  public parse<T>(parser: f.Parser<T>): T {
    return parser(this.content);
  }
}

export type Point = [number, number];
export type Point3D = [number, number, number];

export const GridDirections = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const GridDirectionsWithoutDiagonals = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

export function* iterateGrid<T>(grid: T[][]) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      yield [i, j];
    }
  }
}

export function* neighbors(point: Point, includeDiagonal = true): Generator<Point> {
  const directions = includeDiagonal ? GridDirections : GridDirectionsWithoutDiagonals;
  for (const [di, dj] of directions) {
    yield [point[0] + di, point[1] + dj];
  }
}

export function mapGrid<S, T>(grid: S[][], fn: (value: S, point: Point) => T): T[][] {
  return grid.map((row, i) => row.map((value, j) => fn(value, [i, j])));
}

export function buildGrid(point: [number, number][]) {
  const maxRow = point.reduce((max, [i, _]) => Math.max(max, i), -Infinity);
  const maxCol = point.reduce((max, [_, j]) => Math.max(max, j), -Infinity);
  const grid = arr(maxRow + 1, () => arr(maxCol + 1, () => false));

  for (const [i, j] of point) {
    grid[i][j] = true;
  }

  return grid;
}

export function sum(arr: number[]): number {
  return arr.reduce((sum, n) => sum + n, 0);
}

export function prod(arr: number[]): number {
  return arr.reduce((product, n) => product * n, 1);
}

export function min(arr: number[]): number {
  return arr.reduce((min, n) => Math.min(min, n), Infinity);
}

export function max(arr: number[]): number {
  return arr.reduce((max, n) => Math.max(max, n), -Infinity);
}
