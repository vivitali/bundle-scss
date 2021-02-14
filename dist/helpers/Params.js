"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = void 0;
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
    compareOutputInputExtensions(param) {
        const maskExtension = Array.isArray(param.mask)
            ? param.mask.map((el) => fs_utils_1.fileType(el))
            : [fs_utils_1.fileType(param.mask)];
        return maskExtension.every((el) => el === fs_utils_1.fileType(param.dest));
    }
    readJson(filePath) {
        if (fs_utils_1.isFile(filePath)) {
            logger_1.logger(`Reading params from ${filePath}`);
            return JSON.parse(fs_utils_1.readSync(filePath));
        }
        logger_1.logger(`${filePath} not found`);
        return {};
    }
    mergeParam() {
        const packageConf = this.packageConf.bundleStyle
            ? this.packageConf.bundleStyle
            : {};
        const param = Object.assign(Object.assign({ mask: this.mask, dest: this.dest, sort: this.sort }, packageConf), this.bundleConf);
        if (!this.compareOutputInputExtensions(param)) {
            logger_1.logger('File extensions mask and dest should be the same');
        }
        return param;
    }
    get param() {
        return this.mergedParams;
    }
}
exports.Params = Params;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyYW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvUGFyYW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUErRDtBQUMvRCwrQkFBNEI7QUFDNUIsMkNBQXdDO0FBQ3hDLHFDQUFrQztBQUdsQyxNQUFhLE1BQU07SUFVakIsWUFDRSxJQUE0QixFQUM1QixJQUFZLEVBQ1osSUFBNEIsRUFDNUIsTUFBZTtRQUVmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLHFCQUFTLENBQUMsZUFBZSxDQUFDO1FBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTTtZQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFJLENBQUMsZ0JBQUssRUFBRSxFQUFFLHFCQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTTtZQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFJLENBQUMsZ0JBQUssRUFBRSxFQUFFLHFCQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCw0QkFBNEIsQ0FBQyxLQUFjO1FBQ3pDLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUM3QyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLG1CQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUMsbUJBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzQixPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxtQkFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTyxRQUFRLENBQUMsUUFBZ0I7UUFDL0IsSUFBSSxpQkFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BCLGVBQU0sQ0FBQyx1QkFBdUIsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMxQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsZUFBTSxDQUFDLEdBQUcsUUFBUSxZQUFZLENBQUMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFTyxVQUFVO1FBQ2hCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVztZQUM5QyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXO1lBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDUCxNQUFNLEtBQUssaUNBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQ1osV0FBVyxHQUNYLElBQUksQ0FBQyxVQUFVLENBQ25CLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzdDLGVBQU0sQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7Q0FDRjtBQWhFRCx3QkFnRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjd0RpciwgZmlsZVR5cGUsIGlzRmlsZSwgcmVhZFN5bmMgfSBmcm9tICcuL2ZzLXV0aWxzJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IG1haW5Db25zdCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IElQYXJhbXMgfSBmcm9tICcuLi9pbnRlcmZhY2UvSVBhcmFtcyc7XG5cbmV4cG9ydCBjbGFzcyBQYXJhbXMge1xuICBwcml2YXRlIG1hc2s6IEFycmF5PHN0cmluZz4gfCBzdHJpbmc7XG4gIHByaXZhdGUgZGVzdDogc3RyaW5nO1xuICBwcml2YXRlIHNvcnQ6IEFycmF5PHN0cmluZz4gfCBzdHJpbmc7XG4gIHByaXZhdGUgcGFja2FnZUNvbmY6IHtcbiAgICBidW5kbGVTdHlsZT86IElQYXJhbXM7XG4gIH07XG4gIHByaXZhdGUgYnVuZGxlQ29uZjogSVBhcmFtcztcbiAgcHJpdmF0ZSBtZXJnZWRQYXJhbXM6IElQYXJhbXM7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgbWFzazogQXJyYXk8c3RyaW5nPiB8IHN0cmluZyxcbiAgICBkZXN0OiBzdHJpbmcsXG4gICAgc29ydDogQXJyYXk8c3RyaW5nPiB8IHN0cmluZyxcbiAgICBjb25maWc6IGJvb2xlYW5cbiAgKSB7XG4gICAgdGhpcy5tYXNrID0gbWFzaztcbiAgICB0aGlzLmRlc3QgPSBkZXN0O1xuICAgIHRoaXMuc29ydCA9IHNvcnQgfHwgbWFpbkNvbnN0LmRlZmF1bHRQcmlvcml0eTtcbiAgICB0aGlzLnBhY2thZ2VDb25mID0gY29uZmlnXG4gICAgICA/IHRoaXMucmVhZEpzb24oam9pbihjd0RpcigpLCBtYWluQ29uc3QucGFja2FnZUpzb25GaWxlKSlcbiAgICAgIDoge307XG4gICAgdGhpcy5idW5kbGVDb25mID0gY29uZmlnXG4gICAgICA/IHRoaXMucmVhZEpzb24oam9pbihjd0RpcigpLCBtYWluQ29uc3QuYnVuZGxlQ29uZkZpbGUpKVxuICAgICAgOiB7fTtcbiAgICB0aGlzLm1lcmdlZFBhcmFtcyA9IHRoaXMubWVyZ2VQYXJhbSgpO1xuICB9XG5cbiAgY29tcGFyZU91dHB1dElucHV0RXh0ZW5zaW9ucyhwYXJhbTogSVBhcmFtcyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG1hc2tFeHRlbnNpb24gPSBBcnJheS5pc0FycmF5KHBhcmFtLm1hc2spXG4gICAgICA/IHBhcmFtLm1hc2subWFwKChlbCkgPT4gZmlsZVR5cGUoZWwpKVxuICAgICAgOiBbZmlsZVR5cGUocGFyYW0ubWFzayldO1xuICAgIHJldHVybiBtYXNrRXh0ZW5zaW9uLmV2ZXJ5KChlbCkgPT4gZWwgPT09IGZpbGVUeXBlKHBhcmFtLmRlc3QpKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZEpzb24oZmlsZVBhdGg6IHN0cmluZykge1xuICAgIGlmIChpc0ZpbGUoZmlsZVBhdGgpKSB7XG4gICAgICBsb2dnZXIoYFJlYWRpbmcgcGFyYW1zIGZyb20gJHtmaWxlUGF0aH1gKTtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlYWRTeW5jKGZpbGVQYXRoKSk7XG4gICAgfVxuICAgIGxvZ2dlcihgJHtmaWxlUGF0aH0gbm90IGZvdW5kYCk7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgcHJpdmF0ZSBtZXJnZVBhcmFtKCk6IElQYXJhbXMge1xuICAgIGNvbnN0IHBhY2thZ2VDb25mID0gdGhpcy5wYWNrYWdlQ29uZi5idW5kbGVTdHlsZVxuICAgICAgPyB0aGlzLnBhY2thZ2VDb25mLmJ1bmRsZVN0eWxlXG4gICAgICA6IHt9O1xuICAgIGNvbnN0IHBhcmFtID0ge1xuICAgICAgbWFzazogdGhpcy5tYXNrLFxuICAgICAgZGVzdDogdGhpcy5kZXN0LFxuICAgICAgc29ydDogdGhpcy5zb3J0LFxuICAgICAgLi4ucGFja2FnZUNvbmYsXG4gICAgICAuLi50aGlzLmJ1bmRsZUNvbmYsXG4gICAgfTtcbiAgICBpZiAoIXRoaXMuY29tcGFyZU91dHB1dElucHV0RXh0ZW5zaW9ucyhwYXJhbSkpIHtcbiAgICAgIGxvZ2dlcignRmlsZSBleHRlbnNpb25zIG1hc2sgYW5kIGRlc3Qgc2hvdWxkIGJlIHRoZSBzYW1lJyk7XG4gICAgfVxuICAgIHJldHVybiBwYXJhbTtcbiAgfVxuXG4gIGdldCBwYXJhbSgpIHtcbiAgICByZXR1cm4gdGhpcy5tZXJnZWRQYXJhbXM7XG4gIH1cbn1cbiJdfQ==