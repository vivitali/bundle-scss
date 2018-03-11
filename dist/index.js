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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUFrQztBQUNsQywrQkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLG1EQUErQztBQUMvQyx5Q0FBc0M7QUFDdEMsaURBQXVFO0FBQ3ZFLHFFQUE0RTtBQUM1RSw2Q0FBMEM7QUFDMUMsNkNBQTBDO0FBRTFDLE1BQU0sT0FBTyxHQUFHLElBQUksOEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUxQyxpQkFBUyxDQUNQLElBQXVCLEVBQ3ZCLElBQVksRUFDWixJQUF1QixFQUN2QixNQUFlLEVBQ2YsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUUxRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCx5QkFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU1QixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxnQkFBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVyRCxNQUFNLE1BQU0sR0FBRyxrQ0FBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksV0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxNQUFNLENBQUMsaUJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1QsZUFBTSxDQUFDLDBCQUEwQixJQUFJLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLE1BQU0sR0FBRyxHQUFHLGtDQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztpQkFDekIsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVCxlQUFNLENBQUMsOENBQThDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNkLGVBQU0sQ0FBQyxVQUFVLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsZUFBTSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIGdsb2JieSBmcm9tICdnbG9iYnknO1xyXG5pbXBvcnQgeyBTdHJpbmdEZWNvZGVyIH0gZnJvbSAnc3RyaW5nX2RlY29kZXInO1xyXG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9oZWxwZXJzL1NvcnQnO1xyXG5pbXBvcnQgeyBjd0RpciwgcmVzb2x2ZURpckRlc3QsIHdyaXRlQXN5bmMgfSBmcm9tICcuL2hlbHBlcnMvZnMtdXRpbHMnO1xyXG5pbXBvcnQgeyBnZXRVbmlxdWVTY3NzLCByZW1vdmVJbXBvcnRzIH0gZnJvbSAnLi9oZWxwZXJzL2ZpbGUtY29udGVudC11dGlscyc7XHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vaGVscGVycy9sb2dnZXInO1xyXG5pbXBvcnQgeyBQYXJhbXMgfSBmcm9tICcuL2hlbHBlcnMvUGFyYW1zJztcclxuXHJcbmNvbnN0IGRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcigndXRmOCcpO1xyXG5cclxuZXhwb3J0ID0gKFxyXG4gIG1hc2s6IHN0cmluZ1tdIHwgc3RyaW5nLFxyXG4gIGRlc3Q6IHN0cmluZyxcclxuICBzb3J0OiBzdHJpbmdbXSB8IHN0cmluZyxcclxuICBjb25maWc6IGJvb2xlYW5cclxuKSA9PiB7XHJcbiAgY29uc3QgcGFyYW1zID0gbmV3IFBhcmFtcyhtYXNrLCBkZXN0LCBzb3J0LCBjb25maWcpLnBhcmFtO1xyXG5cclxuICBpZiAoIXBhcmFtcy5tYXNrIHx8ICFwYXJhbXMubWFzay5sZW5ndGgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcign4puUIOKblCDim5QgUGxlYXNlIHByb3ZpZGUgdGhlIHNyYyBmb3IgY29uY2F0IG1ldGhvZCcpO1xyXG4gIH1cclxuXHJcbiAgcmVzb2x2ZURpckRlc3QocGFyYW1zLmRlc3QpO1xyXG5cclxuICBjb25zdCBzZWFyY2hNYXNrID0gQXJyYXkuaXNBcnJheShwYXJhbXMubWFzaykgPyBwYXJhbXMubWFzayA6IFtwYXJhbXMubWFza107XHJcblxyXG4gIHJldHVybiBnbG9iYnkoc2VhcmNoTWFzaykudGhlbihwYXRocyA9PiB7XHJcbiAgICBjb25zdCBmaWxlcyA9IHBhdGhzLm1hcChmaWxlID0+IGpvaW4oY3dEaXIoKSwgZmlsZSkpO1xyXG5cclxuICAgIGNvbnN0IHVuaXF1ZSA9IGdldFVuaXF1ZVNjc3MoZmlsZXMpO1xyXG4gICAgY29uc3Qgc29ydGVkID0gbmV3IFNvcnQocGFyYW1zLnNvcnQpLnNvcnQodW5pcXVlKTtcclxuICAgIGNvbnN0IGJ1ZmZlcnMgPSBzb3J0ZWQubWFwKGZpbGUgPT4ge1xyXG4gICAgICByZXR1cm4gcmVhZEZpbGVTeW5jKGZpbGUpO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBidWZmID0gQnVmZmVyLmNvbmNhdChidWZmZXJzKTtcclxuICAgIGxldCB1dGZGb3JtYXQgPSBkZWNvZGVyLndyaXRlKGJ1ZmYpO1xyXG5cclxuICAgIGlmIChkZXN0KSB7XHJcbiAgICAgIGxvZ2dlcihg4o+zIOKPsyDij7MgU2F2aW5nIHJlc3VsdCB0byAke2Rlc3R9ICAuLi5gKTtcclxuICAgICAgY29uc3QgdXRmID0gcmVtb3ZlSW1wb3J0cyh1dGZGb3JtYXQpO1xyXG4gICAgICByZXR1cm4gd3JpdGVBc3luYyhkZXN0LCB1dGYpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgbG9nZ2VyKGDtoL3tuoAg7aC97bqAIO2gve26gCBTQVZFRCBTVUNDRVNTRlVMTFkgXFxuUGxlYXNlIGNoZWNrICR7ZGVzdH1gKTtcclxuICAgICAgICAgIHJldHVybiB1dGY7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2gocmVhc29uID0+IHtcclxuICAgICAgICAgIGxvZ2dlcihg4puUIOKblCDim5RcXG4ke3JlYXNvbn1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvZ2dlcign7aC97bOBIFBsZWFzZSBwcm92aWRlIGRlc3RpbmF0aW9uIG9wdGlvbiAnKTtcclxuICAgIHRocm93IG5ldyBFcnJvcign7aC97bOBIFBsZWFzZSBwcm92aWRlIGRlc3RpbmF0aW9uIG9wdGlvbiAnKTtcclxuICB9KTtcclxufTtcclxuIl19