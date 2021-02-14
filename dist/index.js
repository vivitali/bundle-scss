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
    return globby(searchMask).then((paths) => {
        const files = paths.map((file) => path_1.join(fs_utils_1.cwDir(), file));
        const fileExtension = fs_utils_1.fileType(params.dest);
        const unique = file_content_utils_1.getUniqueStyleFiles(files, fileExtension);
        const sorted = new Sort_1.Sort(params.sort).sort(unique);
        const buffers = sorted.map((file) => {
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
                .catch((reason) => {
                logger_1.logger(`\n${reason}`);
            });
        }
        logger_1.logger('Please provide destination option');
        throw new Error('Please provide destination option');
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUFrQztBQUNsQywrQkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLG1EQUErQztBQUMvQyx5Q0FBc0M7QUFDdEMsaURBSzRCO0FBQzVCLHFFQUdzQztBQUN0Qyw2Q0FBMEM7QUFDMUMsNkNBQTBDO0FBRzFDLE1BQU0sT0FBTyxHQUFHLElBQUksOEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUxQyxpQkFBUyxDQUNQLElBQXVCLEVBQ3ZCLElBQVksRUFDWixJQUF1QixFQUN2QixNQUFlLEVBQ2YsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFZLElBQUksZUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUVuRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztLQUM3RDtJQUVELHlCQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTVCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU1RSxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN2QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFJLENBQUMsZ0JBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkQsTUFBTSxhQUFhLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsTUFBTSxNQUFNLEdBQUcsd0NBQW1CLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sTUFBTSxHQUFHLElBQUksV0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xDLE9BQU8saUJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDZixlQUFNLENBQUMsb0JBQW9CLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDO1lBQzdDLE1BQU0sR0FBRyxHQUFHLGtDQUFhLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3BELE9BQU8scUJBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztpQkFDaEMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVCxlQUFNLENBQUMsb0NBQW9DLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxPQUFPLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDaEIsZUFBTSxDQUFDLEtBQUssTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsZUFBTSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDNUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgZ2xvYmJ5IGZyb20gJ2dsb2JieSc7XG5pbXBvcnQgeyBTdHJpbmdEZWNvZGVyIH0gZnJvbSAnc3RyaW5nX2RlY29kZXInO1xuaW1wb3J0IHsgU29ydCB9IGZyb20gJy4vaGVscGVycy9Tb3J0JztcbmltcG9ydCB7XG4gIGN3RGlyLFxuICBmaWxlVHlwZSxcbiAgcmVzb2x2ZURpckRlc3QsXG4gIHdyaXRlQXN5bmMsXG59IGZyb20gJy4vaGVscGVycy9mcy11dGlscyc7XG5pbXBvcnQge1xuICBnZXRVbmlxdWVTdHlsZUZpbGVzLFxuICByZW1vdmVJbXBvcnRzLFxufSBmcm9tICcuL2hlbHBlcnMvZmlsZS1jb250ZW50LXV0aWxzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vaGVscGVycy9sb2dnZXInO1xuaW1wb3J0IHsgUGFyYW1zIH0gZnJvbSAnLi9oZWxwZXJzL1BhcmFtcyc7XG5pbXBvcnQgeyBJUGFyYW1zIH0gZnJvbSAnLi9pbnRlcmZhY2UvSVBhcmFtcyc7XG5cbmNvbnN0IGRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcigndXRmOCcpO1xuXG5leHBvcnQgPSAoXG4gIG1hc2s6IHN0cmluZ1tdIHwgc3RyaW5nLFxuICBkZXN0OiBzdHJpbmcsXG4gIHNvcnQ6IHN0cmluZ1tdIHwgc3RyaW5nLFxuICBjb25maWc6IGJvb2xlYW5cbikgPT4ge1xuICBjb25zdCBwYXJhbXM6IElQYXJhbXMgPSBuZXcgUGFyYW1zKG1hc2ssIGRlc3QsIHNvcnQsIGNvbmZpZykucGFyYW07XG5cbiAgaWYgKCFwYXJhbXMubWFzayB8fCAhcGFyYW1zLm1hc2subGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSB0aGUgc3JjIGZvciBjb25jYXQgbWV0aG9kJyk7XG4gIH1cblxuICByZXNvbHZlRGlyRGVzdChwYXJhbXMuZGVzdCk7XG5cbiAgY29uc3Qgc2VhcmNoTWFzayA9IEFycmF5LmlzQXJyYXkocGFyYW1zLm1hc2spID8gcGFyYW1zLm1hc2sgOiBbcGFyYW1zLm1hc2tdO1xuXG4gIHJldHVybiBnbG9iYnkoc2VhcmNoTWFzaykudGhlbigocGF0aHMpID0+IHtcbiAgICBjb25zdCBmaWxlcyA9IHBhdGhzLm1hcCgoZmlsZSkgPT4gam9pbihjd0RpcigpLCBmaWxlKSk7XG4gICAgY29uc3QgZmlsZUV4dGVuc2lvbiA9IGZpbGVUeXBlKHBhcmFtcy5kZXN0KTtcbiAgICBjb25zdCB1bmlxdWUgPSBnZXRVbmlxdWVTdHlsZUZpbGVzKGZpbGVzLCBmaWxlRXh0ZW5zaW9uKTtcbiAgICBjb25zdCBzb3J0ZWQgPSBuZXcgU29ydChwYXJhbXMuc29ydCkuc29ydCh1bmlxdWUpO1xuICAgIGNvbnN0IGJ1ZmZlcnMgPSBzb3J0ZWQubWFwKChmaWxlKSA9PiB7XG4gICAgICByZXR1cm4gcmVhZEZpbGVTeW5jKGZpbGUpO1xuICAgIH0pO1xuICAgIGNvbnN0IGJ1ZmYgPSBCdWZmZXIuY29uY2F0KGJ1ZmZlcnMpO1xuICAgIGxldCB1dGZGb3JtYXQgPSBkZWNvZGVyLndyaXRlKGJ1ZmYpO1xuXG4gICAgaWYgKHBhcmFtcy5kZXN0KSB7XG4gICAgICBsb2dnZXIoYFNhdmluZyByZXN1bHQgdG8gJHtwYXJhbXMuZGVzdH0uLi5gKTtcbiAgICAgIGNvbnN0IHV0ZiA9IHJlbW92ZUltcG9ydHModXRmRm9ybWF0LCBmaWxlRXh0ZW5zaW9uKTtcbiAgICAgIHJldHVybiB3cml0ZUFzeW5jKHBhcmFtcy5kZXN0LCB1dGYpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBsb2dnZXIoYFNBVkVEIFNVQ0NFU1NGVUxMWSEgUGxlYXNlIGNoZWNrICR7cGFyYW1zLmRlc3R9YCk7XG4gICAgICAgICAgcmV0dXJuIHV0ZjtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcbiAgICAgICAgICBsb2dnZXIoYFxcbiR7cmVhc29ufWApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9nZ2VyKCdQbGVhc2UgcHJvdmlkZSBkZXN0aW5hdGlvbiBvcHRpb24nKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGRlc3RpbmF0aW9uIG9wdGlvbicpO1xuICB9KTtcbn07XG4iXX0=