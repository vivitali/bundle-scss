export declare class Params {
  private mask;
  private dest;
  private sort;
  private packageConf;
  private bundleConf;
  private mergedParams;
  constructor(
    mask: Array<string> | string,
    dest: Array<string> | string,
    sort: Array<string> | string,
    config: boolean
  );
  private readJson(filePath);
  private mergeParam();
  readonly param: IParams;
}
