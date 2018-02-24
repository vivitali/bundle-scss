# bundle-scss
Bundles all SCSS imports into a single file. Analise all scss imports inside each found by mask file and include.

## Get started
If you want to use `scss-bundle` globally
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
    -m, --mask <mask>            mask for files which has to be concatenate. Example \"./src/**/*.theme.scss\"  
    -m, --dest <dest>            Output file desination. Example \"./dist/themes.scss\"  
```
## Like it?

:star: [this repo](https://github.com/vasinkevych/scss-concat)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018