"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const mkDir = require("make-dir");
const constants_1 = require("./constants");
const logger_1 = require("./logger");
exports.isFile = (f) => fs_1.statSync(f).isFile();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9mcy11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUFtRTtBQUNuRSwrQkFBK0I7QUFDL0Isa0NBQWtDO0FBQ2xDLDJDQUF3QztBQUN4QyxxQ0FBa0M7QUFFckIsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLGFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUU3QyxRQUFBLFFBQVEsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtJQUMzQyxJQUFJLENBQUM7UUFDSCxNQUFNLENBQUMsaUJBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDYixlQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRVcsUUFBQSxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRXpDOzs7RUFHRTtBQUNXLFFBQUEsY0FBYyxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFO0lBQ2pELE1BQU0sSUFBSSxHQUFHLHFCQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXpELEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUM7WUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLGVBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLGVBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixlQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdkMsQ0FBQztBQUNILENBQUMsQ0FBQztBQUNGOzs7OztJQUtJO0FBQ1MsUUFBQSxVQUFVLEdBQUcsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLEVBQUU7SUFDMUQsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzlCLGNBQVMsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDO1lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUY7Ozs7SUFJSTtBQUNTLFFBQUEsZUFBZSxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFO0lBQ2xELE1BQU0sUUFBUSxHQUFHLEdBQUcsUUFBUSxJQUFJLHFCQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFckQsRUFBRSxDQUFDLENBQUMsY0FBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQzFELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdyaXRlRmlsZSwgc3RhdFN5bmMsIHJlYWRGaWxlU3luYywgZXhpc3RzU3luYyB9IGZyb20gJ2ZzJztcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgKiBhcyBta0RpciBmcm9tICdtYWtlLWRpcic7XHJcbmltcG9ydCB7IG1haW5Db25zdCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzRmlsZSA9IChmOiBzdHJpbmcpID0+IHN0YXRTeW5jKGYpLmlzRmlsZSgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWRTeW5jID0gKGZpbGVQYXRoOiBzdHJpbmcpID0+IHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIHJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGxvZ2dlcihlcnIpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjd0RpciA9ICgpID0+IHByb2Nlc3MuY3dkKCk7XHJcblxyXG4vKlxyXG4qIHBhcnNlIGRpciBkZXN0aW5hdGlvbiBmcm9tIGRlcyBwYXJhbSBjcmV0ZSBmb2xkZXIgaWYgaXQgZG9lc24ndCBleGl4dFxyXG4qIEBwYXJhbSBmaWxlRGVzdCB7c3RyaW5nfSAtIHJlc3VsdCBmaWxlIGRlc3RpbmF0aW9uXHJcbiovXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlRGlyRGVzdCA9IChmaWxlRGVzdDogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgcGF0aCA9IG1haW5Db25zdC5wYXJzZUZpbGVQYXRoUmVnZXguZXhlYyhmaWxlRGVzdCk7XHJcblxyXG4gIGlmICghZXhpc3RzU3luYyhwYXRoWzBdKSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbWtEaXIuc3luYyhwYXRoWzBdKTtcclxuICAgICAgbG9nZ2VyKGAke3BhdGhbMF19IC0gc3VjY2Vzc2Z1bGx5IGNyZWF0ZWRgKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIoZXJyKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgbG9nZ2VyKGAke3BhdGhbMF19IC0gYWxyZWFkeSBleGlzdGApO1xyXG4gIH1cclxufTtcclxuLypcclxuKiB3cml0ZSByZXN1bHQgaW50byBkZXN0IGZpbGVcclxuKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAtIG91dHB1dCBmaWxlXHJcbiogQHBhcmFtIGNvbnRlbnQge3N0cmluZ30gLSBjb250ZW50IGluIHV0Zi04IGZvcm1hdCB3aGljaCBzaG91bGQgYmUgd3JpdHRlbiBpbnRvIGZpbGVcclxuKiBAcmV0dXJuIHtQcm9taXNlfVxyXG4qICovXHJcbmV4cG9ydCBjb25zdCB3cml0ZUFzeW5jID0gKHBhdGg6IHN0cmluZywgY29udGVudDogc3RyaW5nKSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xyXG4gICAgd3JpdGVGaWxlKHJlc29sdmUocGF0aCksIGNvbnRlbnQsIGVycm9yID0+IHtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlaihlcnJvcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXMoY29udGVudCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuXHJcbi8qXHJcbiogYXR0YWNoIGV4dGVuc2lvbiB0byBmaWxlTmFtZSBhbmQgY2hlY2sgaWYgaXQgZXhpc3Qgb3IgdHJvdyBlcnJvclxyXG4qIEBwYXJhbSBmaWxlUGF0aCB7c3RyaW5nfSAtIGZpbGUgcGF0aCBnZW5lcmF0ZWQgZnJvbSBzYXNzIGBAaW1wb3J0YFxyXG4qIEByZXR1cm4gZmlsZVBhdGggd2l0aCBhcHByb3ByaWF0ZSBleHRlbnNpb24gYHNjc3NgIGJ5IGVmYXVsdFxyXG4qICovXHJcbmV4cG9ydCBjb25zdCBkZWZpbmVFeHRlbnNpb24gPSAoZmlsZVBhdGg6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IGp1c3RTY3NzID0gYCR7ZmlsZVBhdGh9LiR7bWFpbkNvbnN0LmZpbGVUeXBlfWA7XHJcblxyXG4gIGlmIChpc0ZpbGUoanVzdFNjc3MpKSB7XHJcbiAgICByZXR1cm4ganVzdFNjc3M7XHJcbiAgfVxyXG4gIHRocm93IG5ldyBFcnJvcihg4puUIOKblCDim5QgTm8gZmlsZSBmb3IgbW9kdWxlICR7ZmlsZVBhdGh9YCk7XHJcbn07XHJcbiJdfQ==