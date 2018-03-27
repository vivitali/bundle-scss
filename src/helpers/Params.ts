import { cwDir, fileType, isFile, readSync } from './fs-utils';
import { join } from 'path';
import { mainConst } from './constants';
import { logger } from './logger';
import { IParams } from '../interface/IParams';

export class Params {
  private mask: Array<string> | string;
  private dest: string;
  private sort: Array<string> | string;
  private packageConf: {
    bundleStyle?: IParams;
  };
  private bundleConf: IParams;
  private mergedParams: IParams;

  constructor(
    mask: Array<string> | string,
    dest: string,
    sort: Array<string> | string,
    config: boolean
  ) {
    this.mask = mask;
    this.dest = dest;
    this.sort = sort || mainConst.defaultPriority;
    this.packageConf = config
      ? this.readJson(join(cwDir(), mainConst.packageJsonFile))
      : {};
    this.bundleConf = config
      ? this.readJson(join(cwDir(), mainConst.bundleConfFile))
      : {};
    this.mergedParams = this.mergeParam();
  }

  compareOutputInputExtensions(param: IParams): boolean {
    const maskExtension = Array.isArray(param.mask)
      ? param.mask.map(el => fileType(el))
      : [fileType(param.mask)];
    return maskExtension.every(el => el === fileType(param.dest));
  }

  private readJson(filePath: string) {
    if (isFile(filePath)) {
      logger(`Reading params from ${filePath}`);
      return JSON.parse(readSync(filePath));
    }
    logger(`${filePath} not found`);
    return {};
  }

  private mergeParam(): IParams {
    const packageConf = this.packageConf.bundleStyle
      ? this.packageConf.bundleStyle
      : {};
    const param = {
      mask: this.mask,
      dest: this.dest,
      sort: this.sort,
      ...packageConf,
      ...this.bundleConf,
    };
    if (!this.compareOutputInputExtensions(param)) {
      logger('File extensions mask and dest should be the same');
    }
    return param;
  }

  get param() {
    return this.mergedParams;
  }
}
