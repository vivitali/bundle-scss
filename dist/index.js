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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUFrQztBQUNsQywrQkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLG1EQUErQztBQUMvQyx5Q0FBc0M7QUFDdEMsaURBQXVFO0FBQ3ZFLHFFQUE0RTtBQUM1RSw2Q0FBMEM7QUFDMUMsNkNBQTBDO0FBRzFDLE1BQU0sT0FBTyxHQUFHLElBQUksOEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUxQyxpQkFBUyxDQUNQLElBQXVCLEVBQ3ZCLElBQVksRUFDWixJQUF1QixFQUN2QixNQUFlLEVBQ2YsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFZLElBQUksZUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUVuRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCx5QkFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU1QixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxnQkFBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVyRCxNQUFNLE1BQU0sR0FBRyxrQ0FBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksV0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxNQUFNLENBQUMsaUJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1QsZUFBTSxDQUFDLDBCQUEwQixJQUFJLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLE1BQU0sR0FBRyxHQUFHLGtDQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztpQkFDekIsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVCxlQUFNLENBQUMsOENBQThDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNkLGVBQU0sQ0FBQyxVQUFVLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsZUFBTSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIGdsb2JieSBmcm9tICdnbG9iYnknO1xyXG5pbXBvcnQgeyBTdHJpbmdEZWNvZGVyIH0gZnJvbSAnc3RyaW5nX2RlY29kZXInO1xyXG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9oZWxwZXJzL1NvcnQnO1xyXG5pbXBvcnQgeyBjd0RpciwgcmVzb2x2ZURpckRlc3QsIHdyaXRlQXN5bmMgfSBmcm9tICcuL2hlbHBlcnMvZnMtdXRpbHMnO1xyXG5pbXBvcnQgeyBnZXRVbmlxdWVTY3NzLCByZW1vdmVJbXBvcnRzIH0gZnJvbSAnLi9oZWxwZXJzL2ZpbGUtY29udGVudC11dGlscyc7XHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vaGVscGVycy9sb2dnZXInO1xyXG5pbXBvcnQgeyBQYXJhbXMgfSBmcm9tICcuL2hlbHBlcnMvUGFyYW1zJztcclxuaW1wb3J0IHsgSVBhcmFtcyB9IGZyb20gXCIuL2ludGVyZmFjZS9JUGFyYW1zXCI7XHJcblxyXG5jb25zdCBkZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIoJ3V0ZjgnKTtcclxuXHJcbmV4cG9ydCA9IChcclxuICBtYXNrOiBzdHJpbmdbXSB8IHN0cmluZyxcclxuICBkZXN0OiBzdHJpbmcsXHJcbiAgc29ydDogc3RyaW5nW10gfCBzdHJpbmcsXHJcbiAgY29uZmlnOiBib29sZWFuXHJcbikgPT4ge1xyXG4gIGNvbnN0IHBhcmFtczogSVBhcmFtcyA9IG5ldyBQYXJhbXMobWFzaywgZGVzdCwgc29ydCwgY29uZmlnKS5wYXJhbTtcclxuXHJcbiAgaWYgKCFwYXJhbXMubWFzayB8fCAhcGFyYW1zLm1hc2subGVuZ3RoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ+KblCDim5Qg4puUIFBsZWFzZSBwcm92aWRlIHRoZSBzcmMgZm9yIGNvbmNhdCBtZXRob2QnKTtcclxuICB9XHJcblxyXG4gIHJlc29sdmVEaXJEZXN0KHBhcmFtcy5kZXN0KTtcclxuXHJcbiAgY29uc3Qgc2VhcmNoTWFzayA9IEFycmF5LmlzQXJyYXkocGFyYW1zLm1hc2spID8gcGFyYW1zLm1hc2sgOiBbcGFyYW1zLm1hc2tdO1xyXG5cclxuICByZXR1cm4gZ2xvYmJ5KHNlYXJjaE1hc2spLnRoZW4ocGF0aHMgPT4ge1xyXG4gICAgY29uc3QgZmlsZXMgPSBwYXRocy5tYXAoZmlsZSA9PiBqb2luKGN3RGlyKCksIGZpbGUpKTtcclxuXHJcbiAgICBjb25zdCB1bmlxdWUgPSBnZXRVbmlxdWVTY3NzKGZpbGVzKTtcclxuICAgIGNvbnN0IHNvcnRlZCA9IG5ldyBTb3J0KHBhcmFtcy5zb3J0KS5zb3J0KHVuaXF1ZSk7XHJcbiAgICBjb25zdCBidWZmZXJzID0gc29ydGVkLm1hcChmaWxlID0+IHtcclxuICAgICAgcmV0dXJuIHJlYWRGaWxlU3luYyhmaWxlKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgYnVmZiA9IEJ1ZmZlci5jb25jYXQoYnVmZmVycyk7XHJcbiAgICBsZXQgdXRmRm9ybWF0ID0gZGVjb2Rlci53cml0ZShidWZmKTtcclxuXHJcbiAgICBpZiAoZGVzdCkge1xyXG4gICAgICBsb2dnZXIoYOKPsyDij7Mg4o+zIFNhdmluZyByZXN1bHQgdG8gJHtkZXN0fSAgLi4uYCk7XHJcbiAgICAgIGNvbnN0IHV0ZiA9IHJlbW92ZUltcG9ydHModXRmRm9ybWF0KTtcclxuICAgICAgcmV0dXJuIHdyaXRlQXN5bmMoZGVzdCwgdXRmKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGxvZ2dlcihg7aC97bqAIO2gve26gCDtoL3tuoAgU0FWRUQgU1VDQ0VTU0ZVTExZIFxcblBsZWFzZSBjaGVjayAke2Rlc3R9YCk7XHJcbiAgICAgICAgICByZXR1cm4gdXRmO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKHJlYXNvbiA9PiB7XHJcbiAgICAgICAgICBsb2dnZXIoYOKblCDim5Qg4puUXFxuJHtyZWFzb259YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsb2dnZXIoJ+2gve2zgSBQbGVhc2UgcHJvdmlkZSBkZXN0aW5hdGlvbiBvcHRpb24gJyk7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ+2gve2zgSBQbGVhc2UgcHJvdmlkZSBkZXN0aW5hdGlvbiBvcHRpb24gJyk7XHJcbiAgfSk7XHJcbn07XHJcbiJdfQ==