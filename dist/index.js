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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUFrQztBQUNsQywrQkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLG1EQUErQztBQUMvQyx5Q0FBc0M7QUFDdEMsaURBSzRCO0FBQzVCLHFFQUdzQztBQUN0Qyw2Q0FBMEM7QUFDMUMsNkNBQTBDO0FBRzFDLE1BQU0sT0FBTyxHQUFHLElBQUksOEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUxQyxpQkFBUyxDQUNQLElBQXVCLEVBQ3ZCLElBQVksRUFDWixJQUF1QixFQUN2QixNQUFlLEVBQ2YsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFZLElBQUksZUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUVuRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCx5QkFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU1QixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxnQkFBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyRCxNQUFNLGFBQWEsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxNQUFNLE1BQU0sR0FBRyx3Q0FBbUIsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDekQsTUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxpQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLGVBQU0sQ0FBQyxvQkFBb0IsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUM7WUFDN0MsTUFBTSxHQUFHLEdBQUcsa0NBQWEsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLHFCQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7aUJBQ2hDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1QsZUFBTSxDQUFDLG9DQUFvQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDMUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2QsZUFBTSxDQUFDLEtBQUssTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxlQUFNLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUM1QyxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDdkQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tICdmcyc7XHJcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcclxuaW1wb3J0ICogYXMgZ2xvYmJ5IGZyb20gJ2dsb2JieSc7XHJcbmltcG9ydCB7IFN0cmluZ0RlY29kZXIgfSBmcm9tICdzdHJpbmdfZGVjb2Rlcic7XHJcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL2hlbHBlcnMvU29ydCc7XHJcbmltcG9ydCB7XHJcbiAgY3dEaXIsXHJcbiAgZmlsZVR5cGUsXHJcbiAgcmVzb2x2ZURpckRlc3QsXHJcbiAgd3JpdGVBc3luYyxcclxufSBmcm9tICcuL2hlbHBlcnMvZnMtdXRpbHMnO1xyXG5pbXBvcnQge1xyXG4gIGdldFVuaXF1ZVN0eWxlRmlsZXMsXHJcbiAgcmVtb3ZlSW1wb3J0cyxcclxufSBmcm9tICcuL2hlbHBlcnMvZmlsZS1jb250ZW50LXV0aWxzJztcclxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi9oZWxwZXJzL2xvZ2dlcic7XHJcbmltcG9ydCB7IFBhcmFtcyB9IGZyb20gJy4vaGVscGVycy9QYXJhbXMnO1xyXG5pbXBvcnQgeyBJUGFyYW1zIH0gZnJvbSAnLi9pbnRlcmZhY2UvSVBhcmFtcyc7XHJcblxyXG5jb25zdCBkZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIoJ3V0ZjgnKTtcclxuXHJcbmV4cG9ydCA9IChcclxuICBtYXNrOiBzdHJpbmdbXSB8IHN0cmluZyxcclxuICBkZXN0OiBzdHJpbmcsXHJcbiAgc29ydDogc3RyaW5nW10gfCBzdHJpbmcsXHJcbiAgY29uZmlnOiBib29sZWFuXHJcbikgPT4ge1xyXG4gIGNvbnN0IHBhcmFtczogSVBhcmFtcyA9IG5ldyBQYXJhbXMobWFzaywgZGVzdCwgc29ydCwgY29uZmlnKS5wYXJhbTtcclxuXHJcbiAgaWYgKCFwYXJhbXMubWFzayB8fCAhcGFyYW1zLm1hc2subGVuZ3RoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIHRoZSBzcmMgZm9yIGNvbmNhdCBtZXRob2QnKTtcclxuICB9XHJcblxyXG4gIHJlc29sdmVEaXJEZXN0KHBhcmFtcy5kZXN0KTtcclxuXHJcbiAgY29uc3Qgc2VhcmNoTWFzayA9IEFycmF5LmlzQXJyYXkocGFyYW1zLm1hc2spID8gcGFyYW1zLm1hc2sgOiBbcGFyYW1zLm1hc2tdO1xyXG5cclxuICByZXR1cm4gZ2xvYmJ5KHNlYXJjaE1hc2spLnRoZW4ocGF0aHMgPT4ge1xyXG4gICAgY29uc3QgZmlsZXMgPSBwYXRocy5tYXAoZmlsZSA9PiBqb2luKGN3RGlyKCksIGZpbGUpKTtcclxuICAgIGNvbnN0IGZpbGVFeHRlbnNpb24gPSBmaWxlVHlwZShwYXJhbXMuZGVzdCk7XHJcbiAgICBjb25zdCB1bmlxdWUgPSBnZXRVbmlxdWVTdHlsZUZpbGVzKGZpbGVzLCBmaWxlRXh0ZW5zaW9uKTtcclxuICAgIGNvbnN0IHNvcnRlZCA9IG5ldyBTb3J0KHBhcmFtcy5zb3J0KS5zb3J0KHVuaXF1ZSk7XHJcbiAgICBjb25zdCBidWZmZXJzID0gc29ydGVkLm1hcChmaWxlID0+IHtcclxuICAgICAgcmV0dXJuIHJlYWRGaWxlU3luYyhmaWxlKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgYnVmZiA9IEJ1ZmZlci5jb25jYXQoYnVmZmVycyk7XHJcbiAgICBsZXQgdXRmRm9ybWF0ID0gZGVjb2Rlci53cml0ZShidWZmKTtcclxuXHJcbiAgICBpZiAocGFyYW1zLmRlc3QpIHtcclxuICAgICAgbG9nZ2VyKGBTYXZpbmcgcmVzdWx0IHRvICR7cGFyYW1zLmRlc3R9Li4uYCk7XHJcbiAgICAgIGNvbnN0IHV0ZiA9IHJlbW92ZUltcG9ydHModXRmRm9ybWF0LCBmaWxlRXh0ZW5zaW9uKTtcclxuICAgICAgcmV0dXJuIHdyaXRlQXN5bmMocGFyYW1zLmRlc3QsIHV0ZilcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBsb2dnZXIoYFNBVkVEIFNVQ0NFU1NGVUxMWSEgUGxlYXNlIGNoZWNrICR7cGFyYW1zLmRlc3R9YCk7XHJcbiAgICAgICAgICByZXR1cm4gdXRmO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKHJlYXNvbiA9PiB7XHJcbiAgICAgICAgICBsb2dnZXIoYFxcbiR7cmVhc29ufWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9nZ2VyKCdQbGVhc2UgcHJvdmlkZSBkZXN0aW5hdGlvbiBvcHRpb24nKTtcclxuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgZGVzdGluYXRpb24gb3B0aW9uJyk7XHJcbiAgfSk7XHJcbn07XHJcbiJdfQ==