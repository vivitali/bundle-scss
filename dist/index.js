"use strict";
const fs_1 = require("fs");
const path_1 = require("path");
const globby = require("globby");
const string_decoder_1 = require("string_decoder");
const constants_1 = require("./helpers/constants");
const Sort_1 = require("./helpers/Sort");
const fs_utils_1 = require("./helpers/fs-utils");
const file_content_utils_1 = require("./helpers/file-content-utils");
const logger_1 = require("./helpers/logger");
const decoder = new string_decoder_1.StringDecoder('utf8');
module.exports = (mask, dest, sort = constants_1.config.defaultPriority) => {
    const sortOrder = Array.isArray(sort) ? sort : [sort];
    const sortInstance = new Sort_1.Sort(sortOrder);
    if (!mask || !mask.length) {
        throw new Error('⛔ ⛔ ⛔ Please provide the src for concat method');
    }
    const searchMask = Array.isArray(mask) ? mask : [mask];
    fs_utils_1.resolveDirDest(dest);
    return globby(searchMask).then(paths => {
        const files = paths.map(file => path_1.join(fs_utils_1.fullCurrentPath(), file));
        const unique = file_content_utils_1.getUniqueScss(files);
        const sorted = sortInstance.sort(unique);
        const buffers = sorted.map(file => {
            return fs_1.readFileSync(file);
        });
        const buff = Buffer.concat(buffers);
        let utfFormat = decoder.write(buff);
        if (dest) {
            logger_1.logger(`⏳ ⏳ ⏳ Saving result to ${dest}...`);
            const utf = file_content_utils_1.removeImports(utfFormat);
            return fs_utils_1.writeAsync(dest, utf)
                .then(() => {
                logger_1.logger(`🚀 🚀 🚀 SAVED SUCCESSFULLY \nPlease check ${dest}`);
                return utf;
            })
                .catch(reason => {
                logger_1.logger(`⛔ ⛔ ⛔\n${reason}`);
            });
        }
        logger_1.logger('📁 Please provide destination option ');
        throw new Error('📁 Please provide destination option ');
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUFrQztBQUNsQywrQkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLG1EQUErQztBQUMvQyxtREFBNkM7QUFDN0MseUNBQXNDO0FBQ3RDLGlEQUk0QjtBQUM1QixxRUFBNEU7QUFDNUUsNkNBQTBDO0FBRTFDLE1BQU0sT0FBTyxHQUFHLElBQUksOEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUxQyxpQkFBUyxDQUNQLElBQXVCLEVBQ3ZCLElBQVksRUFDWixPQUFpQixrQkFBTSxDQUFDLGVBQWUsRUFDdkMsRUFBRTtJQUNGLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxNQUFNLFlBQVksR0FBRyxJQUFJLFdBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBQ0QsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXZELHlCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFckIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQywwQkFBZSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUUvRCxNQUFNLE1BQU0sR0FBRyxrQ0FBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxNQUFNLENBQUMsaUJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1QsZUFBTSxDQUFDLDBCQUEwQixJQUFJLEtBQUssQ0FBQyxDQUFDO1lBQzVDLE1BQU0sR0FBRyxHQUFHLGtDQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztpQkFDekIsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVCxlQUFNLENBQUMsOENBQThDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNkLGVBQU0sQ0FBQyxVQUFVLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsZUFBTSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIGdsb2JieSBmcm9tICdnbG9iYnknO1xyXG5pbXBvcnQgeyBTdHJpbmdEZWNvZGVyIH0gZnJvbSAnc3RyaW5nX2RlY29kZXInO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2hlbHBlcnMvY29uc3RhbnRzJztcclxuaW1wb3J0IHsgU29ydCB9IGZyb20gJy4vaGVscGVycy9Tb3J0JztcclxuaW1wb3J0IHtcclxuICBmdWxsQ3VycmVudFBhdGgsXHJcbiAgcmVzb2x2ZURpckRlc3QsXHJcbiAgd3JpdGVBc3luYyxcclxufSBmcm9tICcuL2hlbHBlcnMvZnMtdXRpbHMnO1xyXG5pbXBvcnQgeyBnZXRVbmlxdWVTY3NzLCByZW1vdmVJbXBvcnRzIH0gZnJvbSAnLi9oZWxwZXJzL2ZpbGUtY29udGVudC11dGlscyc7XHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vaGVscGVycy9sb2dnZXInO1xyXG5cclxuY29uc3QgZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKCd1dGY4Jyk7XHJcblxyXG5leHBvcnQgPSAoXHJcbiAgbWFzazogc3RyaW5nW10gfCBzdHJpbmcsXHJcbiAgZGVzdDogc3RyaW5nLFxyXG4gIHNvcnQ6IHN0cmluZ1tdID0gY29uZmlnLmRlZmF1bHRQcmlvcml0eVxyXG4pID0+IHtcclxuICBjb25zdCBzb3J0T3JkZXIgPSBBcnJheS5pc0FycmF5KHNvcnQpID8gc29ydCA6IFtzb3J0XTtcclxuICBjb25zdCBzb3J0SW5zdGFuY2UgPSBuZXcgU29ydChzb3J0T3JkZXIpO1xyXG4gIGlmICghbWFzayB8fCAhbWFzay5sZW5ndGgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcign4puUIOKblCDim5QgUGxlYXNlIHByb3ZpZGUgdGhlIHNyYyBmb3IgY29uY2F0IG1ldGhvZCcpO1xyXG4gIH1cclxuICBjb25zdCBzZWFyY2hNYXNrID0gQXJyYXkuaXNBcnJheShtYXNrKSA/IG1hc2sgOiBbbWFza107XHJcblxyXG4gIHJlc29sdmVEaXJEZXN0KGRlc3QpO1xyXG5cclxuICByZXR1cm4gZ2xvYmJ5KHNlYXJjaE1hc2spLnRoZW4ocGF0aHMgPT4ge1xyXG4gICAgY29uc3QgZmlsZXMgPSBwYXRocy5tYXAoZmlsZSA9PiBqb2luKGZ1bGxDdXJyZW50UGF0aCgpLCBmaWxlKSk7XHJcblxyXG4gICAgY29uc3QgdW5pcXVlID0gZ2V0VW5pcXVlU2NzcyhmaWxlcyk7XHJcbiAgICBjb25zdCBzb3J0ZWQgPSBzb3J0SW5zdGFuY2Uuc29ydCh1bmlxdWUpO1xyXG4gICAgY29uc3QgYnVmZmVycyA9IHNvcnRlZC5tYXAoZmlsZSA9PiB7XHJcbiAgICAgIHJldHVybiByZWFkRmlsZVN5bmMoZmlsZSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGJ1ZmYgPSBCdWZmZXIuY29uY2F0KGJ1ZmZlcnMpO1xyXG4gICAgbGV0IHV0ZkZvcm1hdCA9IGRlY29kZXIud3JpdGUoYnVmZik7XHJcblxyXG4gICAgaWYgKGRlc3QpIHtcclxuICAgICAgbG9nZ2VyKGDij7Mg4o+zIOKPsyBTYXZpbmcgcmVzdWx0IHRvICR7ZGVzdH0uLi5gKTtcclxuICAgICAgY29uc3QgdXRmID0gcmVtb3ZlSW1wb3J0cyh1dGZGb3JtYXQpO1xyXG4gICAgICByZXR1cm4gd3JpdGVBc3luYyhkZXN0LCB1dGYpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgbG9nZ2VyKGDtoL3tuoAg7aC97bqAIO2gve26gCBTQVZFRCBTVUNDRVNTRlVMTFkgXFxuUGxlYXNlIGNoZWNrICR7ZGVzdH1gKTtcclxuICAgICAgICAgIHJldHVybiB1dGY7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2gocmVhc29uID0+IHtcclxuICAgICAgICAgIGxvZ2dlcihg4puUIOKblCDim5RcXG4ke3JlYXNvbn1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvZ2dlcign7aC97bOBIFBsZWFzZSBwcm92aWRlIGRlc3RpbmF0aW9uIG9wdGlvbiAnKTtcclxuICAgIHRocm93IG5ldyBFcnJvcign7aC97bOBIFBsZWFzZSBwcm92aWRlIGRlc3RpbmF0aW9uIG9wdGlvbiAnKTtcclxuICB9KTtcclxufTtcclxuIl19