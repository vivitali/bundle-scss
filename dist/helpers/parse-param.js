"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_utils_1 = require("./fs-utils");
const path_1 = require("path");
const constants_1 = require("./constants");
const logger_1 = require("./logger");
class Params {
    constructor(mask, dest, sort, config) {
        this.mask = mask;
        this.dest = dest;
        this.sort = sort || constants_1.mainConst.defaultPriority;
        this.packageConf = config
            ? this.readJson(path_1.join(fs_utils_1.cwDir(), constants_1.mainConst.packageJsonFile))
            : {};
        this.bundleConf = config
            ? this.readJson(path_1.join(fs_utils_1.cwDir(), constants_1.mainConst.bundleConfFile))
            : {};
        this.mergedParams = this.mergeParam();
    }
    readJson(filePath) {
        if (filePath) {
            const content = JSON.parse(fs_utils_1.readSync(filePath));
            console.warn(content, '-+-+-+-+_-+-+');
            return content;
        }
        logger_1.logger(`${filePath} not found`);
        return {};
    }
    mergeParam() {
        const packageConf = this.packageConf.bundleScss
            ? this.packageConf.bundleScss
            : {};
        return Object.assign({ mask: this.mask, dest: this.dest, sort: this.sort }, packageConf, this.bundleConf);
    }
    get param() {
        return this.mergedParams;
    }
}
exports.Params = Params;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtcGFyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9wYXJzZS1wYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUE2QztBQUM3QywrQkFBNEI7QUFDNUIsMkNBQXdDO0FBQ3hDLHFDQUFrQztBQUVsQztJQVVFLFlBQ0UsSUFBNEIsRUFDNUIsSUFBNEIsRUFDNUIsSUFBNEIsRUFDNUIsTUFBZTtRQUVmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLHFCQUFTLENBQUMsZUFBZSxDQUFDO1FBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTTtZQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFJLENBQUMsZ0JBQUssRUFBRSxFQUFFLHFCQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTTtZQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFJLENBQUMsZ0JBQUssRUFBRSxFQUFFLHFCQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxRQUFRLENBQUMsUUFBUTtRQUNmLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxlQUFNLENBQUMsR0FBRyxRQUFRLFlBQVksQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsVUFBVTtRQUNSLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVTtZQUM3QyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVO1lBQzdCLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDUCxNQUFNLGlCQUNKLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUNaLFdBQVcsRUFDWCxJQUFJLENBQUMsVUFBVSxFQUNsQjtJQUNKLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUF0REQsd0JBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3dEaXIsIHJlYWRTeW5jIH0gZnJvbSAnLi9mcy11dGlscyc7XHJcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgbWFpbkNvbnN0IH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFyYW1zIHtcclxuICBwcml2YXRlIG1hc2s6IEFycmF5PHN0cmluZz4gfCBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBkZXN0OiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nO1xyXG4gIHByaXZhdGUgc29ydDogQXJyYXk8c3RyaW5nPiB8IHN0cmluZztcclxuICBwcml2YXRlIHBhY2thZ2VDb25mOiB7XHJcbiAgICBidW5kbGVTY3NzPzogSVBhcmFtcztcclxuICB9O1xyXG4gIHByaXZhdGUgYnVuZGxlQ29uZjogSVBhcmFtcztcclxuICBwcml2YXRlIG1lcmdlZFBhcmFtczogSVBhcmFtcztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBtYXNrOiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nLFxyXG4gICAgZGVzdDogQXJyYXk8c3RyaW5nPiB8IHN0cmluZyxcclxuICAgIHNvcnQ6IEFycmF5PHN0cmluZz4gfCBzdHJpbmcsXHJcbiAgICBjb25maWc6IGJvb2xlYW5cclxuICApIHtcclxuICAgIHRoaXMubWFzayA9IG1hc2s7XHJcbiAgICB0aGlzLmRlc3QgPSBkZXN0O1xyXG4gICAgdGhpcy5zb3J0ID0gc29ydCB8fCBtYWluQ29uc3QuZGVmYXVsdFByaW9yaXR5O1xyXG4gICAgdGhpcy5wYWNrYWdlQ29uZiA9IGNvbmZpZ1xyXG4gICAgICA/IHRoaXMucmVhZEpzb24oam9pbihjd0RpcigpLCBtYWluQ29uc3QucGFja2FnZUpzb25GaWxlKSlcclxuICAgICAgOiB7fTtcclxuICAgIHRoaXMuYnVuZGxlQ29uZiA9IGNvbmZpZ1xyXG4gICAgICA/IHRoaXMucmVhZEpzb24oam9pbihjd0RpcigpLCBtYWluQ29uc3QuYnVuZGxlQ29uZkZpbGUpKVxyXG4gICAgICA6IHt9O1xyXG4gICAgdGhpcy5tZXJnZWRQYXJhbXMgPSB0aGlzLm1lcmdlUGFyYW0oKTtcclxuICB9XHJcblxyXG4gIHJlYWRKc29uKGZpbGVQYXRoKSB7XHJcbiAgICBpZiAoZmlsZVBhdGgpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IEpTT04ucGFyc2UocmVhZFN5bmMoZmlsZVBhdGgpKTtcclxuICAgICAgY29uc29sZS53YXJuKGNvbnRlbnQsICctKy0rLSstK18tKy0rJyk7XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG4gICAgbG9nZ2VyKGAke2ZpbGVQYXRofSBub3QgZm91bmRgKTtcclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIG1lcmdlUGFyYW0oKTogSVBhcmFtcyB7XHJcbiAgICBjb25zdCBwYWNrYWdlQ29uZiA9IHRoaXMucGFja2FnZUNvbmYuYnVuZGxlU2Nzc1xyXG4gICAgICA/IHRoaXMucGFja2FnZUNvbmYuYnVuZGxlU2Nzc1xyXG4gICAgICA6IHt9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWFzazogdGhpcy5tYXNrLFxyXG4gICAgICBkZXN0OiB0aGlzLmRlc3QsXHJcbiAgICAgIHNvcnQ6IHRoaXMuc29ydCxcclxuICAgICAgLi4ucGFja2FnZUNvbmYsXHJcbiAgICAgIC4uLnRoaXMuYnVuZGxlQ29uZixcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXQgcGFyYW0oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tZXJnZWRQYXJhbXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==