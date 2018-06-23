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
    compareOutputInputExtensions(param) {
        const maskExtension = Array.isArray(param.mask)
            ? param.mask.map(el => fs_utils_1.fileType(el))
            : [fs_utils_1.fileType(param.mask)];
        return maskExtension.every(el => el === fs_utils_1.fileType(param.dest));
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
        const param = Object.assign({ mask: this.mask, dest: this.dest, sort: this.sort }, packageConf, this.bundleConf);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyYW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvUGFyYW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQStEO0FBQy9ELCtCQUE0QjtBQUM1QiwyQ0FBd0M7QUFDeEMscUNBQWtDO0FBR2xDO0lBVUUsWUFDRSxJQUE0QixFQUM1QixJQUFZLEVBQ1osSUFBNEIsRUFDNUIsTUFBZTtRQUVmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLHFCQUFTLENBQUMsZUFBZSxDQUFDO1FBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTTtZQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFJLENBQUMsZ0JBQUssRUFBRSxFQUFFLHFCQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTTtZQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFJLENBQUMsZ0JBQUssRUFBRSxFQUFFLHFCQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCw0QkFBNEIsQ0FBQyxLQUFjO1FBQ3pDLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUM3QyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDLG1CQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0IsT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLG1CQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVPLFFBQVEsQ0FBQyxRQUFnQjtRQUMvQixJQUFJLGlCQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDcEIsZUFBTSxDQUFDLHVCQUF1QixRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDdkM7UUFDRCxlQUFNLENBQUMsR0FBRyxRQUFRLFlBQVksQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVPLFVBQVU7UUFDaEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXO1lBQzlDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7WUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLE1BQU0sS0FBSyxtQkFDVCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksSUFDWixXQUFXLEVBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FDbkIsQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0MsZUFBTSxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDNUQ7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztDQUNGO0FBaEVELHdCQWdFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGN3RGlyLCBmaWxlVHlwZSwgaXNGaWxlLCByZWFkU3luYyB9IGZyb20gJy4vZnMtdXRpbHMnO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IG1haW5Db25zdCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5pbXBvcnQgeyBJUGFyYW1zIH0gZnJvbSAnLi4vaW50ZXJmYWNlL0lQYXJhbXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcmFtcyB7XHJcbiAgcHJpdmF0ZSBtYXNrOiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nO1xyXG4gIHByaXZhdGUgZGVzdDogc3RyaW5nO1xyXG4gIHByaXZhdGUgc29ydDogQXJyYXk8c3RyaW5nPiB8IHN0cmluZztcclxuICBwcml2YXRlIHBhY2thZ2VDb25mOiB7XHJcbiAgICBidW5kbGVTdHlsZT86IElQYXJhbXM7XHJcbiAgfTtcclxuICBwcml2YXRlIGJ1bmRsZUNvbmY6IElQYXJhbXM7XHJcbiAgcHJpdmF0ZSBtZXJnZWRQYXJhbXM6IElQYXJhbXM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbWFzazogQXJyYXk8c3RyaW5nPiB8IHN0cmluZyxcclxuICAgIGRlc3Q6IHN0cmluZyxcclxuICAgIHNvcnQ6IEFycmF5PHN0cmluZz4gfCBzdHJpbmcsXHJcbiAgICBjb25maWc6IGJvb2xlYW5cclxuICApIHtcclxuICAgIHRoaXMubWFzayA9IG1hc2s7XHJcbiAgICB0aGlzLmRlc3QgPSBkZXN0O1xyXG4gICAgdGhpcy5zb3J0ID0gc29ydCB8fCBtYWluQ29uc3QuZGVmYXVsdFByaW9yaXR5O1xyXG4gICAgdGhpcy5wYWNrYWdlQ29uZiA9IGNvbmZpZ1xyXG4gICAgICA/IHRoaXMucmVhZEpzb24oam9pbihjd0RpcigpLCBtYWluQ29uc3QucGFja2FnZUpzb25GaWxlKSlcclxuICAgICAgOiB7fTtcclxuICAgIHRoaXMuYnVuZGxlQ29uZiA9IGNvbmZpZ1xyXG4gICAgICA/IHRoaXMucmVhZEpzb24oam9pbihjd0RpcigpLCBtYWluQ29uc3QuYnVuZGxlQ29uZkZpbGUpKVxyXG4gICAgICA6IHt9O1xyXG4gICAgdGhpcy5tZXJnZWRQYXJhbXMgPSB0aGlzLm1lcmdlUGFyYW0oKTtcclxuICB9XHJcblxyXG4gIGNvbXBhcmVPdXRwdXRJbnB1dEV4dGVuc2lvbnMocGFyYW06IElQYXJhbXMpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IG1hc2tFeHRlbnNpb24gPSBBcnJheS5pc0FycmF5KHBhcmFtLm1hc2spXHJcbiAgICAgID8gcGFyYW0ubWFzay5tYXAoZWwgPT4gZmlsZVR5cGUoZWwpKVxyXG4gICAgICA6IFtmaWxlVHlwZShwYXJhbS5tYXNrKV07XHJcbiAgICByZXR1cm4gbWFza0V4dGVuc2lvbi5ldmVyeShlbCA9PiBlbCA9PT0gZmlsZVR5cGUocGFyYW0uZGVzdCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWFkSnNvbihmaWxlUGF0aDogc3RyaW5nKSB7XHJcbiAgICBpZiAoaXNGaWxlKGZpbGVQYXRoKSkge1xyXG4gICAgICBsb2dnZXIoYFJlYWRpbmcgcGFyYW1zIGZyb20gJHtmaWxlUGF0aH1gKTtcclxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVhZFN5bmMoZmlsZVBhdGgpKTtcclxuICAgIH1cclxuICAgIGxvZ2dlcihgJHtmaWxlUGF0aH0gbm90IGZvdW5kYCk7XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1lcmdlUGFyYW0oKTogSVBhcmFtcyB7XHJcbiAgICBjb25zdCBwYWNrYWdlQ29uZiA9IHRoaXMucGFja2FnZUNvbmYuYnVuZGxlU3R5bGVcclxuICAgICAgPyB0aGlzLnBhY2thZ2VDb25mLmJ1bmRsZVN0eWxlXHJcbiAgICAgIDoge307XHJcbiAgICBjb25zdCBwYXJhbSA9IHtcclxuICAgICAgbWFzazogdGhpcy5tYXNrLFxyXG4gICAgICBkZXN0OiB0aGlzLmRlc3QsXHJcbiAgICAgIHNvcnQ6IHRoaXMuc29ydCxcclxuICAgICAgLi4ucGFja2FnZUNvbmYsXHJcbiAgICAgIC4uLnRoaXMuYnVuZGxlQ29uZixcclxuICAgIH07XHJcbiAgICBpZiAoIXRoaXMuY29tcGFyZU91dHB1dElucHV0RXh0ZW5zaW9ucyhwYXJhbSkpIHtcclxuICAgICAgbG9nZ2VyKCdGaWxlIGV4dGVuc2lvbnMgbWFzayBhbmQgZGVzdCBzaG91bGQgYmUgdGhlIHNhbWUnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJhbTtcclxuICB9XHJcblxyXG4gIGdldCBwYXJhbSgpIHtcclxuICAgIHJldHVybiB0aGlzLm1lcmdlZFBhcmFtcztcclxuICB9XHJcbn1cclxuIl19