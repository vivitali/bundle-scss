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
        throw new Error('⛔ ⛔ ⛔ Please provide the src for concat method');
    }
    fs_utils_1.resolveDirDest(params.dest);
    const searchMask = Array.isArray(params.mask) ? params.mask : [params.mask];
    return globby(searchMask).then(paths => {
        const files = paths.map(file => path_1.join(fs_utils_1.cwDir(), file));
        const unique = file_content_utils_1.getUniqueScss(files);
        const sorted = new Sort_1.Sort(params.sort).sort(unique);
        const buffers = sorted.map(file => {
            return fs_1.readFileSync(file);
        });
        const buff = Buffer.concat(buffers);
        let utfFormat = decoder.write(buff);
        if (dest) {
            logger_1.logger(`⏳ ⏳ ⏳ Saving result to ${dest}  ...`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUFrQztBQUNsQywrQkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLG1EQUErQztBQUMvQyx5Q0FBc0M7QUFDdEMsaURBQXVFO0FBQ3ZFLHFFQUE0RTtBQUM1RSw2Q0FBMEM7QUFDMUMsNkNBQTBDO0FBRzFDLE1BQU0sT0FBTyxHQUFHLElBQUksOEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUxQyxpQkFBUyxDQUNQLElBQXVCLEVBQ3ZCLElBQVksRUFDWixJQUF1QixFQUN2QixNQUFlLEVBQ2YsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFZLElBQUksZUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUVuRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCx5QkFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU1QixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxnQkFBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVyRCxNQUFNLE1BQU0sR0FBRyxrQ0FBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksV0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxNQUFNLENBQUMsaUJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1QsZUFBTSxDQUFDLDBCQUEwQixJQUFJLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLE1BQU0sR0FBRyxHQUFHLGtDQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztpQkFDekIsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVCxlQUFNLENBQUMsOENBQThDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNkLGVBQU0sQ0FBQyxVQUFVLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsZUFBTSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIGdsb2JieSBmcm9tICdnbG9iYnknO1xyXG5pbXBvcnQgeyBTdHJpbmdEZWNvZGVyIH0gZnJvbSAnc3RyaW5nX2RlY29kZXInO1xyXG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9oZWxwZXJzL1NvcnQnO1xyXG5pbXBvcnQgeyBjd0RpciwgcmVzb2x2ZURpckRlc3QsIHdyaXRlQXN5bmMgfSBmcm9tICcuL2hlbHBlcnMvZnMtdXRpbHMnO1xyXG5pbXBvcnQgeyBnZXRVbmlxdWVTY3NzLCByZW1vdmVJbXBvcnRzIH0gZnJvbSAnLi9oZWxwZXJzL2ZpbGUtY29udGVudC11dGlscyc7XHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vaGVscGVycy9sb2dnZXInO1xyXG5pbXBvcnQgeyBQYXJhbXMgfSBmcm9tICcuL2hlbHBlcnMvUGFyYW1zJztcclxuaW1wb3J0IHsgSVBhcmFtcyB9IGZyb20gJy4vaW50ZXJmYWNlL0lQYXJhbXMnO1xyXG5cclxuY29uc3QgZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKCd1dGY4Jyk7XHJcblxyXG5leHBvcnQgPSAoXHJcbiAgbWFzazogc3RyaW5nW10gfCBzdHJpbmcsXHJcbiAgZGVzdDogc3RyaW5nLFxyXG4gIHNvcnQ6IHN0cmluZ1tdIHwgc3RyaW5nLFxyXG4gIGNvbmZpZzogYm9vbGVhblxyXG4pID0+IHtcclxuICBjb25zdCBwYXJhbXM6IElQYXJhbXMgPSBuZXcgUGFyYW1zKG1hc2ssIGRlc3QsIHNvcnQsIGNvbmZpZykucGFyYW07XHJcblxyXG4gIGlmICghcGFyYW1zLm1hc2sgfHwgIXBhcmFtcy5tYXNrLmxlbmd0aCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCfim5Qg4puUIOKblCBQbGVhc2UgcHJvdmlkZSB0aGUgc3JjIGZvciBjb25jYXQgbWV0aG9kJyk7XHJcbiAgfVxyXG5cclxuICByZXNvbHZlRGlyRGVzdChwYXJhbXMuZGVzdCk7XHJcblxyXG4gIGNvbnN0IHNlYXJjaE1hc2sgPSBBcnJheS5pc0FycmF5KHBhcmFtcy5tYXNrKSA/IHBhcmFtcy5tYXNrIDogW3BhcmFtcy5tYXNrXTtcclxuXHJcbiAgcmV0dXJuIGdsb2JieShzZWFyY2hNYXNrKS50aGVuKHBhdGhzID0+IHtcclxuICAgIGNvbnN0IGZpbGVzID0gcGF0aHMubWFwKGZpbGUgPT4gam9pbihjd0RpcigpLCBmaWxlKSk7XHJcblxyXG4gICAgY29uc3QgdW5pcXVlID0gZ2V0VW5pcXVlU2NzcyhmaWxlcyk7XHJcbiAgICBjb25zdCBzb3J0ZWQgPSBuZXcgU29ydChwYXJhbXMuc29ydCkuc29ydCh1bmlxdWUpO1xyXG4gICAgY29uc3QgYnVmZmVycyA9IHNvcnRlZC5tYXAoZmlsZSA9PiB7XHJcbiAgICAgIHJldHVybiByZWFkRmlsZVN5bmMoZmlsZSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGJ1ZmYgPSBCdWZmZXIuY29uY2F0KGJ1ZmZlcnMpO1xyXG4gICAgbGV0IHV0ZkZvcm1hdCA9IGRlY29kZXIud3JpdGUoYnVmZik7XHJcblxyXG4gICAgaWYgKGRlc3QpIHtcclxuICAgICAgbG9nZ2VyKGDij7Mg4o+zIOKPsyBTYXZpbmcgcmVzdWx0IHRvICR7ZGVzdH0gIC4uLmApO1xyXG4gICAgICBjb25zdCB1dGYgPSByZW1vdmVJbXBvcnRzKHV0ZkZvcm1hdCk7XHJcbiAgICAgIHJldHVybiB3cml0ZUFzeW5jKGRlc3QsIHV0ZilcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBsb2dnZXIoYO2gve26gCDtoL3tuoAg7aC97bqAIFNBVkVEIFNVQ0NFU1NGVUxMWSBcXG5QbGVhc2UgY2hlY2sgJHtkZXN0fWApO1xyXG4gICAgICAgICAgcmV0dXJuIHV0ZjtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChyZWFzb24gPT4ge1xyXG4gICAgICAgICAgbG9nZ2VyKGDim5Qg4puUIOKblFxcbiR7cmVhc29ufWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9nZ2VyKCftoL3ts4EgUGxlYXNlIHByb3ZpZGUgZGVzdGluYXRpb24gb3B0aW9uICcpO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCftoL3ts4EgUGxlYXNlIHByb3ZpZGUgZGVzdGluYXRpb24gb3B0aW9uICcpO1xyXG4gIH0pO1xyXG59O1xyXG4iXX0=