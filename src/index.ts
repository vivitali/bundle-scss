import { readFileSync } from 'fs';
import { join } from 'path';
import * as globby from 'globby';
import { StringDecoder } from 'string_decoder';
import { Sort } from './helpers/Sort';
import { cwDir, resolveDirDest, writeAsync } from './helpers/fs-utils';
import { getUniqueScss, removeImports } from './helpers/file-content-utils';
import { logger } from './helpers/logger';
import { Params } from './helpers/Params';

const decoder = new StringDecoder('utf8');

export = (
  mask: string[] | string,
  dest: string,
  sort: string[] | string,
  config: boolean
) => {
  const params = new Params(mask, dest, sort, config).param;

  if (!params.mask || !params.mask.length) {
    throw new Error('⛔ ⛔ ⛔ Please provide the src for concat method');
  }

  resolveDirDest(params.dest);

  const searchMask = Array.isArray(params.mask) ? params.mask : [params.mask];

  return globby(searchMask).then(paths => {
    const files = paths.map(file => join(cwDir(), file));

    const unique = getUniqueScss(files);
    const sorted = new Sort(params.sort).sort(unique);
    const buffers = sorted.map(file => {
      return readFileSync(file);
    });
    const buff = Buffer.concat(buffers);
    let utfFormat = decoder.write(buff);

    if (dest) {
      logger(`⏳ ⏳ ⏳ Saving result to ${dest}  ...`);
      const utf = removeImports(utfFormat);
      return writeAsync(dest, utf)
        .then(() => {
          logger(`🚀 🚀 🚀 SAVED SUCCESSFULLY \nPlease check ${dest}`);
          return utf;
        })
        .catch(reason => {
          logger(`⛔ ⛔ ⛔\n${reason}`);
        });
    }
    logger('📁 Please provide destination option ');
    throw new Error('📁 Please provide destination option ');
  });
};
