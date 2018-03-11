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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtcGFyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9wYXJzZS1wYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUE2QztBQUM3QywrQkFBNEI7QUFDNUIsMkNBQXdDO0FBQ3hDLHFDQUFrQztBQUVsQztJQVVFLFlBQ0UsSUFBNEIsRUFDNUIsSUFBNEIsRUFDNUIsSUFBNEIsRUFDNUIsTUFBZTtRQUVmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLHFCQUFTLENBQUMsZUFBZSxDQUFDO1FBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTTtZQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFJLENBQUMsZ0JBQUssRUFBRSxFQUFFLHFCQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTTtZQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFJLENBQUMsZ0JBQUssRUFBRSxFQUFFLHFCQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTyxRQUFRLENBQUMsUUFBUTtRQUN2QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQixDQUFDO1FBQ0QsZUFBTSxDQUFDLEdBQUcsUUFBUSxZQUFZLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVPLFVBQVU7UUFDaEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVO1lBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVU7WUFDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLE1BQU0saUJBQ0osSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQ1osV0FBVyxFQUNYLElBQUksQ0FBQyxVQUFVLEVBQ2xCO0lBQ0osQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7Q0FDRjtBQXRERCx3QkFzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjd0RpciwgcmVhZFN5bmMgfSBmcm9tICcuL2ZzLXV0aWxzJztcclxuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBtYWluQ29uc3QgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJhbXMge1xyXG4gIHByaXZhdGUgbWFzazogQXJyYXk8c3RyaW5nPiB8IHN0cmluZztcclxuICBwcml2YXRlIGRlc3Q6IEFycmF5PHN0cmluZz4gfCBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBzb3J0OiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nO1xyXG4gIHByaXZhdGUgcGFja2FnZUNvbmY6IHtcclxuICAgIGJ1bmRsZVNjc3M/OiBJUGFyYW1zO1xyXG4gIH07XHJcbiAgcHJpdmF0ZSBidW5kbGVDb25mOiBJUGFyYW1zO1xyXG4gIHByaXZhdGUgbWVyZ2VkUGFyYW1zOiBJUGFyYW1zO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG1hc2s6IEFycmF5PHN0cmluZz4gfCBzdHJpbmcsXHJcbiAgICBkZXN0OiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nLFxyXG4gICAgc29ydDogQXJyYXk8c3RyaW5nPiB8IHN0cmluZyxcclxuICAgIGNvbmZpZzogYm9vbGVhblxyXG4gICkge1xyXG4gICAgdGhpcy5tYXNrID0gbWFzaztcclxuICAgIHRoaXMuZGVzdCA9IGRlc3Q7XHJcbiAgICB0aGlzLnNvcnQgPSBzb3J0IHx8IG1haW5Db25zdC5kZWZhdWx0UHJpb3JpdHk7XHJcbiAgICB0aGlzLnBhY2thZ2VDb25mID0gY29uZmlnXHJcbiAgICAgID8gdGhpcy5yZWFkSnNvbihqb2luKGN3RGlyKCksIG1haW5Db25zdC5wYWNrYWdlSnNvbkZpbGUpKVxyXG4gICAgICA6IHt9O1xyXG4gICAgdGhpcy5idW5kbGVDb25mID0gY29uZmlnXHJcbiAgICAgID8gdGhpcy5yZWFkSnNvbihqb2luKGN3RGlyKCksIG1haW5Db25zdC5idW5kbGVDb25mRmlsZSkpXHJcbiAgICAgIDoge307XHJcbiAgICB0aGlzLm1lcmdlZFBhcmFtcyA9IHRoaXMubWVyZ2VQYXJhbSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWFkSnNvbihmaWxlUGF0aCkge1xyXG4gICAgaWYgKGZpbGVQYXRoKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnBhcnNlKHJlYWRTeW5jKGZpbGVQYXRoKSk7XHJcbiAgICAgIGNvbnNvbGUud2Fybihjb250ZW50LCAnLSstKy0rLStfLSstKycpO1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH1cclxuICAgIGxvZ2dlcihgJHtmaWxlUGF0aH0gbm90IGZvdW5kYCk7XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1lcmdlUGFyYW0oKTogSVBhcmFtcyB7XHJcbiAgICBjb25zdCBwYWNrYWdlQ29uZiA9IHRoaXMucGFja2FnZUNvbmYuYnVuZGxlU2Nzc1xyXG4gICAgICA/IHRoaXMucGFja2FnZUNvbmYuYnVuZGxlU2Nzc1xyXG4gICAgICA6IHt9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWFzazogdGhpcy5tYXNrLFxyXG4gICAgICBkZXN0OiB0aGlzLmRlc3QsXHJcbiAgICAgIHNvcnQ6IHRoaXMuc29ydCxcclxuICAgICAgLi4ucGFja2FnZUNvbmYsXHJcbiAgICAgIC4uLnRoaXMuYnVuZGxlQ29uZixcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXQgcGFyYW0oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tZXJnZWRQYXJhbXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==