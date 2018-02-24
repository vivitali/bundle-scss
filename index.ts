import { writeFile, statSync, readFileSync } from 'fs';
import { resolve, join, dirname } from 'path';
import * as globby from 'globby';
import { StringDecoder } from 'string_decoder';

const decoder = new StringDecoder('utf8');
const log = (info: Error | string) => console.log(info);
const isFile = (f: string) => statSync(f).isFile();

const removeImports = (content: string) =>
  content.replace(/@import ['"]([^'"]+)['"];/g, '');

const readSync = (filePath: string) => readFileSync(filePath, 'utf8');
const getUniqueScss = (files: Array<string>) => {
  const scssImports = files
    .map(file => {
      let baseDir = dirname(file);
      return getImports(readSync(file), baseDir);
    })
    .reduce((acc, curr) => acc.concat(curr), []);
  const uniqueArr = [...new Set(scssImports.map(el => el.path))];

  return [...uniqueArr, ...files];
};

function getImports(content: string, baseDir: string) {
  const regex = /@import ['"]([^'"]+)['"];/g;
  let imports = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    imports.push({
      path: defineExtension(join(baseDir, match[1])),
      stringToReplace: match[0],
    });
  }

  return imports;
}

function writeAsync(path: string, content: string) {
  return new Promise((res, rej) => {
    writeFile(resolve(path), content, error => {
      if (error) {
        return rej(error);
      }

      return res(content);
    });
  });
}

function defineExtension(filePath: string) {
  const justScss = filePath + '.scss';

  if (isFile(justScss)) {
    return justScss;
  }
  console.error(`⛔ ⛔ ⛔ No file for module ${filePath}`);
}

export = (mask: string[] | string, dest: string) => {
  const fullPath = join(process.cwd());
  if (!mask || !mask.length) {
    console.error('⛔ ⛔ ⛔ Please provide the src for concat method');
  }
  const searchMask = Array.isArray(mask) ? mask : [mask];
  globby(searchMask).then(paths => {
    const files = paths.map(file => join(fullPath, file));

    const unique = getUniqueScss(files);
    const buffers = unique.map(file => {
      return readFileSync(file);
    });
    const buff = Buffer.concat(buffers);
    let utfFormat = decoder.write(buff);

    if (dest) {
      log(`⏳ ⏳ ⏳ Saving result to ${dest}...`);
      writeAsync(dest, removeImports(utfFormat))
        .then(res => {
          log(`🚀 🚀 🚀 SAVED SUCCESSFULLY \nPlease check ${dest}`);
        })
        .catch(reason => {
          log(`⛔ ⛔ ⛔\n${reason}`);
        });
      return dest;
    }
    log('📁 Please provide destination option ');
  });
};
