export declare class Sort {
  patternArr: Array<string>;
  hash: any;
  constructor(pattern: Array<string>);
  private comparator(a, b);
  sort(sortable: Array<string>): Array<string>;
}
