const bundleScss = require('../dist/index');
const assert = require('assert');
const read = require('fs').readFileSync;
const rimraf = require('rimraf');

describe('bundle-scss', () => {
  rimraf.sync('./test/result.sass');
  it('Should concatenate SASS into one and compare', done => {
    bundleScss(['./**/*.theme.sass'], './test/result.sass')
      .then(f => {
        assert.equal(f, read('./test/compare.sass', 'utf8'));
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });
});
