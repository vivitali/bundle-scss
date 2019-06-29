"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const mkDir = require("make-dir");
const constants_1 = require("./constants");
const logger_1 = require("./logger");
exports.isFile = (f) => fs_1.existsSync(f) && fs_1.statSync(f).isFile();
exports.readSync = (filePath) => {
    try {
        return fs_1.readFileSync(filePath, 'utf8');
    }
    catch (err) {
        logger_1.logger(err);
    }
};
exports.cwDir = () => process.cwd();
/*
 * parse dir destination from des param crete folder if it doesn't exist
 * @param fileDest {string} - result file destination
 */
exports.resolveDirDest = (fileDest) => {
    const path = constants_1.mainConst.parseFilePathRegex.exec(fileDest);
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
 * get File type from string
 * @param fileName {string}
 * @return fileType {string}
 * */
exports.fileType = (fileName) => fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
/*
 * attach extension to fileName and check if it exist or trow error
 * @param filePath {string} - file path generated from sass `@import`
 * @param fileExtension {string} - file extension
 * @return filePath with appropriate extension `scss` by default
 * */
exports.defineExtension = (filePath, fileExtension) => {
    const file = `${filePath}.${fileExtension}`;
    if (exports.isFile(file)) {
        return file;
    }
    const last = file.substring(file.lastIndexOf('/') + 1);
    const _file = file.replace(new RegExp(last), '_' + last);
    if (exports.isFile(_file)) {
        return _file;
    }
    throw new Error(`No file for module ${filePath}`);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9mcy11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUFtRTtBQUNuRSwrQkFBK0I7QUFDL0Isa0NBQWtDO0FBQ2xDLDJDQUF3QztBQUN4QyxxQ0FBa0M7QUFFckIsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLGVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFOUQsUUFBQSxRQUFRLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7SUFDM0MsSUFBSTtRQUNGLE9BQU8saUJBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDdkM7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLGVBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNiO0FBQ0gsQ0FBQyxDQUFDO0FBRVcsUUFBQSxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRXpDOzs7R0FHRztBQUVVLFFBQUEsY0FBYyxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFO0lBQ2pELE1BQU0sSUFBSSxHQUFHLHFCQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXpELElBQUksQ0FBQyxlQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDeEIsSUFBSTtZQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsZUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQzdDO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixlQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDYjtLQUNGO1NBQU07UUFDTCxlQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDdEM7QUFDSCxDQUFDLENBQUM7QUFFRjs7Ozs7S0FLSztBQUNRLFFBQUEsVUFBVSxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxFQUFFO0lBQzFELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDOUIsY0FBUyxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDeEMsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkI7WUFFRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUY7Ozs7S0FJSztBQUNRLFFBQUEsUUFBUSxHQUFHLENBQUMsUUFBZ0IsRUFBVSxFQUFFLENBQ25ELFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXJFOzs7OztLQUtLO0FBQ1EsUUFBQSxlQUFlLEdBQUcsQ0FBQyxRQUFnQixFQUFFLGFBQXFCLEVBQUUsRUFBRTtJQUN6RSxNQUFNLElBQUksR0FBRyxHQUFHLFFBQVEsSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUU1QyxJQUFJLGNBQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBRXpELElBQUksY0FBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2pCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdyaXRlRmlsZSwgc3RhdFN5bmMsIHJlYWRGaWxlU3luYywgZXhpc3RzU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIG1rRGlyIGZyb20gJ21ha2UtZGlyJztcbmltcG9ydCB7IG1haW5Db25zdCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGNvbnN0IGlzRmlsZSA9IChmOiBzdHJpbmcpID0+IGV4aXN0c1N5bmMoZikgJiYgc3RhdFN5bmMoZikuaXNGaWxlKCk7XG5cbmV4cG9ydCBjb25zdCByZWFkU3luYyA9IChmaWxlUGF0aDogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyKGVycik7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjd0RpciA9ICgpID0+IHByb2Nlc3MuY3dkKCk7XG5cbi8qXG4gKiBwYXJzZSBkaXIgZGVzdGluYXRpb24gZnJvbSBkZXMgcGFyYW0gY3JldGUgZm9sZGVyIGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAqIEBwYXJhbSBmaWxlRGVzdCB7c3RyaW5nfSAtIHJlc3VsdCBmaWxlIGRlc3RpbmF0aW9uXG4gKi9cblxuZXhwb3J0IGNvbnN0IHJlc29sdmVEaXJEZXN0ID0gKGZpbGVEZXN0OiBzdHJpbmcpID0+IHtcbiAgY29uc3QgcGF0aCA9IG1haW5Db25zdC5wYXJzZUZpbGVQYXRoUmVnZXguZXhlYyhmaWxlRGVzdCk7XG5cbiAgaWYgKCFleGlzdHNTeW5jKHBhdGhbMF0pKSB7XG4gICAgdHJ5IHtcbiAgICAgIG1rRGlyLnN5bmMocGF0aFswXSk7XG4gICAgICBsb2dnZXIoYCR7cGF0aFswXX0gLSBzdWNjZXNzZnVsbHkgY3JlYXRlZGApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyKGVycik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxvZ2dlcihgJHtwYXRoWzBdfSAtIGFscmVhZHkgZXhpc3RgKTtcbiAgfVxufTtcblxuLypcbiAqIHdyaXRlIHJlc3VsdCBpbnRvIGRlc3QgZmlsZVxuICogQHBhcmFtIHBhdGgge3N0cmluZ30gLSBvdXRwdXQgZmlsZVxuICogQHBhcmFtIGNvbnRlbnQge3N0cmluZ30gLSBjb250ZW50IGluIHV0Zi04IGZvcm1hdCB3aGljaCBzaG91bGQgYmUgd3JpdHRlbiBpbnRvIGZpbGVcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKiAqL1xuZXhwb3J0IGNvbnN0IHdyaXRlQXN5bmMgPSAocGF0aDogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgIHdyaXRlRmlsZShyZXNvbHZlKHBhdGgpLCBjb250ZW50LCBlcnJvciA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHJlaihlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXMoY29udGVudCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLypcbiAqIGdldCBGaWxlIHR5cGUgZnJvbSBzdHJpbmdcbiAqIEBwYXJhbSBmaWxlTmFtZSB7c3RyaW5nfVxuICogQHJldHVybiBmaWxlVHlwZSB7c3RyaW5nfVxuICogKi9cbmV4cG9ydCBjb25zdCBmaWxlVHlwZSA9IChmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nID0+XG4gIGZpbGVOYW1lLnN1YnN0cmluZyhmaWxlTmFtZS5sYXN0SW5kZXhPZignLicpICsgMSwgZmlsZU5hbWUubGVuZ3RoKTtcblxuLypcbiAqIGF0dGFjaCBleHRlbnNpb24gdG8gZmlsZU5hbWUgYW5kIGNoZWNrIGlmIGl0IGV4aXN0IG9yIHRyb3cgZXJyb3JcbiAqIEBwYXJhbSBmaWxlUGF0aCB7c3RyaW5nfSAtIGZpbGUgcGF0aCBnZW5lcmF0ZWQgZnJvbSBzYXNzIGBAaW1wb3J0YFxuICogQHBhcmFtIGZpbGVFeHRlbnNpb24ge3N0cmluZ30gLSBmaWxlIGV4dGVuc2lvblxuICogQHJldHVybiBmaWxlUGF0aCB3aXRoIGFwcHJvcHJpYXRlIGV4dGVuc2lvbiBgc2Nzc2AgYnkgZGVmYXVsdFxuICogKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVFeHRlbnNpb24gPSAoZmlsZVBhdGg6IHN0cmluZywgZmlsZUV4dGVuc2lvbjogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGZpbGUgPSBgJHtmaWxlUGF0aH0uJHtmaWxlRXh0ZW5zaW9ufWA7XG5cbiAgaWYgKGlzRmlsZShmaWxlKSkge1xuICAgIHJldHVybiBmaWxlO1xuICB9XG5cbiAgY29uc3QgbGFzdCA9IGZpbGUuc3Vic3RyaW5nKGZpbGUubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuICBjb25zdCBfZmlsZSA9IGZpbGUucmVwbGFjZShuZXcgUmVnRXhwKGxhc3QpLCAnXycgKyBsYXN0KTtcblxuICBpZiAoaXNGaWxlKF9maWxlKSkge1xuICAgIHJldHVybiBfZmlsZTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgTm8gZmlsZSBmb3IgbW9kdWxlICR7ZmlsZVBhdGh9YCk7XG59O1xuIl19