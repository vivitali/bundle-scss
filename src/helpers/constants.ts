export const mainConst = {
  defaultPriority: ['theme-variable', 'variable', 'mixin'],
  scssImportRegex: /@import ['"]([^'"]+)['"];/g,
  sassImportRegex: /@import \S+/g,
  parseFilePathRegex: /^.*[\\\/]/,
  commentsLine: /^\/\/|^\/\*|^\*/,
  fileType: 'scss',
  packageJsonFile: 'package.json',
  bundleConfFile: '.bundle-style-conf.json',
};
