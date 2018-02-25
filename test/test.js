const bundleScss = require('../index');
const assert = require('assert');
const read = require('fs').readFileSync;
const rimraf = require('rimraf');

describe('Concatenate', () => {
  rimraf.sync('./test/result.scss');
  it('scss into one and compare', (done) => {
    bundleScss(["./**/*.theme.scss"], './test/result.scss').then(f => {
      assert.equal(f, read('./test/compare.scss', 'utf8'));
      done()
    }).catch((err)=>{console.log(err)})
  })
});