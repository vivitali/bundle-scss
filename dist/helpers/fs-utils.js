"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.fileType = exports.writeAsync = exports.resolveDirDest = exports.cwDir = exports.readSync = exports.isFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const mkDir = require("make-dir");
const constants_1 = require("./constants");
const logger_1 = require("./logger");
const isFile = (f) => fs_1.existsSync(f) && fs_1.statSync(f).isFile();
exports.isFile = isFile;
const readSync = (filePath) => {
    try {
        return fs_1.readFileSync(filePath, 'utf8');
    }
    catch (err) {
        logger_1.logger(err);
    }
};
exports.readSync = readSync;
const cwDir = () => process.cwd();
exports.cwDir = cwDir;
/*
 * parse dir destination from des param crete folder if it doesn't exist
 * @param fileDest {string} - result file destination
 */
const resolveDirDest = (fileDest) => {
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
exports.resolveDirDest = resolveDirDest;
/*
 * write result into dest file
 * @param path {string} - output file
 * @param content {string} - content in utf-8 format which should be written into file
 * @return {Promise}
 * */
const writeAsync = (path, content) => {
    return new Promise((res, rej) => {
        fs_1.writeFile(path_1.resolve(path), content, (error) => {
            if (error) {
                return rej(error);
            }
            return res(content);
        });
    });
};
exports.writeAsync = writeAsync;
/*
 * get File type from string
 * @param fileName {string}
 * @return fileType {string}
 * */
const fileType = (fileName) => fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
exports.fileType = fileType;
/*
 * attach extension to fileName and check if it exist or trow error
 * @param filePath {string} - file path generated from sass `@import`
 * @param fileExtension {string} - file extension
 * @return filePath with appropriate extension `scss` by default
 * */
const defineExtension = (filePath, fileExtension) => {
    const file = `${filePath}.${fileExtension}`;
    const parsedPath = path_1.parse(file);
    const _file = path_1.join(parsedPath.dir, `_${parsedPath.base}`);
    if (exports.isFile(file)) {
        return file;
    }
    if (exports.isFile(_file)) {
        return _file;
    }
    throw new Error(`No file for module ${filePath}`);
};
exports.defineExtension = defineExtension;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9mcy11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBbUU7QUFDbkUsK0JBQTRDO0FBQzVDLGtDQUFrQztBQUNsQywyQ0FBd0M7QUFDeEMscUNBQWtDO0FBRTNCLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxlQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQTlELFFBQUEsTUFBTSxVQUF3RDtBQUVwRSxNQUFNLFFBQVEsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtJQUMzQyxJQUFJO1FBQ0YsT0FBTyxpQkFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUN2QztJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osZUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7QUFDSCxDQUFDLENBQUM7QUFOVyxRQUFBLFFBQVEsWUFNbkI7QUFFSyxNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7QUFBNUIsUUFBQSxLQUFLLFNBQXVCO0FBRXpDOzs7R0FHRztBQUVJLE1BQU0sY0FBYyxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFO0lBQ2pELE1BQU0sSUFBSSxHQUFHLHFCQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXpELElBQUksQ0FBQyxlQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDeEIsSUFBSTtZQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsZUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQzdDO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixlQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDYjtLQUNGO1NBQU07UUFDTCxlQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDdEM7QUFDSCxDQUFDLENBQUM7QUFiVyxRQUFBLGNBQWMsa0JBYXpCO0FBRUY7Ozs7O0tBS0s7QUFDRSxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsRUFBRTtJQUMxRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzlCLGNBQVMsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkI7WUFFRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBVlcsUUFBQSxVQUFVLGNBVXJCO0FBRUY7Ozs7S0FJSztBQUNFLE1BQU0sUUFBUSxHQUFHLENBQUMsUUFBZ0IsRUFBVSxFQUFFLENBQ25ELFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRHhELFFBQUEsUUFBUSxZQUNnRDtBQUVyRTs7Ozs7S0FLSztBQUNFLE1BQU0sZUFBZSxHQUFHLENBQUMsUUFBZ0IsRUFBRSxhQUFxQixFQUFFLEVBQUU7SUFDekUsTUFBTSxJQUFJLEdBQUcsR0FBRyxRQUFRLElBQUksYUFBYSxFQUFFLENBQUM7SUFDNUMsTUFBTSxVQUFVLEdBQUcsWUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHLFdBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFMUQsSUFBSSxjQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDaEIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQUksY0FBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2pCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELENBQUMsQ0FBQztBQWRXLFFBQUEsZUFBZSxtQkFjMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3cml0ZUZpbGUsIHN0YXRTeW5jLCByZWFkRmlsZVN5bmMsIGV4aXN0c1N5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyByZXNvbHZlLCBwYXJzZSwgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgbWtEaXIgZnJvbSAnbWFrZS1kaXInO1xuaW1wb3J0IHsgbWFpbkNvbnN0IH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xuXG5leHBvcnQgY29uc3QgaXNGaWxlID0gKGY6IHN0cmluZykgPT4gZXhpc3RzU3luYyhmKSAmJiBzdGF0U3luYyhmKS5pc0ZpbGUoKTtcblxuZXhwb3J0IGNvbnN0IHJlYWRTeW5jID0gKGZpbGVQYXRoOiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gcmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmOCcpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIoZXJyKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGN3RGlyID0gKCkgPT4gcHJvY2Vzcy5jd2QoKTtcblxuLypcbiAqIHBhcnNlIGRpciBkZXN0aW5hdGlvbiBmcm9tIGRlcyBwYXJhbSBjcmV0ZSBmb2xkZXIgaWYgaXQgZG9lc24ndCBleGlzdFxuICogQHBhcmFtIGZpbGVEZXN0IHtzdHJpbmd9IC0gcmVzdWx0IGZpbGUgZGVzdGluYXRpb25cbiAqL1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZURpckRlc3QgPSAoZmlsZURlc3Q6IHN0cmluZykgPT4ge1xuICBjb25zdCBwYXRoID0gbWFpbkNvbnN0LnBhcnNlRmlsZVBhdGhSZWdleC5leGVjKGZpbGVEZXN0KTtcblxuICBpZiAoIWV4aXN0c1N5bmMocGF0aFswXSkpIHtcbiAgICB0cnkge1xuICAgICAgbWtEaXIuc3luYyhwYXRoWzBdKTtcbiAgICAgIGxvZ2dlcihgJHtwYXRoWzBdfSAtIHN1Y2Nlc3NmdWxseSBjcmVhdGVkYCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIoZXJyKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyKGAke3BhdGhbMF19IC0gYWxyZWFkeSBleGlzdGApO1xuICB9XG59O1xuXG4vKlxuICogd3JpdGUgcmVzdWx0IGludG8gZGVzdCBmaWxlXG4gKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAtIG91dHB1dCBmaWxlXG4gKiBAcGFyYW0gY29udGVudCB7c3RyaW5nfSAtIGNvbnRlbnQgaW4gdXRmLTggZm9ybWF0IHdoaWNoIHNob3VsZCBiZSB3cml0dGVuIGludG8gZmlsZVxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqICovXG5leHBvcnQgY29uc3Qgd3JpdGVBc3luYyA9IChwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgd3JpdGVGaWxlKHJlc29sdmUocGF0aCksIGNvbnRlbnQsIChlcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldHVybiByZWooZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzKGNvbnRlbnQpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qXG4gKiBnZXQgRmlsZSB0eXBlIGZyb20gc3RyaW5nXG4gKiBAcGFyYW0gZmlsZU5hbWUge3N0cmluZ31cbiAqIEByZXR1cm4gZmlsZVR5cGUge3N0cmluZ31cbiAqICovXG5leHBvcnQgY29uc3QgZmlsZVR5cGUgPSAoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyA9PlxuICBmaWxlTmFtZS5zdWJzdHJpbmcoZmlsZU5hbWUubGFzdEluZGV4T2YoJy4nKSArIDEsIGZpbGVOYW1lLmxlbmd0aCk7XG5cbi8qXG4gKiBhdHRhY2ggZXh0ZW5zaW9uIHRvIGZpbGVOYW1lIGFuZCBjaGVjayBpZiBpdCBleGlzdCBvciB0cm93IGVycm9yXG4gKiBAcGFyYW0gZmlsZVBhdGgge3N0cmluZ30gLSBmaWxlIHBhdGggZ2VuZXJhdGVkIGZyb20gc2FzcyBgQGltcG9ydGBcbiAqIEBwYXJhbSBmaWxlRXh0ZW5zaW9uIHtzdHJpbmd9IC0gZmlsZSBleHRlbnNpb25cbiAqIEByZXR1cm4gZmlsZVBhdGggd2l0aCBhcHByb3ByaWF0ZSBleHRlbnNpb24gYHNjc3NgIGJ5IGRlZmF1bHRcbiAqICovXG5leHBvcnQgY29uc3QgZGVmaW5lRXh0ZW5zaW9uID0gKGZpbGVQYXRoOiBzdHJpbmcsIGZpbGVFeHRlbnNpb246IHN0cmluZykgPT4ge1xuICBjb25zdCBmaWxlID0gYCR7ZmlsZVBhdGh9LiR7ZmlsZUV4dGVuc2lvbn1gO1xuICBjb25zdCBwYXJzZWRQYXRoID0gcGFyc2UoZmlsZSk7XG4gIGNvbnN0IF9maWxlID0gam9pbihwYXJzZWRQYXRoLmRpciwgYF8ke3BhcnNlZFBhdGguYmFzZX1gKTtcblxuICBpZiAoaXNGaWxlKGZpbGUpKSB7XG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cblxuICBpZiAoaXNGaWxlKF9maWxlKSkge1xuICAgIHJldHVybiBfZmlsZTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgTm8gZmlsZSBmb3IgbW9kdWxlICR7ZmlsZVBhdGh9YCk7XG59O1xuIl19