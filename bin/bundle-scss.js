#!/usr/bin/env node
'use strict';
const app = require('commander');
const cfg = require('../package.json');
const bundleScss = require('../index');
const path = require('path');
app
    .version(cfg.version)
    .option('-d, --dest', 'destination of bundled file')
    .option('-m, --mask', 'mask for files like ./src/**/*.theme.scss')
    .parse(process.argv);
let err = (err) => console.log(err);
let output = (dest) => {
    if (!app.dest) {
        console.log(dest);
    }
};
if (app.args.length) {
    console.log(app.args, '-------------');
    bundleScss(app.mask, app.dest);
}
else
    throw new Error('no files specified');
