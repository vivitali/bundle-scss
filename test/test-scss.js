const bundleScss = require('../dist/index');
const assert = require('assert');
const read = require('fs').readFileSync;
const rimraf = require('rimraf');

describe('bundle-scss', () => {
  rimraf.sync('./test/result.scss');
  it('Should concatenate SCSS into one and compare', done => {
    bundleScss(['./**/*.theme.scss'], './test/result.scss')
      .then(f => {
        assert.equal(f, read('./test/compare.scss', 'utf8'));
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });
});
