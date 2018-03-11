export declare class Sort {
  pattern: Array<string>;
  hash: any;
  constructor(pattern: Array<string> | string);
  private comparator(a, b);
  sort(sortable: Array<string>): Array<string>;
}
