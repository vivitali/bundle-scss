"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const mkDir = require("make-dir");
const constants_1 = require("./constants");
const logger_1 = require("./logger");
exports.isFile = (f) => fs_1.statSync(f).isFile();
exports.readSync = (filePath) => fs_1.readFileSync(filePath, 'utf8');
exports.fullCurrentPath = () => path_1.join(process.cwd());
/*
* parse dir destination from des param crete folder if it doesn't exixt
* @param fileDest {string} - result file destination
*/
exports.resolveDirDest = (fileDest) => {
    const path = constants_1.config.parseFilePathRegex.exec(fileDest);
    if (!fs_1.existsSync(path[0])) {
        try {
            mkDir.sync(path[0]);
            logger_1.logger(`${path[0]} - successfully created`);
        }
        catch (err) {
            logger_1.logger(err);
        }
    }
    else {
        logger_1.logger(`${path[0]} - already exist`);
    }
};
/*
* write result into dest file
* @param path {string} - output file
* @param content {string} - content in utf-8 format which should be written into file
* @return {Promise}
* */
exports.writeAsync = (path, content) => {
    return new Promise((res, rej) => {
        fs_1.writeFile(path_1.resolve(path), content, error => {
            if (error) {
                return rej(error);
            }
            return res(content);
        });
    });
};
/*
* attach extension to fileName and check if it exist or trow error
* @param filePath {string} - file path generated from sass `@import`
* @return filePath with appropriate extension `scss` by efault
* */
exports.defineExtension = (filePath) => {
    const justScss = `${filePath}.${constants_1.config.fileType}`;
    if (exports.isFile(justScss)) {
        return justScss;
    }
    throw new Error(`⛔ ⛔ ⛔ No file for module ${filePath}`);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9mcy11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUFtRTtBQUNuRSwrQkFBcUM7QUFDckMsa0NBQWtDO0FBQ2xDLDJDQUFxQztBQUNyQyxxQ0FBa0M7QUFFckIsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLGFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUU3QyxRQUFBLFFBQVEsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxDQUFDLGlCQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBRWhFLFFBQUEsZUFBZSxHQUFHLEdBQUcsRUFBRSxDQUFDLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUV6RDs7O0VBR0U7QUFDVyxRQUFBLGNBQWMsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtJQUNqRCxNQUFNLElBQUksR0FBRyxrQkFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDO1lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixlQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixlQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sZUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7QUFDSCxDQUFDLENBQUM7QUFDRjs7Ozs7SUFLSTtBQUNTLFFBQUEsVUFBVSxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxFQUFFO0lBQzFELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUM5QixjQUFTLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtZQUN4QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQztZQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGOzs7O0lBSUk7QUFDUyxRQUFBLGVBQWUsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtJQUNsRCxNQUFNLFFBQVEsR0FBRyxHQUFHLFFBQVEsSUFBSSxrQkFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRWxELEVBQUUsQ0FBQyxDQUFDLGNBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUMxRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3cml0ZUZpbGUsIHN0YXRTeW5jLCByZWFkRmlsZVN5bmMsIGV4aXN0c1N5bmMgfSBmcm9tICdmcyc7XHJcbmltcG9ydCB7IGpvaW4sIHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0ICogYXMgbWtEaXIgZnJvbSAnbWFrZS1kaXInO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbmV4cG9ydCBjb25zdCBpc0ZpbGUgPSAoZjogc3RyaW5nKSA9PiBzdGF0U3luYyhmKS5pc0ZpbGUoKTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWFkU3luYyA9IChmaWxlUGF0aDogc3RyaW5nKSA9PiByZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4Jyk7XHJcblxyXG5leHBvcnQgY29uc3QgZnVsbEN1cnJlbnRQYXRoID0gKCkgPT4gam9pbihwcm9jZXNzLmN3ZCgpKTtcclxuXHJcbi8qXHJcbiogcGFyc2UgZGlyIGRlc3RpbmF0aW9uIGZyb20gZGVzIHBhcmFtIGNyZXRlIGZvbGRlciBpZiBpdCBkb2Vzbid0IGV4aXh0XHJcbiogQHBhcmFtIGZpbGVEZXN0IHtzdHJpbmd9IC0gcmVzdWx0IGZpbGUgZGVzdGluYXRpb25cclxuKi9cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVEaXJEZXN0ID0gKGZpbGVEZXN0OiBzdHJpbmcpID0+IHtcclxuICBjb25zdCBwYXRoID0gY29uZmlnLnBhcnNlRmlsZVBhdGhSZWdleC5leGVjKGZpbGVEZXN0KTtcclxuXHJcbiAgaWYgKCFleGlzdHNTeW5jKHBhdGhbMF0pKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBta0Rpci5zeW5jKHBhdGhbMF0pO1xyXG4gICAgICBsb2dnZXIoYCR7cGF0aFswXX0gLSBzdWNjZXNzZnVsbHkgY3JlYXRlZGApO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGxvZ2dlcihlcnIpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBsb2dnZXIoYCR7cGF0aFswXX0gLSBhbHJlYWR5IGV4aXN0YCk7XHJcbiAgfVxyXG59O1xyXG4vKlxyXG4qIHdyaXRlIHJlc3VsdCBpbnRvIGRlc3QgZmlsZVxyXG4qIEBwYXJhbSBwYXRoIHtzdHJpbmd9IC0gb3V0cHV0IGZpbGVcclxuKiBAcGFyYW0gY29udGVudCB7c3RyaW5nfSAtIGNvbnRlbnQgaW4gdXRmLTggZm9ybWF0IHdoaWNoIHNob3VsZCBiZSB3cml0dGVuIGludG8gZmlsZVxyXG4qIEByZXR1cm4ge1Byb21pc2V9XHJcbiogKi9cclxuZXhwb3J0IGNvbnN0IHdyaXRlQXN5bmMgPSAocGF0aDogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpID0+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICB3cml0ZUZpbGUocmVzb2x2ZShwYXRoKSwgY29udGVudCwgZXJyb3IgPT4ge1xyXG4gICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gcmVqKGVycm9yKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJlcyhjb250ZW50KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLypcclxuKiBhdHRhY2ggZXh0ZW5zaW9uIHRvIGZpbGVOYW1lIGFuZCBjaGVjayBpZiBpdCBleGlzdCBvciB0cm93IGVycm9yXHJcbiogQHBhcmFtIGZpbGVQYXRoIHtzdHJpbmd9IC0gZmlsZSBwYXRoIGdlbmVyYXRlZCBmcm9tIHNhc3MgYEBpbXBvcnRgXHJcbiogQHJldHVybiBmaWxlUGF0aCB3aXRoIGFwcHJvcHJpYXRlIGV4dGVuc2lvbiBgc2Nzc2AgYnkgZWZhdWx0XHJcbiogKi9cclxuZXhwb3J0IGNvbnN0IGRlZmluZUV4dGVuc2lvbiA9IChmaWxlUGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QganVzdFNjc3MgPSBgJHtmaWxlUGF0aH0uJHtjb25maWcuZmlsZVR5cGV9YDtcclxuXHJcbiAgaWYgKGlzRmlsZShqdXN0U2NzcykpIHtcclxuICAgIHJldHVybiBqdXN0U2NzcztcclxuICB9XHJcbiAgdGhyb3cgbmV3IEVycm9yKGDim5Qg4puUIOKblCBObyBmaWxlIGZvciBtb2R1bGUgJHtmaWxlUGF0aH1gKTtcclxufTtcclxuIl19