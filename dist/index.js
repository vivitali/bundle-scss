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
module.exports = (mask, dest, sort = constants_1.mainConst.defaultPriority) => {
    const sortOrder = Array.isArray(sort) ? sort : [sort];
    const sortInstance = new Sort_1.Sort(sortOrder);
    if (!mask || !mask.length) {
        throw new Error('⛔ ⛔ ⛔ Please provide the src for concat method');
    }
    const searchMask = Array.isArray(mask) ? mask : [mask];
    fs_utils_1.resolveDirDest(dest);
    return globby(searchMask).then(paths => {
        const files = paths.map(file => path_1.join(fs_utils_1.cwDir(), file));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUFrQztBQUNsQywrQkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLG1EQUErQztBQUMvQyxtREFBZ0Q7QUFDaEQseUNBQXNDO0FBQ3RDLGlEQUF1RTtBQUN2RSxxRUFBNEU7QUFDNUUsNkNBQTBDO0FBRTFDLE1BQU0sT0FBTyxHQUFHLElBQUksOEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUxQyxpQkFBUyxDQUNQLElBQXVCLEVBQ3ZCLElBQVksRUFDWixPQUFpQixxQkFBUyxDQUFDLGVBQWUsRUFDMUMsRUFBRTtJQUNGLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxNQUFNLFlBQVksR0FBRyxJQUFJLFdBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBQ0QsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXZELHlCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFckIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxnQkFBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVyRCxNQUFNLE1BQU0sR0FBRyxrQ0FBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxNQUFNLENBQUMsaUJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1QsZUFBTSxDQUFDLDBCQUEwQixJQUFJLEtBQUssQ0FBQyxDQUFDO1lBQzVDLE1BQU0sR0FBRyxHQUFHLGtDQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztpQkFDekIsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVCxlQUFNLENBQUMsOENBQThDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNkLGVBQU0sQ0FBQyxVQUFVLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsZUFBTSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIGdsb2JieSBmcm9tICdnbG9iYnknO1xyXG5pbXBvcnQgeyBTdHJpbmdEZWNvZGVyIH0gZnJvbSAnc3RyaW5nX2RlY29kZXInO1xyXG5pbXBvcnQgeyBtYWluQ29uc3QgfSBmcm9tICcuL2hlbHBlcnMvY29uc3RhbnRzJztcclxuaW1wb3J0IHsgU29ydCB9IGZyb20gJy4vaGVscGVycy9Tb3J0JztcclxuaW1wb3J0IHsgY3dEaXIsIHJlc29sdmVEaXJEZXN0LCB3cml0ZUFzeW5jIH0gZnJvbSAnLi9oZWxwZXJzL2ZzLXV0aWxzJztcclxuaW1wb3J0IHsgZ2V0VW5pcXVlU2NzcywgcmVtb3ZlSW1wb3J0cyB9IGZyb20gJy4vaGVscGVycy9maWxlLWNvbnRlbnQtdXRpbHMnO1xyXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL2hlbHBlcnMvbG9nZ2VyJztcclxuXHJcbmNvbnN0IGRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcigndXRmOCcpO1xyXG5cclxuZXhwb3J0ID0gKFxyXG4gIG1hc2s6IHN0cmluZ1tdIHwgc3RyaW5nLFxyXG4gIGRlc3Q6IHN0cmluZyxcclxuICBzb3J0OiBzdHJpbmdbXSA9IG1haW5Db25zdC5kZWZhdWx0UHJpb3JpdHlcclxuKSA9PiB7XHJcbiAgY29uc3Qgc29ydE9yZGVyID0gQXJyYXkuaXNBcnJheShzb3J0KSA/IHNvcnQgOiBbc29ydF07XHJcbiAgY29uc3Qgc29ydEluc3RhbmNlID0gbmV3IFNvcnQoc29ydE9yZGVyKTtcclxuICBpZiAoIW1hc2sgfHwgIW1hc2subGVuZ3RoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ+KblCDim5Qg4puUIFBsZWFzZSBwcm92aWRlIHRoZSBzcmMgZm9yIGNvbmNhdCBtZXRob2QnKTtcclxuICB9XHJcbiAgY29uc3Qgc2VhcmNoTWFzayA9IEFycmF5LmlzQXJyYXkobWFzaykgPyBtYXNrIDogW21hc2tdO1xyXG5cclxuICByZXNvbHZlRGlyRGVzdChkZXN0KTtcclxuXHJcbiAgcmV0dXJuIGdsb2JieShzZWFyY2hNYXNrKS50aGVuKHBhdGhzID0+IHtcclxuICAgIGNvbnN0IGZpbGVzID0gcGF0aHMubWFwKGZpbGUgPT4gam9pbihjd0RpcigpLCBmaWxlKSk7XHJcblxyXG4gICAgY29uc3QgdW5pcXVlID0gZ2V0VW5pcXVlU2NzcyhmaWxlcyk7XHJcbiAgICBjb25zdCBzb3J0ZWQgPSBzb3J0SW5zdGFuY2Uuc29ydCh1bmlxdWUpO1xyXG4gICAgY29uc3QgYnVmZmVycyA9IHNvcnRlZC5tYXAoZmlsZSA9PiB7XHJcbiAgICAgIHJldHVybiByZWFkRmlsZVN5bmMoZmlsZSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGJ1ZmYgPSBCdWZmZXIuY29uY2F0KGJ1ZmZlcnMpO1xyXG4gICAgbGV0IHV0ZkZvcm1hdCA9IGRlY29kZXIud3JpdGUoYnVmZik7XHJcblxyXG4gICAgaWYgKGRlc3QpIHtcclxuICAgICAgbG9nZ2VyKGDij7Mg4o+zIOKPsyBTYXZpbmcgcmVzdWx0IHRvICR7ZGVzdH0uLi5gKTtcclxuICAgICAgY29uc3QgdXRmID0gcmVtb3ZlSW1wb3J0cyh1dGZGb3JtYXQpO1xyXG4gICAgICByZXR1cm4gd3JpdGVBc3luYyhkZXN0LCB1dGYpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgbG9nZ2VyKGDtoL3tuoAg7aC97bqAIO2gve26gCBTQVZFRCBTVUNDRVNTRlVMTFkgXFxuUGxlYXNlIGNoZWNrICR7ZGVzdH1gKTtcclxuICAgICAgICAgIHJldHVybiB1dGY7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2gocmVhc29uID0+IHtcclxuICAgICAgICAgIGxvZ2dlcihg4puUIOKblCDim5RcXG4ke3JlYXNvbn1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvZ2dlcign7aC97bOBIFBsZWFzZSBwcm92aWRlIGRlc3RpbmF0aW9uIG9wdGlvbiAnKTtcclxuICAgIHRocm93IG5ldyBFcnJvcign7aC97bOBIFBsZWFzZSBwcm92aWRlIGRlc3RpbmF0aW9uIG9wdGlvbiAnKTtcclxuICB9KTtcclxufTtcclxuIl19