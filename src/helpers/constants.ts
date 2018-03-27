export const mainConst = {
  defaultPriority: ['theme-variable', 'variable', 'mixin'],
  scssImportRegex: /@import ['"]([^'"]+)['"];/g,
  sassImportRegex: /@import ['"]([^'"]+)['"]/g,
  parseFilePathRegex: /^.*[\\\/]/,
  fileType: 'scss',
  packageJsonFile: 'package.json',
  bundleConfFile: '.bundle-style-conf.json',
};
