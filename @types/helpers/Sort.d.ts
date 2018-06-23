export declare class Sort {
  pattern: Array<string>;
  hash: any;
  constructor(pattern: Array<string> | string);
  private comparator;
  sort(sortable: Array<string>): Array<string>;
}
