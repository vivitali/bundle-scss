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
        if (params.dest) {
            logger_1.logger(`⏳ ⏳ ⏳ Saving result to ${params.dest}  ...`);
            const utf = file_content_utils_1.removeImports(utfFormat);
            return fs_utils_1.writeAsync(params.dest, utf)
                .then(() => {
                logger_1.logger(`🚀 🚀 🚀 SAVED SUCCESSFULLY \nPlease check ${params.dest}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUFrQztBQUNsQywrQkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLG1EQUErQztBQUMvQyx5Q0FBc0M7QUFDdEMsaURBQXVFO0FBQ3ZFLHFFQUE0RTtBQUM1RSw2Q0FBMEM7QUFDMUMsNkNBQTBDO0FBRzFDLE1BQU0sT0FBTyxHQUFHLElBQUksOEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUxQyxpQkFBUyxDQUNQLElBQXVCLEVBQ3ZCLElBQVksRUFDWixJQUF1QixFQUN2QixNQUFlLEVBQ2YsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFZLElBQUksZUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUVuRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCx5QkFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU1QixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxnQkFBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVyRCxNQUFNLE1BQU0sR0FBRyxrQ0FBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksV0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxNQUFNLENBQUMsaUJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoQixlQUFNLENBQUMsMEJBQTBCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDO1lBQ3JELE1BQU0sR0FBRyxHQUFHLGtDQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLHFCQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7aUJBQ2hDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1QsZUFBTSxDQUFDLDhDQUE4QyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDcEUsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2QsZUFBTSxDQUFDLFVBQVUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxlQUFNLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tICdmcyc7XHJcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcclxuaW1wb3J0ICogYXMgZ2xvYmJ5IGZyb20gJ2dsb2JieSc7XHJcbmltcG9ydCB7IFN0cmluZ0RlY29kZXIgfSBmcm9tICdzdHJpbmdfZGVjb2Rlcic7XHJcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL2hlbHBlcnMvU29ydCc7XHJcbmltcG9ydCB7IGN3RGlyLCByZXNvbHZlRGlyRGVzdCwgd3JpdGVBc3luYyB9IGZyb20gJy4vaGVscGVycy9mcy11dGlscyc7XHJcbmltcG9ydCB7IGdldFVuaXF1ZVNjc3MsIHJlbW92ZUltcG9ydHMgfSBmcm9tICcuL2hlbHBlcnMvZmlsZS1jb250ZW50LXV0aWxzJztcclxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi9oZWxwZXJzL2xvZ2dlcic7XHJcbmltcG9ydCB7IFBhcmFtcyB9IGZyb20gJy4vaGVscGVycy9QYXJhbXMnO1xyXG5pbXBvcnQgeyBJUGFyYW1zIH0gZnJvbSAnLi9pbnRlcmZhY2UvSVBhcmFtcyc7XHJcblxyXG5jb25zdCBkZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIoJ3V0ZjgnKTtcclxuXHJcbmV4cG9ydCA9IChcclxuICBtYXNrOiBzdHJpbmdbXSB8IHN0cmluZyxcclxuICBkZXN0OiBzdHJpbmcsXHJcbiAgc29ydDogc3RyaW5nW10gfCBzdHJpbmcsXHJcbiAgY29uZmlnOiBib29sZWFuXHJcbikgPT4ge1xyXG4gIGNvbnN0IHBhcmFtczogSVBhcmFtcyA9IG5ldyBQYXJhbXMobWFzaywgZGVzdCwgc29ydCwgY29uZmlnKS5wYXJhbTtcclxuXHJcbiAgaWYgKCFwYXJhbXMubWFzayB8fCAhcGFyYW1zLm1hc2subGVuZ3RoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ+KblCDim5Qg4puUIFBsZWFzZSBwcm92aWRlIHRoZSBzcmMgZm9yIGNvbmNhdCBtZXRob2QnKTtcclxuICB9XHJcblxyXG4gIHJlc29sdmVEaXJEZXN0KHBhcmFtcy5kZXN0KTtcclxuXHJcbiAgY29uc3Qgc2VhcmNoTWFzayA9IEFycmF5LmlzQXJyYXkocGFyYW1zLm1hc2spID8gcGFyYW1zLm1hc2sgOiBbcGFyYW1zLm1hc2tdO1xyXG5cclxuICByZXR1cm4gZ2xvYmJ5KHNlYXJjaE1hc2spLnRoZW4ocGF0aHMgPT4ge1xyXG4gICAgY29uc3QgZmlsZXMgPSBwYXRocy5tYXAoZmlsZSA9PiBqb2luKGN3RGlyKCksIGZpbGUpKTtcclxuXHJcbiAgICBjb25zdCB1bmlxdWUgPSBnZXRVbmlxdWVTY3NzKGZpbGVzKTtcclxuICAgIGNvbnN0IHNvcnRlZCA9IG5ldyBTb3J0KHBhcmFtcy5zb3J0KS5zb3J0KHVuaXF1ZSk7XHJcbiAgICBjb25zdCBidWZmZXJzID0gc29ydGVkLm1hcChmaWxlID0+IHtcclxuICAgICAgcmV0dXJuIHJlYWRGaWxlU3luYyhmaWxlKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgYnVmZiA9IEJ1ZmZlci5jb25jYXQoYnVmZmVycyk7XHJcbiAgICBsZXQgdXRmRm9ybWF0ID0gZGVjb2Rlci53cml0ZShidWZmKTtcclxuXHJcbiAgICBpZiAocGFyYW1zLmRlc3QpIHtcclxuICAgICAgbG9nZ2VyKGDij7Mg4o+zIOKPsyBTYXZpbmcgcmVzdWx0IHRvICR7cGFyYW1zLmRlc3R9ICAuLi5gKTtcclxuICAgICAgY29uc3QgdXRmID0gcmVtb3ZlSW1wb3J0cyh1dGZGb3JtYXQpO1xyXG4gICAgICByZXR1cm4gd3JpdGVBc3luYyhwYXJhbXMuZGVzdCwgdXRmKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGxvZ2dlcihg7aC97bqAIO2gve26gCDtoL3tuoAgU0FWRUQgU1VDQ0VTU0ZVTExZIFxcblBsZWFzZSBjaGVjayAke3BhcmFtcy5kZXN0fWApO1xyXG4gICAgICAgICAgcmV0dXJuIHV0ZjtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChyZWFzb24gPT4ge1xyXG4gICAgICAgICAgbG9nZ2VyKGDim5Qg4puUIOKblFxcbiR7cmVhc29ufWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9nZ2VyKCftoL3ts4EgUGxlYXNlIHByb3ZpZGUgZGVzdGluYXRpb24gb3B0aW9uICcpO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCftoL3ts4EgUGxlYXNlIHByb3ZpZGUgZGVzdGluYXRpb24gb3B0aW9uICcpO1xyXG4gIH0pO1xyXG59O1xyXG4iXX0=