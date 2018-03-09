import { writeFile, statSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { config } from './constants';

export const isFile = (f: string) => statSync(f).isFile();

export const readSync = (filePath: string) => readFileSync(filePath, 'utf8');

export const writeAsync = (path: string, content: string) => {
  return new Promise((res, rej) => {
    writeFile(resolve(path), content, error => {
      if (error) {
        return rej(error);
      }

      return res(content);
    });
  });
};

export const defineExtension = (filePath: string) => {
  const justScss = `${filePath}.${config.fileType}`;

  if (isFile(justScss)) {
    return justScss;
  }
  throw new Error(`⛔ ⛔ ⛔ No file for module ${filePath}`);
};
