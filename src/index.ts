import { readFileSync } from 'fs';
import { join } from 'path';
import * as globby from 'globby';
import { StringDecoder } from 'string_decoder';
import { config } from './helpers/constants';
import { Sort } from './helpers/Sort';
import {
  fullCurrentPath,
  resolveDirDest,
  writeAsync,
} from './helpers/fs-utils';
import { getUniqueScss, removeImports } from './helpers/file-content-utils';
import { logger } from './helpers/logger';

const decoder = new StringDecoder('utf8');

export = (
  mask: string[] | string,
  dest: string,
  sort: string[] = config.defaultPriority
) => {
  const sortOrder = Array.isArray(sort) ? sort : [sort];
  const sortInstance = new Sort(sortOrder);
  if (!mask || !mask.length) {
    throw new Error('⛔ ⛔ ⛔ Please provide the src for concat method');
  }
  const searchMask = Array.isArray(mask) ? mask : [mask];

  resolveDirDest(dest);

  return globby(searchMask).then(paths => {
    const files = paths.map(file => join(fullCurrentPath(), file));

    const unique = getUniqueScss(files);
    const sorted = sortInstance.sort(unique);
    const buffers = sorted.map(file => {
      return readFileSync(file);
    });
    const buff = Buffer.concat(buffers);
    let utfFormat = decoder.write(buff);

    if (dest) {
      logger(`⏳ ⏳ ⏳ Saving result to ${dest}...`);
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
