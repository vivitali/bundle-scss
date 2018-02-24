"use strict";
const fs_1 = require("fs");
const path_1 = require("path");
const globby = require("globby");
const string_decoder_1 = require("string_decoder");
const decoder = new string_decoder_1.StringDecoder('utf8');
const log = (info) => console.log(info);
const isFile = (f) => fs_1.statSync(f).isFile();
const removeImports = (content) => content.replace(/@import ['"]([^'"]+)['"];/g, '');
const readSync = (filePath) => fs_1.readFileSync(filePath, 'utf8');
const getUniqueScss = (files) => {
    const scssImports = files
        .map(file => {
        let baseDir = path_1.dirname(file);
        return getImports(readSync(file), baseDir);
    })
        .reduce((acc, curr) => acc.concat(curr), []);
    const uniqueArr = [...new Set(scssImports.map(el => el.path))];
    return [...uniqueArr, ...files];
};
function getImports(content, baseDir) {
    const regex = /@import ['"]([^'"]+)['"];/g;
    let imports = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        imports.push({
            path: defineExtension(path_1.join(baseDir, match[1])),
            stringToReplace: match[0],
        });
    }
    return imports;
}
function writeAsync(path, content) {
    return new Promise((res, rej) => {
        fs_1.writeFile(path_1.resolve(path), content, error => {
            if (error) {
                return rej(error);
            }
            return res(content);
        });
    });
}
function defineExtension(filePath) {
    const justScss = filePath + '.scss';
    if (isFile(justScss)) {
        return justScss;
    }
    console.error(`⛔ ⛔ ⛔ No file for module ${filePath}`);
}
module.exports = (mask, dest) => {
    const fullPath = path_1.join(process.cwd());
    if (!mask || !mask.length) {
        console.error('⛔ ⛔ ⛔ Please provide the src for concat method');
    }
    const searchMask = Array.isArray(mask) ? mask : [mask];
    globby(searchMask).then(paths => {
        const files = paths.map(file => path_1.join(fullPath, file));
        const unique = getUniqueScss(files);
        const buffers = unique.map(file => {
            return fs_1.readFileSync(file);
        });
        const buff = Buffer.concat(buffers);
        let utfFormat = decoder.write(buff);
        if (dest) {
            log(`⏳ ⏳ ⏳ Saving result to ${dest}...`);
            writeAsync(dest, removeImports(utfFormat))
                .then(res => {
                log(`🚀 🚀 🚀 SAVED SUCCESSFULLY \nPlease check ${dest}`);
            })
                .catch(reason => {
                log(`⛔ ⛔ ⛔\n${reason}`);
            });
            return dest;
        }
        log('📁 Please provide destination option ');
    });
};
