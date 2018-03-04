import { writeFile, statSync, readFileSync } from 'fs';
import { resolve, join, dirname } from 'path';
import * as globby from 'globby';
import { StringDecoder } from 'string_decoder';
import { config } from './helpers/constants';
import { Sort } from "./helpers/Sort";

const decoder = new StringDecoder('utf8');
const log = (info: Error | string) => console.log(info);
const isFile = (f: string) => statSync(f).isFile();

const removeImports = (content: string) =>
  content.replace(config.sassImportRegex, '');

const readSync = (filePath: string) => readFileSync(filePath, 'utf8');
const getUniqueScss = (files: Array<string>) => {
  const scssImports = files
    .map(file => {
      let baseDir = dirname(file);
      return getImports(readSync(file), baseDir);
    })
    .reduce((acc, curr) => acc.concat(curr), []);
  const allImports = [...scssImports, ...files];

  return [...new Set(allImports)];
};

const getImports = (
  content: string,
  baseDir: string,
  imports: Array<string> = []
) => {
  let match;
  while ((match = config.sassImportRegex.exec(content)) !== null) {
    const pathFile = defineExtension(join(baseDir, match[1]));
    if (!imports.some(el => el === pathFile)) {
      imports.push(pathFile);
      getImports(readSync(pathFile), dirname(pathFile), imports);
    }
  }

  return imports;
};

const writeAsync = (path: string, content: string) => {
  return new Promise((res, rej) => {
    writeFile(resolve(path), content, error => {
      if (error) {
        return rej(error);
      }

      return res(content);
    });
  });
};

const defineExtension = (filePath: string) => {
  const justScss = filePath + '.scss';

  if (isFile(justScss)) {
    return justScss;
  }
  throw new Error(`⛔ ⛔ ⛔ No file for module ${filePath}`);
};

export = (mask: string[] | string, dest: string, sort:string[] = config.defaultPriority ) => {
  const fullPath = join(process.cwd());
  console.log(sort, '---------');
  const sortInstance = new Sort(sort);
  if (!mask || !mask.length) {
    throw new Error('⛔ ⛔ ⛔ Please provide the src for concat method');
  }
  const searchMask = Array.isArray(mask) ? mask : [mask];
  return globby(searchMask).then(paths => {
    const files = paths.map(file => join(fullPath, file));

    const unique = getUniqueScss(files);
    console.log(unique, '============');
    const sorted = sortInstance.sort(unique);
    console.log(sorted, '============');
    const buffers = sorted.map(file => {
      return readFileSync(file);
    });
    const buff = Buffer.concat(buffers);
    let utfFormat = decoder.write(buff);

    if (dest) {
      log(`⏳ ⏳ ⏳ Saving result to ${dest}...`);
      const utf = removeImports(utfFormat);
      return writeAsync(dest, utf)
        .then(() => {
          log(`🚀 🚀 🚀 SAVED SUCCESSFULLY \nPlease check ${dest}`);
          return utf;
        })
        .catch(reason => {
          log(`⛔ ⛔ ⛔\n${reason}`);
        });
    }
    log('📁 Please provide destination option ');
    throw new Error('📁 Please provide destination option ');
  });
};
