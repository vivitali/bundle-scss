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
* parse dir destination from des param crete folder if it doesn't exixt
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
* attach extension to fileName and check if it exist or trow error
* @param filePath {string} - file path generated from sass `@import`
* @return filePath with appropriate extension `scss` by efault
* */
exports.defineExtension = (filePath) => {
    const justScss = `${filePath}.${constants_1.mainConst.fileType}`;
    if (exports.isFile(justScss)) {
        return justScss;
    }
    throw new Error(`⛔ ⛔ ⛔ No file for module ${filePath}`);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9mcy11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUFtRTtBQUNuRSwrQkFBK0I7QUFDL0Isa0NBQWtDO0FBQ2xDLDJDQUF3QztBQUN4QyxxQ0FBa0M7QUFFckIsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLGVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFOUQsUUFBQSxRQUFRLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7SUFDM0MsSUFBSSxDQUFDO1FBQ0gsTUFBTSxDQUFDLGlCQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2IsZUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVXLFFBQUEsS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUV6Qzs7O0VBR0U7QUFDVyxRQUFBLGNBQWMsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtJQUNqRCxNQUFNLElBQUksR0FBRyxxQkFBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDO1lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixlQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixlQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sZUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRjs7Ozs7SUFLSTtBQUNTLFFBQUEsVUFBVSxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxFQUFFO0lBQzFELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUM5QixjQUFTLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtZQUN4QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQztZQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGOzs7O0lBSUk7QUFDUyxRQUFBLGVBQWUsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtJQUNsRCxNQUFNLFFBQVEsR0FBRyxHQUFHLFFBQVEsSUFBSSxxQkFBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRXJELEVBQUUsQ0FBQyxDQUFDLGNBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUMxRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3cml0ZUZpbGUsIHN0YXRTeW5jLCByZWFkRmlsZVN5bmMsIGV4aXN0c1N5bmMgfSBmcm9tICdmcyc7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0ICogYXMgbWtEaXIgZnJvbSAnbWFrZS1kaXInO1xyXG5pbXBvcnQgeyBtYWluQ29uc3QgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbmV4cG9ydCBjb25zdCBpc0ZpbGUgPSAoZjogc3RyaW5nKSA9PiBleGlzdHNTeW5jKGYpICYmIHN0YXRTeW5jKGYpLmlzRmlsZSgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWRTeW5jID0gKGZpbGVQYXRoOiBzdHJpbmcpID0+IHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIHJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGxvZ2dlcihlcnIpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjd0RpciA9ICgpID0+IHByb2Nlc3MuY3dkKCk7XHJcblxyXG4vKlxyXG4qIHBhcnNlIGRpciBkZXN0aW5hdGlvbiBmcm9tIGRlcyBwYXJhbSBjcmV0ZSBmb2xkZXIgaWYgaXQgZG9lc24ndCBleGl4dFxyXG4qIEBwYXJhbSBmaWxlRGVzdCB7c3RyaW5nfSAtIHJlc3VsdCBmaWxlIGRlc3RpbmF0aW9uXHJcbiovXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlRGlyRGVzdCA9IChmaWxlRGVzdDogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgcGF0aCA9IG1haW5Db25zdC5wYXJzZUZpbGVQYXRoUmVnZXguZXhlYyhmaWxlRGVzdCk7XHJcblxyXG4gIGlmICghZXhpc3RzU3luYyhwYXRoWzBdKSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbWtEaXIuc3luYyhwYXRoWzBdKTtcclxuICAgICAgbG9nZ2VyKGAke3BhdGhbMF19IC0gc3VjY2Vzc2Z1bGx5IGNyZWF0ZWRgKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIoZXJyKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgbG9nZ2VyKGAke3BhdGhbMF19IC0gYWxyZWFkeSBleGlzdGApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qXHJcbiogd3JpdGUgcmVzdWx0IGludG8gZGVzdCBmaWxlXHJcbiogQHBhcmFtIHBhdGgge3N0cmluZ30gLSBvdXRwdXQgZmlsZVxyXG4qIEBwYXJhbSBjb250ZW50IHtzdHJpbmd9IC0gY29udGVudCBpbiB1dGYtOCBmb3JtYXQgd2hpY2ggc2hvdWxkIGJlIHdyaXR0ZW4gaW50byBmaWxlXHJcbiogQHJldHVybiB7UHJvbWlzZX1cclxuKiAqL1xyXG5leHBvcnQgY29uc3Qgd3JpdGVBc3luYyA9IChwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykgPT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgIHdyaXRlRmlsZShyZXNvbHZlKHBhdGgpLCBjb250ZW50LCBlcnJvciA9PiB7XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiByZWooZXJyb3IpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmVzKGNvbnRlbnQpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKlxyXG4qIGF0dGFjaCBleHRlbnNpb24gdG8gZmlsZU5hbWUgYW5kIGNoZWNrIGlmIGl0IGV4aXN0IG9yIHRyb3cgZXJyb3JcclxuKiBAcGFyYW0gZmlsZVBhdGgge3N0cmluZ30gLSBmaWxlIHBhdGggZ2VuZXJhdGVkIGZyb20gc2FzcyBgQGltcG9ydGBcclxuKiBAcmV0dXJuIGZpbGVQYXRoIHdpdGggYXBwcm9wcmlhdGUgZXh0ZW5zaW9uIGBzY3NzYCBieSBlZmF1bHRcclxuKiAqL1xyXG5leHBvcnQgY29uc3QgZGVmaW5lRXh0ZW5zaW9uID0gKGZpbGVQYXRoOiBzdHJpbmcpID0+IHtcclxuICBjb25zdCBqdXN0U2NzcyA9IGAke2ZpbGVQYXRofS4ke21haW5Db25zdC5maWxlVHlwZX1gO1xyXG5cclxuICBpZiAoaXNGaWxlKGp1c3RTY3NzKSkge1xyXG4gICAgcmV0dXJuIGp1c3RTY3NzO1xyXG4gIH1cclxuICB0aHJvdyBuZXcgRXJyb3IoYOKblCDim5Qg4puUIE5vIGZpbGUgZm9yIG1vZHVsZSAke2ZpbGVQYXRofWApO1xyXG59O1xyXG4iXX0=