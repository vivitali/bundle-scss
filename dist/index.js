"use strict";
const fs_1 = require("fs");
const path_1 = require("path");
const globby = require("globby");
const string_decoder_1 = require("string_decoder");
const Sort_1 = require("./helpers/Sort");
const fs_utils_1 = require("./helpers/fs-utils");
const file_content_utils_1 = require("./helpers/file-content-utils");
const logger_1 = require("./helpers/logger");
const Params_1 = require("./helpers/Params");
const decoder = new string_decoder_1.StringDecoder('utf8');
module.exports = (mask, dest, sort, config) => {
    const params = new Params_1.Params(mask, dest, sort, config).param;
    if (!params.mask || !params.mask.length) {
        throw new Error('Please provide the src for concat method');
    }
    fs_utils_1.resolveDirDest(params.dest);
    const searchMask = Array.isArray(params.mask) ? params.mask : [params.mask];
    return globby(searchMask).then(paths => {
        const files = paths.map(file => path_1.join(fs_utils_1.cwDir(), file));
        const fileExtension = fs_utils_1.fileType(params.dest);
        const unique = file_content_utils_1.getUniqueStyleFiles(files, fileExtension);
        const sorted = new Sort_1.Sort(params.sort).sort(unique);
        const buffers = sorted.map(file => {
            return fs_1.readFileSync(file);
        });
        const buff = Buffer.concat(buffers);
        let utfFormat = decoder.write(buff);
        if (params.dest) {
            logger_1.logger(`Saving result to ${params.dest}...`);
            const utf = file_content_utils_1.removeImports(utfFormat, fileExtension);
            return fs_utils_1.writeAsync(params.dest, utf)
                .then(() => {
                logger_1.logger(`SAVED SUCCESSFULLY! Please check ${params.dest}`);
                return utf;
            })
                .catch(reason => {
                logger_1.logger(`\n${reason}`);
            });
        }
        logger_1.logger('Please provide destination option');
        throw new Error('Please provide destination option');
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUFrQztBQUNsQywrQkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLG1EQUErQztBQUMvQyx5Q0FBc0M7QUFDdEMsaURBSzRCO0FBQzVCLHFFQUdzQztBQUN0Qyw2Q0FBMEM7QUFDMUMsNkNBQTBDO0FBRzFDLE1BQU0sT0FBTyxHQUFHLElBQUksOEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUxQyxpQkFBUyxDQUNQLElBQXVCLEVBQ3ZCLElBQVksRUFDWixJQUF1QixFQUN2QixNQUFlLEVBQ2YsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFZLElBQUksZUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUVuRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztLQUM3RDtJQUVELHlCQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTVCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU1RSxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxnQkFBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyRCxNQUFNLGFBQWEsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxNQUFNLE1BQU0sR0FBRyx3Q0FBbUIsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDekQsTUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hDLE9BQU8saUJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDZixlQUFNLENBQUMsb0JBQW9CLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDO1lBQzdDLE1BQU0sR0FBRyxHQUFHLGtDQUFhLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3BELE9BQU8scUJBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztpQkFDaEMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVCxlQUFNLENBQUMsb0NBQW9DLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxPQUFPLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2QsZUFBTSxDQUFDLEtBQUssTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsZUFBTSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDNUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIGdsb2JieSBmcm9tICdnbG9iYnknO1xyXG5pbXBvcnQgeyBTdHJpbmdEZWNvZGVyIH0gZnJvbSAnc3RyaW5nX2RlY29kZXInO1xyXG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9oZWxwZXJzL1NvcnQnO1xyXG5pbXBvcnQge1xyXG4gIGN3RGlyLFxyXG4gIGZpbGVUeXBlLFxyXG4gIHJlc29sdmVEaXJEZXN0LFxyXG4gIHdyaXRlQXN5bmMsXHJcbn0gZnJvbSAnLi9oZWxwZXJzL2ZzLXV0aWxzJztcclxuaW1wb3J0IHtcclxuICBnZXRVbmlxdWVTdHlsZUZpbGVzLFxyXG4gIHJlbW92ZUltcG9ydHMsXHJcbn0gZnJvbSAnLi9oZWxwZXJzL2ZpbGUtY29udGVudC11dGlscyc7XHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vaGVscGVycy9sb2dnZXInO1xyXG5pbXBvcnQgeyBQYXJhbXMgfSBmcm9tICcuL2hlbHBlcnMvUGFyYW1zJztcclxuaW1wb3J0IHsgSVBhcmFtcyB9IGZyb20gJy4vaW50ZXJmYWNlL0lQYXJhbXMnO1xyXG5cclxuY29uc3QgZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKCd1dGY4Jyk7XHJcblxyXG5leHBvcnQgPSAoXHJcbiAgbWFzazogc3RyaW5nW10gfCBzdHJpbmcsXHJcbiAgZGVzdDogc3RyaW5nLFxyXG4gIHNvcnQ6IHN0cmluZ1tdIHwgc3RyaW5nLFxyXG4gIGNvbmZpZzogYm9vbGVhblxyXG4pID0+IHtcclxuICBjb25zdCBwYXJhbXM6IElQYXJhbXMgPSBuZXcgUGFyYW1zKG1hc2ssIGRlc3QsIHNvcnQsIGNvbmZpZykucGFyYW07XHJcblxyXG4gIGlmICghcGFyYW1zLm1hc2sgfHwgIXBhcmFtcy5tYXNrLmxlbmd0aCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSB0aGUgc3JjIGZvciBjb25jYXQgbWV0aG9kJyk7XHJcbiAgfVxyXG5cclxuICByZXNvbHZlRGlyRGVzdChwYXJhbXMuZGVzdCk7XHJcblxyXG4gIGNvbnN0IHNlYXJjaE1hc2sgPSBBcnJheS5pc0FycmF5KHBhcmFtcy5tYXNrKSA/IHBhcmFtcy5tYXNrIDogW3BhcmFtcy5tYXNrXTtcclxuXHJcbiAgcmV0dXJuIGdsb2JieShzZWFyY2hNYXNrKS50aGVuKHBhdGhzID0+IHtcclxuICAgIGNvbnN0IGZpbGVzID0gcGF0aHMubWFwKGZpbGUgPT4gam9pbihjd0RpcigpLCBmaWxlKSk7XHJcbiAgICBjb25zdCBmaWxlRXh0ZW5zaW9uID0gZmlsZVR5cGUocGFyYW1zLmRlc3QpO1xyXG4gICAgY29uc3QgdW5pcXVlID0gZ2V0VW5pcXVlU3R5bGVGaWxlcyhmaWxlcywgZmlsZUV4dGVuc2lvbik7XHJcbiAgICBjb25zdCBzb3J0ZWQgPSBuZXcgU29ydChwYXJhbXMuc29ydCkuc29ydCh1bmlxdWUpO1xyXG4gICAgY29uc3QgYnVmZmVycyA9IHNvcnRlZC5tYXAoZmlsZSA9PiB7XHJcbiAgICAgIHJldHVybiByZWFkRmlsZVN5bmMoZmlsZSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGJ1ZmYgPSBCdWZmZXIuY29uY2F0KGJ1ZmZlcnMpO1xyXG4gICAgbGV0IHV0ZkZvcm1hdCA9IGRlY29kZXIud3JpdGUoYnVmZik7XHJcblxyXG4gICAgaWYgKHBhcmFtcy5kZXN0KSB7XHJcbiAgICAgIGxvZ2dlcihgU2F2aW5nIHJlc3VsdCB0byAke3BhcmFtcy5kZXN0fS4uLmApO1xyXG4gICAgICBjb25zdCB1dGYgPSByZW1vdmVJbXBvcnRzKHV0ZkZvcm1hdCwgZmlsZUV4dGVuc2lvbik7XHJcbiAgICAgIHJldHVybiB3cml0ZUFzeW5jKHBhcmFtcy5kZXN0LCB1dGYpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgbG9nZ2VyKGBTQVZFRCBTVUNDRVNTRlVMTFkhIFBsZWFzZSBjaGVjayAke3BhcmFtcy5kZXN0fWApO1xyXG4gICAgICAgICAgcmV0dXJuIHV0ZjtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChyZWFzb24gPT4ge1xyXG4gICAgICAgICAgbG9nZ2VyKGBcXG4ke3JlYXNvbn1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvZ2dlcignUGxlYXNlIHByb3ZpZGUgZGVzdGluYXRpb24gb3B0aW9uJyk7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGRlc3RpbmF0aW9uIG9wdGlvbicpO1xyXG4gIH0pO1xyXG59O1xyXG4iXX0=