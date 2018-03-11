import { cwDir, readSync } from './fs-utils';
import { join } from 'path';
import { mainConst } from './constants';
import { logger } from './logger';

export class Params {
  private mask: Array<string> | string;
  private dest: Array<string> | string;
  private sort: Array<string> | string;
  private packageConf: {
    bundleScss?: IParams;
  };
  private bundleConf: IParams;
  private mergedParams: IParams;

  constructor(
    mask: Array<string> | string,
    dest: Array<string> | string,
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

  private readJson(filePath) {
    if (filePath) {
      const content = JSON.parse(readSync(filePath));
      console.warn(content, '-+-+-+-+_-+-+');
      return content;
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
