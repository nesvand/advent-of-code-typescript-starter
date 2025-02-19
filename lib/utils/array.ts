export const sort = (values: number[]) => values.sort((a, b) => a - b);
export const sortby = <T>(values: T[], by: (v: T) => number) => values.sort((a, b) => by(a) - by(b));

export const sum = (a: number[]) => a.reduce((sum, n) => sum + n, 0);
export const product = (a: number[]) => a.reduce((p, n) => p * n, 1);
export const max = (a: number[]) => Math.max(...a);

export const isArray = (values: unknown): values is unknown[] => Array.isArray(values);

export const lastIndex = <T>(arr: T[]): number => arr.length - 1;
export const lastItem = <T>(arr: T[]): T => arr[lastIndex(arr) - 1];
export const lastItems = <T>(arr: T[], n: number): T[] => arr.slice(-n);

export const asNumbers = <T>(arr: T[]): number[] => arr.map(v => Number(v));

export const from = <T = undefined>(size: number, creator?: (v: T, k: number) => T): T[] => {
  return Array.from({ length: size }, creator ?? (() => undefined as unknown as T));
};

export const zip = <T>(arr1: T[], arr2: T[]): [T | undefined, T | undefined][] => {
  const maxLength = Math.max(arr1.length, arr2.length);

  return from(maxLength, (_, i) => [arr1[i], arr2[i]]);
};

export const splitOn = <T>(arr: T[], predicate: (v: T, i: number) => boolean): T[][] => {
  return arr.reduce(
    (chunks, item, i) => {
      if (predicate(item, i)) {
        chunks.push([]);
      } else {
        lastItem(chunks).push(item);
      }

      return chunks;
    },
    [[]] as T[][]
  );
};

export const chunk = <T>(arr: T[], size: number): T[][] => {
  return arr.reduce((chunks, item) => {
    const currentChunk = lastItem(chunks);

    if (isArray(currentChunk) && currentChunk.length < size) {
      currentChunk.push(item);
    } else {
      chunks.push([item]);
    }

    return chunks;
  }, [] as T[][]);
};

export const rollingWindow = <T>(arr: T[], size: number): T[][] => {
  if (size <= 0 || arr.length < size) return [] as T[][];

  const result: T[][] = [];

  for (let i = 0; i < arr.length - size + 1; i++) {
    result.push(arr.slice(i, i + size));
  }

  return result;
};
