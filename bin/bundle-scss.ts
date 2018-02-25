#!/usr/bin/env node

'use strict';

const app = require('commander');
const cfg = require('../package.json');
const bundleScss = require('../index');
const path = require('path');

app
  .version(cfg.version)
  .option('-d, --dest <dest>', 'destination of bundled file')
  .option('-m, --mask <mask>', 'mask for files like ./src/**/*.theme.scss')
  .parse(process.argv);

if (app.mask && app.dest) {
  bundleScss(app.mask, app.dest);
} else {
  throw new Error(
    'Please check options: -m, -d. \nLooks like some of them are not specified'
  );
}
