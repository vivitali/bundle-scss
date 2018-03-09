import { config } from './constants';
import { defineExtension, readSync } from './fs-utils';
import { dirname, join } from 'path';

export const removeImports = (content: string) =>
  content.replace(config.sassImportRegex, '');

export const getUniqueScss = (files: Array<string>) => {
  const scssImports = files
    .map(file => {
      let baseDir = dirname(file);
      return getImports(readSync(file), baseDir);
    })
    .reduce((acc, curr) => acc.concat(curr), []);
  const allImports = [...scssImports, ...files];

  return [...new Set(allImports)];
};

export const getImports = (
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
