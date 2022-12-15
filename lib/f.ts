import { FM } from './fm';

export type Parser<T> = (input: string) => T;

export const str = (): Parser<string> => (input: string) => input;
export const int = (): Parser<number> => (input: string) => parseInt(input, 10);
export const num = (): Parser<number> => (input: string) => parseFloat(input);
export const bool = (): Parser<boolean> => (input: string) => !!input;
export const chrs = (): Parser<string[]> => (input: string) => input.split('');
export const split =
  <T>(delimiter: string, p: Parser<T>): Parser<T[]> =>
  (input: string) =>
    input.split(delimiter).map(p);
export const cl = <T>(p: Parser<T>): Parser<T[]> => split(',', p);
export const nl = <T>(p: Parser<T>): Parser<T[]> => split('\n', p);
export const nlnl = <T>(p: Parser<T>): Parser<T[][]> => split('\n\n', split('\n', p));
export const tok =
  <T>(p: Parser<T>): Parser<T[]> =>
  (input: string) =>
    input.split(/\s+/g).map(p);
export const dis =
  <L, R, T>(delimiter: string, left: Parser<L>, right: Parser<R>, fn: (left: L, right: R) => T): Parser<T> =>
  (input: string) => {
    const index = input.indexOf(delimiter);

    if (index === -1) {
      throw new Error(`Failed to find delimiter ${delimiter} in ${input}`);
    }

    return fn(left(input.slice(0, index)), right(input.slice(index + delimiter.length)));
  };
export const dGrid = (): Parser<number[][]> => nl(split('', int()));
export const cGrid = (): Parser<string[][]> => nl(chrs());

export function match<T>(parts: TemplateStringsArray, ...fms: FM<T>[]) {
  let regex = '';
  for (const [i, part] of parts.entries()) {
    regex += part;
    const fm: FM<T> = fms[i];
    if (fm) {
      regex += fm.regex;
    }
  }

  return (input: string) => {
    const matches = input.match(new RegExp(regex));
    if (!matches) throw new EvalError('No matches found for input');

    const res: Record<string, T> = {};
    for (const [i, match] of matches.slice(1, fms.length + 1).entries()) {
      const fm = fms[i];
      res[fm.fieldName] = fm.parser(match);
    }

    return res;
  };
}
