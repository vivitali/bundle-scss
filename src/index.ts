import { readFileSync } from 'fs';
import { join } from 'path';
import * as globby from 'globby';
import { StringDecoder } from 'string_decoder';
import { Sort } from './helpers/Sort';
import {
  cwDir,
  fileType,
  resolveDirDest,
  writeAsync,
} from './helpers/fs-utils';
import {
  getUniqueStyleFiles,
  removeImports,
} from './helpers/file-content-utils';
import { logger } from './helpers/logger';
import { Params } from './helpers/Params';
import { IParams } from './interface/IParams';

const decoder = new StringDecoder('utf8');

export = (
  mask: string[] | string,
  dest: string,
  sort: string[] | string,
  config: boolean
) => {
  const params: IParams = new Params(mask, dest, sort, config).param;

  if (!params.mask || !params.mask.length) {
    throw new Error('Please provide the src for concat method');
  }

  resolveDirDest(params.dest);

  const searchMask = Array.isArray(params.mask) ? params.mask : [params.mask];

  return globby(searchMask).then(paths => {
    const files = paths.map(file => join(cwDir(), file));
    const fileExtension = fileType(params.dest);
    const unique = getUniqueStyleFiles(files, fileExtension);
    const sorted = new Sort(params.sort).sort(unique);
    const buffers = sorted.map(file => {
      return readFileSync(file);
    });
    const buff = Buffer.concat(buffers);
    let utfFormat = decoder.write(buff);

    if (params.dest) {
      logger(`Saving result to ${params.dest}...`);
      const utf = removeImports(utfFormat, fileExtension);
      return writeAsync(params.dest, utf)
        .then(() => {
          logger(`SAVED SUCCESSFULLY! Please check ${params.dest}`);
          return utf;
        })
        .catch(reason => {
          logger(`\n${reason}`);
        });
    }
    logger('Please provide destination option');
    throw new Error('Please provide destination option');
  });
};
