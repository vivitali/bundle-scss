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
    const fullPath = path_1.join(process.cwd());
    const sortOrder = Array.isArray(sort) ? sort : [sort];
    const sortInstance = new Sort_1.Sort(sortOrder);
    if (!mask || !mask.length) {
        throw new Error('⛔ ⛔ ⛔ Please provide the src for concat method');
    }
    const searchMask = Array.isArray(mask) ? mask : [mask];
    return globby(searchMask).then(paths => {
        const files = paths.map(file => path_1.join(fullPath, file));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUFrQztBQUNsQywrQkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLG1EQUErQztBQUMvQyxtREFBNkM7QUFDN0MseUNBQXNDO0FBQ3RDLGlEQUFnRDtBQUNoRCxxRUFBNEU7QUFDNUUsNkNBQTBDO0FBRTFDLE1BQU0sT0FBTyxHQUFHLElBQUksOEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUxQyxpQkFBUyxDQUNQLElBQXVCLEVBQ3ZCLElBQVksRUFDWixPQUFpQixrQkFBTSxDQUFDLGVBQWUsRUFDdkMsRUFBRTtJQUNGLE1BQU0sUUFBUSxHQUFHLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNyQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxXQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNELE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNyQyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXRELE1BQU0sTUFBTSxHQUFHLGtDQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxpQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDVCxlQUFNLENBQUMsMEJBQTBCLElBQUksS0FBSyxDQUFDLENBQUM7WUFDNUMsTUFBTSxHQUFHLEdBQUcsa0NBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO2lCQUN6QixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNULGVBQU0sQ0FBQyw4Q0FBOEMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDN0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2QsZUFBTSxDQUFDLFVBQVUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxlQUFNLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tICdmcyc7XHJcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcclxuaW1wb3J0ICogYXMgZ2xvYmJ5IGZyb20gJ2dsb2JieSc7XHJcbmltcG9ydCB7IFN0cmluZ0RlY29kZXIgfSBmcm9tICdzdHJpbmdfZGVjb2Rlcic7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vaGVscGVycy9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9oZWxwZXJzL1NvcnQnO1xyXG5pbXBvcnQgeyB3cml0ZUFzeW5jIH0gZnJvbSAnLi9oZWxwZXJzL2ZzLXV0aWxzJztcclxuaW1wb3J0IHsgZ2V0VW5pcXVlU2NzcywgcmVtb3ZlSW1wb3J0cyB9IGZyb20gJy4vaGVscGVycy9maWxlLWNvbnRlbnQtdXRpbHMnO1xyXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL2hlbHBlcnMvbG9nZ2VyJztcclxuXHJcbmNvbnN0IGRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcigndXRmOCcpO1xyXG5cclxuZXhwb3J0ID0gKFxyXG4gIG1hc2s6IHN0cmluZ1tdIHwgc3RyaW5nLFxyXG4gIGRlc3Q6IHN0cmluZyxcclxuICBzb3J0OiBzdHJpbmdbXSA9IGNvbmZpZy5kZWZhdWx0UHJpb3JpdHlcclxuKSA9PiB7XHJcbiAgY29uc3QgZnVsbFBhdGggPSBqb2luKHByb2Nlc3MuY3dkKCkpO1xyXG4gIGNvbnN0IHNvcnRPcmRlciA9IEFycmF5LmlzQXJyYXkoc29ydCkgPyBzb3J0IDogW3NvcnRdO1xyXG4gIGNvbnN0IHNvcnRJbnN0YW5jZSA9IG5ldyBTb3J0KHNvcnRPcmRlcik7XHJcbiAgaWYgKCFtYXNrIHx8ICFtYXNrLmxlbmd0aCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCfim5Qg4puUIOKblCBQbGVhc2UgcHJvdmlkZSB0aGUgc3JjIGZvciBjb25jYXQgbWV0aG9kJyk7XHJcbiAgfVxyXG4gIGNvbnN0IHNlYXJjaE1hc2sgPSBBcnJheS5pc0FycmF5KG1hc2spID8gbWFzayA6IFttYXNrXTtcclxuICByZXR1cm4gZ2xvYmJ5KHNlYXJjaE1hc2spLnRoZW4ocGF0aHMgPT4ge1xyXG4gICAgY29uc3QgZmlsZXMgPSBwYXRocy5tYXAoZmlsZSA9PiBqb2luKGZ1bGxQYXRoLCBmaWxlKSk7XHJcblxyXG4gICAgY29uc3QgdW5pcXVlID0gZ2V0VW5pcXVlU2NzcyhmaWxlcyk7XHJcbiAgICBjb25zdCBzb3J0ZWQgPSBzb3J0SW5zdGFuY2Uuc29ydCh1bmlxdWUpO1xyXG4gICAgY29uc3QgYnVmZmVycyA9IHNvcnRlZC5tYXAoZmlsZSA9PiB7XHJcbiAgICAgIHJldHVybiByZWFkRmlsZVN5bmMoZmlsZSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGJ1ZmYgPSBCdWZmZXIuY29uY2F0KGJ1ZmZlcnMpO1xyXG4gICAgbGV0IHV0ZkZvcm1hdCA9IGRlY29kZXIud3JpdGUoYnVmZik7XHJcblxyXG4gICAgaWYgKGRlc3QpIHtcclxuICAgICAgbG9nZ2VyKGDij7Mg4o+zIOKPsyBTYXZpbmcgcmVzdWx0IHRvICR7ZGVzdH0uLi5gKTtcclxuICAgICAgY29uc3QgdXRmID0gcmVtb3ZlSW1wb3J0cyh1dGZGb3JtYXQpO1xyXG4gICAgICByZXR1cm4gd3JpdGVBc3luYyhkZXN0LCB1dGYpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgbG9nZ2VyKGDtoL3tuoAg7aC97bqAIO2gve26gCBTQVZFRCBTVUNDRVNTRlVMTFkgXFxuUGxlYXNlIGNoZWNrICR7ZGVzdH1gKTtcclxuICAgICAgICAgIHJldHVybiB1dGY7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2gocmVhc29uID0+IHtcclxuICAgICAgICAgIGxvZ2dlcihg4puUIOKblCDim5RcXG4ke3JlYXNvbn1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvZ2dlcign7aC97bOBIFBsZWFzZSBwcm92aWRlIGRlc3RpbmF0aW9uIG9wdGlvbiAnKTtcclxuICAgIHRocm93IG5ldyBFcnJvcign7aC97bOBIFBsZWFzZSBwcm92aWRlIGRlc3RpbmF0aW9uIG9wdGlvbiAnKTtcclxuICB9KTtcclxufTtcclxuIl19