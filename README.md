# bundle-scss

[![Build Status](https://travis-ci.org/vasinkevych/bundle-scss.svg?branch=master)](https://travis-ci.org/vasinkevych/bundle-scss)
[![NPM version](http://img.shields.io/npm/v/bundle-scss.svg)](https://www.npmjs.com/package/bundle-scss)
[![dependencies Status](https://david-dm.org/vasinkevych/bundle-scss.svg)](https://david-dm.org/vasinkevych/bundle-scss)
[![devDependencies Status](https://david-dm.org/vasinkevych/bundle-scss/dev-status.svg)](https://david-dm.org/vasinkevych/bundle-scss?type=dev)
Bundles all SCSS imports into a single file. Recursive search for all `@import ...`.
All imported files (e.g `variables`, `mixins`) will be added at the beginning by default priority

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
    -s, --sort <sort>            Output file desination.     
                                 Example: `variable` - will pass all variables at beginning
                                 Default priority ['theme-variable', 'variable', 'mixin']"
  
```
## Non-CLI Usage
```sh
const bundleScss = require("bundle-scss");
bundleScss(mask, dest, sort?)

Where
    mask -  \"./src/**/*.theme.scss\", you may pass several definitions in Array
    dest -   Output file desination. Currently, output folder (like `.dist/`) should already exist. 
    sort -   Optional. Defines sort ordering. Default priority ['theme-variable', 'variable', 'mixin']"
```
## Example usage

```json
//package.json
{
    "script": {
      "themes": "bundle-scss -m \"./src/**/*.theme.scss\" -d \"./dist/themes.scss\""
    }
}
```
or 
```json
//package.json
{
    "script": {
      "postbuild": "bundle-scss -m \"./src/**/*.theme.scss\" -d \"./dist/themes.scss\""
    }
}
```


## Like it?

:star: [this repo](https://github.com/vasinkevych/bundle-scss)

## Other

[Next Steps] (https://github.com/vasinkevych/bundle-scss/ROADMAP.md)  
[Changelog] (https://github.com/vasinkevych/bundle-scss/CHANGELOG.md)  

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018