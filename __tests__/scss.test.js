const bundleScss = require('../dist/index');
const assert = require('assert');
const read = require('fs').readFileSync;
const rimraf = require('rimraf');

describe('bundle-scss for scss files', () => {
  rimraf.sync('./__tests__/result.scss');
  test('Should concatenate SCSS into one and compare', async() => {
    const compiled = await bundleScss(['./**/*.theme.scss'], './test/result.scss')
     expect(compiled).toEqual(read('./__tests__/compare.scss', 'utf8'))
  });
});
