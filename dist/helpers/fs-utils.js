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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9mcy11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUFtRTtBQUNuRSwrQkFBK0I7QUFDL0Isa0NBQWtDO0FBQ2xDLDJDQUF3QztBQUN4QyxxQ0FBa0M7QUFFckIsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLGVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFOUQsUUFBQSxRQUFRLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7SUFDM0MsSUFBSSxDQUFDO1FBQ0gsTUFBTSxDQUFDLGlCQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2IsZUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVXLFFBQUEsS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUV6Qzs7O0VBR0U7QUFDVyxRQUFBLGNBQWMsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtJQUNqRCxNQUFNLElBQUksR0FBRyxxQkFBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDO1lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixlQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixlQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sZUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRjs7Ozs7SUFLSTtBQUNTLFFBQUEsVUFBVSxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxFQUFFO0lBQzFELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUM5QixjQUFTLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtZQUN4QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQztZQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGOzs7O0lBSUk7QUFDUyxRQUFBLFFBQVEsR0FBRyxDQUFDLFFBQWdCLEVBQVUsRUFBRSxDQUNuRCxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVyRTs7Ozs7SUFLSTtBQUNTLFFBQUEsZUFBZSxHQUFHLENBQUMsUUFBZ0IsRUFBRSxhQUFxQixFQUFFLEVBQUU7SUFDekUsTUFBTSxJQUFJLEdBQUcsR0FBRyxRQUFRLElBQUksYUFBYSxFQUFFLENBQUM7SUFFNUMsRUFBRSxDQUFDLENBQUMsY0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDcEQsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd3JpdGVGaWxlLCBzdGF0U3luYywgcmVhZEZpbGVTeW5jLCBleGlzdHNTeW5jIH0gZnJvbSAnZnMnO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIG1rRGlyIGZyb20gJ21ha2UtZGlyJztcclxuaW1wb3J0IHsgbWFpbkNvbnN0IH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcblxyXG5leHBvcnQgY29uc3QgaXNGaWxlID0gKGY6IHN0cmluZykgPT4gZXhpc3RzU3luYyhmKSAmJiBzdGF0U3luYyhmKS5pc0ZpbGUoKTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWFkU3luYyA9IChmaWxlUGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiByZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4Jyk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBsb2dnZXIoZXJyKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY3dEaXIgPSAoKSA9PiBwcm9jZXNzLmN3ZCgpO1xyXG5cclxuLypcclxuKiBwYXJzZSBkaXIgZGVzdGluYXRpb24gZnJvbSBkZXMgcGFyYW0gY3JldGUgZm9sZGVyIGlmIGl0IGRvZXNuJ3QgZXhpc3RcclxuKiBAcGFyYW0gZmlsZURlc3Qge3N0cmluZ30gLSByZXN1bHQgZmlsZSBkZXN0aW5hdGlvblxyXG4qL1xyXG5leHBvcnQgY29uc3QgcmVzb2x2ZURpckRlc3QgPSAoZmlsZURlc3Q6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IHBhdGggPSBtYWluQ29uc3QucGFyc2VGaWxlUGF0aFJlZ2V4LmV4ZWMoZmlsZURlc3QpO1xyXG5cclxuICBpZiAoIWV4aXN0c1N5bmMocGF0aFswXSkpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG1rRGlyLnN5bmMocGF0aFswXSk7XHJcbiAgICAgIGxvZ2dlcihgJHtwYXRoWzBdfSAtIHN1Y2Nlc3NmdWxseSBjcmVhdGVkYCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgbG9nZ2VyKGVycik7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGxvZ2dlcihgJHtwYXRoWzBdfSAtIGFscmVhZHkgZXhpc3RgKTtcclxuICB9XHJcbn07XHJcblxyXG4vKlxyXG4qIHdyaXRlIHJlc3VsdCBpbnRvIGRlc3QgZmlsZVxyXG4qIEBwYXJhbSBwYXRoIHtzdHJpbmd9IC0gb3V0cHV0IGZpbGVcclxuKiBAcGFyYW0gY29udGVudCB7c3RyaW5nfSAtIGNvbnRlbnQgaW4gdXRmLTggZm9ybWF0IHdoaWNoIHNob3VsZCBiZSB3cml0dGVuIGludG8gZmlsZVxyXG4qIEByZXR1cm4ge1Byb21pc2V9XHJcbiogKi9cclxuZXhwb3J0IGNvbnN0IHdyaXRlQXN5bmMgPSAocGF0aDogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpID0+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICB3cml0ZUZpbGUocmVzb2x2ZShwYXRoKSwgY29udGVudCwgZXJyb3IgPT4ge1xyXG4gICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gcmVqKGVycm9yKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJlcyhjb250ZW50KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLypcclxuKiBnZXQgRmlsZSB0eXBlIGZyb20gc3RyaW5nXHJcbiogQHBhcmFtIGZpbGVOYW1lIHtzdHJpbmd9XHJcbiogQHJldHVybiBmaWxlVHlwZSB7c3RyaW5nfVxyXG4qICovXHJcbmV4cG9ydCBjb25zdCBmaWxlVHlwZSA9IChmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nID0+XHJcbiAgZmlsZU5hbWUuc3Vic3RyaW5nKGZpbGVOYW1lLmxhc3RJbmRleE9mKCcuJykgKyAxLCBmaWxlTmFtZS5sZW5ndGgpO1xyXG5cclxuLypcclxuKiBhdHRhY2ggZXh0ZW5zaW9uIHRvIGZpbGVOYW1lIGFuZCBjaGVjayBpZiBpdCBleGlzdCBvciB0cm93IGVycm9yXHJcbiogQHBhcmFtIGZpbGVQYXRoIHtzdHJpbmd9IC0gZmlsZSBwYXRoIGdlbmVyYXRlZCBmcm9tIHNhc3MgYEBpbXBvcnRgXHJcbiogQHBhcmFtIGZpbGVFeHRlbnNpb24ge3N0cmluZ30gLSBmaWxlIGV4dGVuc2lvblxyXG4qIEByZXR1cm4gZmlsZVBhdGggd2l0aCBhcHByb3ByaWF0ZSBleHRlbnNpb24gYHNjc3NgIGJ5IGRlZmF1bHRcclxuKiAqL1xyXG5leHBvcnQgY29uc3QgZGVmaW5lRXh0ZW5zaW9uID0gKGZpbGVQYXRoOiBzdHJpbmcsIGZpbGVFeHRlbnNpb246IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IGZpbGUgPSBgJHtmaWxlUGF0aH0uJHtmaWxlRXh0ZW5zaW9ufWA7XHJcblxyXG4gIGlmIChpc0ZpbGUoZmlsZSkpIHtcclxuICAgIHJldHVybiBmaWxlO1xyXG4gIH1cclxuICB0aHJvdyBuZXcgRXJyb3IoYE5vIGZpbGUgZm9yIG1vZHVsZSAke2ZpbGVQYXRofWApO1xyXG59O1xyXG4iXX0=