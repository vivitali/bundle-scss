# bundle-scss

[![Build Status](https://travis-ci.org/vasinkevych/bundle-scss.svg?branch=master)](https://travis-ci.org/vasinkevych/bundle-scss)
[![NPM version](http://img.shields.io/npm/v/bundle-scss.svg)](https://www.npmjs.com/package/bundle-scss)
[![dependencies Status](https://david-dm.org/vasinkevych/bundle-scss.svg)](https://david-dm.org/vasinkevych/bundle-scss)
[![devDependencies Status](https://david-dm.org/vasinkevych/bundle-scss/dev-status.svg)](https://david-dm.org/vasinkevych/bundle-scss?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/vasinkevych/bundle-scss/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vasinkevych/bundle-scss?targetFile=package.json)
Find scss file by mask and bundles this scss files and scss imports into a single file. Recursive search for all `@import ...`.
All imported files (e.g `variables`, `mixins`) will be added at the beginning by default priority. 
Or you may specify your own priority.

## Get started
If you want to use `bundle-scss`
```sh
$ npm i -D bundle-scss
```
## CLI Usage
```sh
Usage: bundle-scss [options]

concatenate multiple scss filas into one

Options:
    -h, --help                   output usage information
    -V, --version                output the version number
    -m, --mask <mask>            mask for files which have to be concatenate. Example \"./src/**/*.theme.scss\". 
                                 You may pass several definitions in Array  
    -d, --dest <dest>            Output file desination. Example \"./dist/themes.scss\"  
    -s, --sort <sort>            Optional. Sort priority.     
                                 Example: `variable` - will pass all variables files at the beginning
                                 Default priority ['theme-variable', 'variable', 'mixin']"
    -c, --config                 if true parameter should be specified in `package-json` or `.bundle-style-conf.json`    
  
```
## Non-CLI Usage
```sh
const bundleScss = require("bundle-scss");
bundleScss(mask, dest, sort?)

Where
    mask -  \"./src/**/*.theme.scss\", you may pass several definitions in Array
    dest -   Output file desination. `.dist/dist/theme.scss`. `.dist/dist/` will be created if it not exist 
    sort -   Optional. Defines sort ordering. Default priority ['theme-variable', 'variable', 'mixin']"
```
## Example usage

### With inline parameters

```json
//package.json
{
    "script": {
      "postbuild": "npm run themes",
      "themes": "bundle-scss -m \"./src/**/*.theme.scss\" -d \"./dist/themes.scss\""
    }
}
```
`postbuild` - have to specify post task related to your project

### Specify params in separate file
`package.json` example
```json

{
    "script": {
      "postbuild": "npm run themes",
      "themes": "bundle-scss --config"
    },
   "bundleScss": {
     "dest": "./des/themes.scss",
     "mask": "./src/**/*.theme.scss",
     "sort": ["first-priority", "second-priority-variabl", "mixin"] // part of filenames
   }
}
```
or you may specify it in separate file `.bundle-style-conf.json`
```json
  {
     "dest": "./des/themes.scss",
     "mask": "./src/**/*.theme.scss",
     "sort": ["first-priority", "second-variabl", "mixin"] // part of filenames
   }
```
## Like it?

:star: [this repo](https://github.com/vasinkevych/bundle-scss)

## Other

[Next Steps] (https://github.com/vasinkevych/bundle-scss/blob/master/ROADMAP.md)  
[CHANGELOG] (https://github.com/vasinkevych/bundle-scss/blob/master/CHANGELOG.md)  

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018