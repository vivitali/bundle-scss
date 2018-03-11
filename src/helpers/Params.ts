import { cwDir, isFile, readSync } from './fs-utils';
import { join } from 'path';
import { mainConst } from './constants';
import { logger } from './logger';
import { IParams } from '../interface/IParams';

export class Params {
  private mask: Array<string> | string;
  private dest: string;
  private sort: Array<string> | string;
  private packageConf: {
    bundleScss?: IParams;
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

  private readJson(filePath: string) {
    if (isFile(filePath)) {
      return JSON.parse(readSync(filePath));
    }
    logger(`${filePath} not found`);
    return {};
  }

  private mergeParam(): IParams {
    const packageConf = this.packageConf.bundleScss
      ? this.packageConf.bundleScss
      : {};
    return {
      mask: this.mask,
      dest: this.dest,
      sort: this.sort,
      ...packageConf,
      ...this.bundleConf,
    };
  }

  get param() {
    return this.mergedParams;
  }
}
