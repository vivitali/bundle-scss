const bundleScss = require('../dist/index');
const assert = require('assert');
const read = require('fs').readFileSync;
const rimraf = require('rimraf');

describe('bundle-scss for sass files' , () => {
  rimraf.sync('./__tests__/result.sass');
  test('Should concatenate SASS into one and compare', async() => {
    const compiled = await bundleScss(['./**/*.theme.sass'], './__tests__/result.sass')
     expect(compiled).toEqual(read('./__tests__/compare.sass', 'utf8'))
  });
});
