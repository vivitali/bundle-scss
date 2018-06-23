import { IParams } from '../interface/IParams';
export declare class Params {
  private mask;
  private dest;
  private sort;
  private packageConf;
  private bundleConf;
  private mergedParams;
  constructor(
    mask: Array<string> | string,
    dest: string,
    sort: Array<string> | string,
    config: boolean
  );
  compareOutputInputExtensions(param: IParams): boolean;
  private readJson;
  private mergeParam;
  readonly param: IParams;
}
