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
    throw new Error(`No file for module ${filePath}`);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9mcy11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUFtRTtBQUNuRSwrQkFBK0I7QUFDL0Isa0NBQWtDO0FBQ2xDLDJDQUF3QztBQUN4QyxxQ0FBa0M7QUFFckIsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLGVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFOUQsUUFBQSxRQUFRLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7SUFDM0MsSUFBSTtRQUNGLE9BQU8saUJBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDdkM7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLGVBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNiO0FBQ0gsQ0FBQyxDQUFDO0FBRVcsUUFBQSxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRXpDOzs7RUFHRTtBQUNXLFFBQUEsY0FBYyxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFO0lBQ2pELE1BQU0sSUFBSSxHQUFHLHFCQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXpELElBQUksQ0FBQyxlQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDeEIsSUFBSTtZQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsZUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQzdDO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixlQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDYjtLQUNGO1NBQU07UUFDTCxlQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDdEM7QUFDSCxDQUFDLENBQUM7QUFFRjs7Ozs7SUFLSTtBQUNTLFFBQUEsVUFBVSxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxFQUFFO0lBQzFELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDOUIsY0FBUyxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDeEMsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkI7WUFFRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUY7Ozs7SUFJSTtBQUNTLFFBQUEsUUFBUSxHQUFHLENBQUMsUUFBZ0IsRUFBVSxFQUFFLENBQ25ELFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXJFOzs7OztJQUtJO0FBQ1MsUUFBQSxlQUFlLEdBQUcsQ0FBQyxRQUFnQixFQUFFLGFBQXFCLEVBQUUsRUFBRTtJQUN6RSxNQUFNLElBQUksR0FBRyxHQUFHLFFBQVEsSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUU1QyxJQUFJLGNBQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUNwRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3cml0ZUZpbGUsIHN0YXRTeW5jLCByZWFkRmlsZVN5bmMsIGV4aXN0c1N5bmMgfSBmcm9tICdmcyc7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0ICogYXMgbWtEaXIgZnJvbSAnbWFrZS1kaXInO1xyXG5pbXBvcnQgeyBtYWluQ29uc3QgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbmV4cG9ydCBjb25zdCBpc0ZpbGUgPSAoZjogc3RyaW5nKSA9PiBleGlzdHNTeW5jKGYpICYmIHN0YXRTeW5jKGYpLmlzRmlsZSgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWRTeW5jID0gKGZpbGVQYXRoOiBzdHJpbmcpID0+IHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIHJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGxvZ2dlcihlcnIpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjd0RpciA9ICgpID0+IHByb2Nlc3MuY3dkKCk7XHJcblxyXG4vKlxyXG4qIHBhcnNlIGRpciBkZXN0aW5hdGlvbiBmcm9tIGRlcyBwYXJhbSBjcmV0ZSBmb2xkZXIgaWYgaXQgZG9lc24ndCBleGlzdFxyXG4qIEBwYXJhbSBmaWxlRGVzdCB7c3RyaW5nfSAtIHJlc3VsdCBmaWxlIGRlc3RpbmF0aW9uXHJcbiovXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlRGlyRGVzdCA9IChmaWxlRGVzdDogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgcGF0aCA9IG1haW5Db25zdC5wYXJzZUZpbGVQYXRoUmVnZXguZXhlYyhmaWxlRGVzdCk7XHJcblxyXG4gIGlmICghZXhpc3RzU3luYyhwYXRoWzBdKSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbWtEaXIuc3luYyhwYXRoWzBdKTtcclxuICAgICAgbG9nZ2VyKGAke3BhdGhbMF19IC0gc3VjY2Vzc2Z1bGx5IGNyZWF0ZWRgKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIoZXJyKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgbG9nZ2VyKGAke3BhdGhbMF19IC0gYWxyZWFkeSBleGlzdGApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qXHJcbiogd3JpdGUgcmVzdWx0IGludG8gZGVzdCBmaWxlXHJcbiogQHBhcmFtIHBhdGgge3N0cmluZ30gLSBvdXRwdXQgZmlsZVxyXG4qIEBwYXJhbSBjb250ZW50IHtzdHJpbmd9IC0gY29udGVudCBpbiB1dGYtOCBmb3JtYXQgd2hpY2ggc2hvdWxkIGJlIHdyaXR0ZW4gaW50byBmaWxlXHJcbiogQHJldHVybiB7UHJvbWlzZX1cclxuKiAqL1xyXG5leHBvcnQgY29uc3Qgd3JpdGVBc3luYyA9IChwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykgPT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgIHdyaXRlRmlsZShyZXNvbHZlKHBhdGgpLCBjb250ZW50LCBlcnJvciA9PiB7XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiByZWooZXJyb3IpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmVzKGNvbnRlbnQpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKlxyXG4qIGdldCBGaWxlIHR5cGUgZnJvbSBzdHJpbmdcclxuKiBAcGFyYW0gZmlsZU5hbWUge3N0cmluZ31cclxuKiBAcmV0dXJuIGZpbGVUeXBlIHtzdHJpbmd9XHJcbiogKi9cclxuZXhwb3J0IGNvbnN0IGZpbGVUeXBlID0gKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT5cclxuICBmaWxlTmFtZS5zdWJzdHJpbmcoZmlsZU5hbWUubGFzdEluZGV4T2YoJy4nKSArIDEsIGZpbGVOYW1lLmxlbmd0aCk7XHJcblxyXG4vKlxyXG4qIGF0dGFjaCBleHRlbnNpb24gdG8gZmlsZU5hbWUgYW5kIGNoZWNrIGlmIGl0IGV4aXN0IG9yIHRyb3cgZXJyb3JcclxuKiBAcGFyYW0gZmlsZVBhdGgge3N0cmluZ30gLSBmaWxlIHBhdGggZ2VuZXJhdGVkIGZyb20gc2FzcyBgQGltcG9ydGBcclxuKiBAcGFyYW0gZmlsZUV4dGVuc2lvbiB7c3RyaW5nfSAtIGZpbGUgZXh0ZW5zaW9uXHJcbiogQHJldHVybiBmaWxlUGF0aCB3aXRoIGFwcHJvcHJpYXRlIGV4dGVuc2lvbiBgc2Nzc2AgYnkgZGVmYXVsdFxyXG4qICovXHJcbmV4cG9ydCBjb25zdCBkZWZpbmVFeHRlbnNpb24gPSAoZmlsZVBhdGg6IHN0cmluZywgZmlsZUV4dGVuc2lvbjogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgZmlsZSA9IGAke2ZpbGVQYXRofS4ke2ZpbGVFeHRlbnNpb259YDtcclxuXHJcbiAgaWYgKGlzRmlsZShmaWxlKSkge1xyXG4gICAgcmV0dXJuIGZpbGU7XHJcbiAgfVxyXG4gIHRocm93IG5ldyBFcnJvcihgTm8gZmlsZSBmb3IgbW9kdWxlICR7ZmlsZVBhdGh9YCk7XHJcbn07XHJcbiJdfQ==