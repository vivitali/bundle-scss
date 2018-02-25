Bundles all SCSS imports into a single file.
All imported files (e.g `variables`, `mixins`) will be added at the beginning

## Get started
# bundle-scss
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
    -m, --mask <mask>            mask for files which have to be concatenate. Example \"./src/**/*.theme.scss\"  
    -m, --dest <dest>            Output file desination. Example \"./dist/themes.scss\"  
```
## Like it?

:star: [this repo](https://github.com/vasinkevych/bundle-scss)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018