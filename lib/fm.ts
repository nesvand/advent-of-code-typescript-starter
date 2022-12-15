export type Parser<T> = (arg0: string) => T;
export type FM<T> = {
  regex: string;
  parser: Parser<T>;
  fieldName: string;
};

export class fm<T> {
  private _parser: Parser<T>;
  private _regex: string;

  constructor(parser: Parser<T>, regex: string) {
    this._parser = parser;
    this._regex = regex;
  }

  public static num() {
    return new fm(v => parseInt(v, 10), '(-?\\d+)');
  }

  public as(fieldName: string): FM<T> {
    return {
      regex: this._regex,
      parser: this._parser,
      fieldName,
    };
  }
}
