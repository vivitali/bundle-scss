import { mainConst } from './constants';
import { defineExtension, readSync } from './fs-utils';
import { dirname, join } from 'path';

export const removeImports = (content: string, fileType: string) => {
  const regex =
    fileType === 'scss' ? mainConst.scssImportRegex : mainConst.sassImportRegex;
  return content.replace(regex, '');
};

export const getUniqueStyleFiles = (
  files: Array<string>,
  fileExtension: string
) => {
  const imports = files
    .map(file => {
      let baseDir = dirname(file);
      return getImports(readSync(file), baseDir, fileExtension);
    })
    .reduce((acc, curr) => acc.concat(curr), []);
  const allImports = [...imports, ...files];

  return [...new Set(allImports)];
};

export const getImports = (
  content: string,
  baseDir: string,
  fileExtension: string,
  imports: Array<string> = []
) => {
  const regex =
    fileExtension === 'scss' ? /@import ['"]([^'"]+)['"];/g : /@import (\S+)/g;
  let match;
  let fileContent = content
    .split('\n')
    .filter(line => !/^\/\/|^\/\*|^\*/.test(line.trim()))
    .join('\n');

  while ((match = regex.exec(fileContent)) !== null) {
    const pathFile = defineExtension(join(baseDir, match[1]), fileExtension);
    imports.push(pathFile);
    getImports(readSync(pathFile), dirname(pathFile), fileExtension, imports);
  }

  return imports;
};
