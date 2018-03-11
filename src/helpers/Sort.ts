import { IHash } from '../interface/IHash';

export class Sort {
  public pattern: Array<string>;
  public hash: any;

  constructor(pattern: Array<string> | string) {
    this.pattern = Array.isArray(pattern) ? pattern : [pattern];
    this.hash = this.pattern.reduce(
      (acc: IHash, item: string, i) => {
        acc[item] = i;
        return acc as IHash;
      },
      {} as IHash
    );
  }

  private comparator(a: string, b: string) {
    const aEl = this.pattern.find(el => a.includes(el));
    const bEl = this.pattern.find(el => b.includes(el));
    if (!(aEl in this.hash)) {
      // checks if name is not in the pattern
      return 1;
    }
    if (!(bEl in this.hash)) {
      // if true - place that names to the end
      return -1;
    }
    return this.hash[aEl] - this.hash[bEl];
  }

  public sort(sortable: Array<string>): Array<string> {
    return sortable.sort(this.comparator.bind(this));
  }
}
