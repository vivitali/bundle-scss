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
        if (fs_utils_1.isFile(filePath)) {
            return JSON.parse(fs_utils_1.readSync(filePath));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyYW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvUGFyYW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQXFEO0FBQ3JELCtCQUE0QjtBQUM1QiwyQ0FBd0M7QUFDeEMscUNBQWtDO0FBR2xDO0lBVUUsWUFDRSxJQUE0QixFQUM1QixJQUFZLEVBQ1osSUFBNEIsRUFDNUIsTUFBZTtRQUVmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLHFCQUFTLENBQUMsZUFBZSxDQUFDO1FBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTTtZQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFJLENBQUMsZ0JBQUssRUFBRSxFQUFFLHFCQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTTtZQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFJLENBQUMsZ0JBQUssRUFBRSxFQUFFLHFCQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTyxRQUFRLENBQUMsUUFBUTtRQUN2QixFQUFFLENBQUMsQ0FBQyxpQkFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUNELGVBQU0sQ0FBQyxHQUFHLFFBQVEsWUFBWSxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFTyxVQUFVO1FBQ2hCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVTtZQUM3QyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVO1lBQzdCLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDUCxNQUFNLGlCQUNKLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUNaLFdBQVcsRUFDWCxJQUFJLENBQUMsVUFBVSxFQUNsQjtJQUNKLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUFwREQsd0JBb0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3dEaXIsIGlzRmlsZSwgcmVhZFN5bmMgfSBmcm9tICcuL2ZzLXV0aWxzJztcclxuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBtYWluQ29uc3QgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuaW1wb3J0IHsgSVBhcmFtcyB9IGZyb20gJy4uL2ludGVyZmFjZS9JUGFyYW1zJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJhbXMge1xyXG4gIHByaXZhdGUgbWFzazogQXJyYXk8c3RyaW5nPiB8IHN0cmluZztcclxuICBwcml2YXRlIGRlc3Q6IHN0cmluZztcclxuICBwcml2YXRlIHNvcnQ6IEFycmF5PHN0cmluZz4gfCBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBwYWNrYWdlQ29uZjoge1xyXG4gICAgYnVuZGxlU2Nzcz86IElQYXJhbXM7XHJcbiAgfTtcclxuICBwcml2YXRlIGJ1bmRsZUNvbmY6IElQYXJhbXM7XHJcbiAgcHJpdmF0ZSBtZXJnZWRQYXJhbXM6IElQYXJhbXM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbWFzazogQXJyYXk8c3RyaW5nPiB8IHN0cmluZyxcclxuICAgIGRlc3Q6IHN0cmluZyxcclxuICAgIHNvcnQ6IEFycmF5PHN0cmluZz4gfCBzdHJpbmcsXHJcbiAgICBjb25maWc6IGJvb2xlYW5cclxuICApIHtcclxuICAgIHRoaXMubWFzayA9IG1hc2s7XHJcbiAgICB0aGlzLmRlc3QgPSBkZXN0O1xyXG4gICAgdGhpcy5zb3J0ID0gc29ydCB8fCBtYWluQ29uc3QuZGVmYXVsdFByaW9yaXR5O1xyXG4gICAgdGhpcy5wYWNrYWdlQ29uZiA9IGNvbmZpZ1xyXG4gICAgICA/IHRoaXMucmVhZEpzb24oam9pbihjd0RpcigpLCBtYWluQ29uc3QucGFja2FnZUpzb25GaWxlKSlcclxuICAgICAgOiB7fTtcclxuICAgIHRoaXMuYnVuZGxlQ29uZiA9IGNvbmZpZ1xyXG4gICAgICA/IHRoaXMucmVhZEpzb24oam9pbihjd0RpcigpLCBtYWluQ29uc3QuYnVuZGxlQ29uZkZpbGUpKVxyXG4gICAgICA6IHt9O1xyXG4gICAgdGhpcy5tZXJnZWRQYXJhbXMgPSB0aGlzLm1lcmdlUGFyYW0oKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVhZEpzb24oZmlsZVBhdGgpIHtcclxuICAgIGlmIChpc0ZpbGUoZmlsZVBhdGgpKSB7XHJcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlYWRTeW5jKGZpbGVQYXRoKSk7XHJcbiAgICB9XHJcbiAgICBsb2dnZXIoYCR7ZmlsZVBhdGh9IG5vdCBmb3VuZGApO1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtZXJnZVBhcmFtKCk6IElQYXJhbXMge1xyXG4gICAgY29uc3QgcGFja2FnZUNvbmYgPSB0aGlzLnBhY2thZ2VDb25mLmJ1bmRsZVNjc3NcclxuICAgICAgPyB0aGlzLnBhY2thZ2VDb25mLmJ1bmRsZVNjc3NcclxuICAgICAgOiB7fTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1hc2s6IHRoaXMubWFzayxcclxuICAgICAgZGVzdDogdGhpcy5kZXN0LFxyXG4gICAgICBzb3J0OiB0aGlzLnNvcnQsXHJcbiAgICAgIC4uLnBhY2thZ2VDb25mLFxyXG4gICAgICAuLi50aGlzLmJ1bmRsZUNvbmYsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhcmFtKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubWVyZ2VkUGFyYW1zO1xyXG4gIH1cclxufVxyXG4iXX0=