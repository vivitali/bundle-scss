"use strict";
const fs_1 = require("fs");
const path_1 = require("path");
const globby = require("globby");
const string_decoder_1 = require("string_decoder");
const constants_1 = require("./helpers/constants");
const Sort_1 = require("./helpers/Sort");
const decoder = new string_decoder_1.StringDecoder('utf8');
const log = (info) => console.log(info);
const isFile = (f) => fs_1.statSync(f).isFile();
const removeImports = (content) => content.replace(constants_1.config.sassImportRegex, '');
const readSync = (filePath) => fs_1.readFileSync(filePath, 'utf8');
const getUniqueScss = (files) => {
    const scssImports = files
        .map(file => {
        let baseDir = path_1.dirname(file);
        return getImports(readSync(file), baseDir);
    })
        .reduce((acc, curr) => acc.concat(curr), []);
    const allImports = [...scssImports, ...files];
    return [...new Set(allImports)];
};
const getImports = (content, baseDir, imports = []) => {
    let match;
    while ((match = constants_1.config.sassImportRegex.exec(content)) !== null) {
        const pathFile = defineExtension(path_1.join(baseDir, match[1]));
        if (!imports.some(el => el === pathFile)) {
            imports.push(pathFile);
            getImports(readSync(pathFile), path_1.dirname(pathFile), imports);
        }
    }
    return imports;
};
const writeAsync = (path, content) => {
    return new Promise((res, rej) => {
        fs_1.writeFile(path_1.resolve(path), content, error => {
            if (error) {
                return rej(error);
            }
            return res(content);
        });
    });
};
const defineExtension = (filePath) => {
    const justScss = `${filePath}.${constants_1.config.fileType}`;
    if (isFile(justScss)) {
        return justScss;
    }
    throw new Error(`⛔ ⛔ ⛔ No file for module ${filePath}`);
};
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
        const unique = getUniqueScss(files);
        const sorted = sortInstance.sort(unique);
        const buffers = sorted.map(file => {
            return fs_1.readFileSync(file);
        });
        const buff = Buffer.concat(buffers);
        let utfFormat = decoder.write(buff);
        if (dest) {
            log(`⏳ ⏳ ⏳ Saving result to ${dest}...`);
            const utf = removeImports(utfFormat);
            return writeAsync(dest, utf)
                .then(() => {
                log(`🚀 🚀 🚀 SAVED SUCCESSFULLY \nPlease check ${dest}`);
                return utf;
            })
                .catch(reason => {
                log(`⛔ ⛔ ⛔\n${reason}`);
            });
        }
        log('📁 Please provide destination option ');
        throw new Error('📁 Please provide destination option ');
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUF1RDtBQUN2RCwrQkFBOEM7QUFDOUMsaUNBQWlDO0FBQ2pDLG1EQUErQztBQUMvQyxtREFBNkM7QUFDN0MseUNBQXNDO0FBRXRDLE1BQU0sT0FBTyxHQUFHLElBQUksOEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQW9CLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLGFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVuRCxNQUFNLGFBQWEsR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFLENBQ3hDLE9BQU8sQ0FBQyxPQUFPLENBQUMsa0JBQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFOUMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUUsQ0FBQyxpQkFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN0RSxNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtJQUM3QyxNQUFNLFdBQVcsR0FBRyxLQUFLO1NBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNWLElBQUksT0FBTyxHQUFHLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUM7U0FDRCxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxXQUFXLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUU5QyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQUcsQ0FDakIsT0FBZSxFQUNmLE9BQWUsRUFDZixVQUF5QixFQUFFLEVBQzNCLEVBQUU7SUFDRixJQUFJLEtBQUssQ0FBQztJQUNWLE9BQU8sQ0FBQyxLQUFLLEdBQUcsa0JBQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDL0QsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLFdBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxjQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDN0QsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxFQUFFO0lBQ25ELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUM5QixjQUFTLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtZQUN4QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQztZQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFO0lBQzNDLE1BQU0sUUFBUSxHQUFHLEdBQUcsUUFBUSxJQUFJLGtCQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFbEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQzFELENBQUMsQ0FBQztBQUVGLGlCQUFTLENBQ1AsSUFBdUIsRUFDdkIsSUFBWSxFQUNaLE9BQWlCLGtCQUFNLENBQUMsZUFBZSxFQUN2QyxFQUFFO0lBQ0YsTUFBTSxRQUFRLEdBQUcsV0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxNQUFNLFlBQVksR0FBRyxJQUFJLFdBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBQ0QsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3JDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFdEQsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxNQUFNLENBQUMsaUJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1QsR0FBRyxDQUFDLDBCQUEwQixJQUFJLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7aUJBQ3pCLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1QsR0FBRyxDQUFDLDhDQUE4QyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDZCxHQUFHLENBQUMsVUFBVSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUMzRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdyaXRlRmlsZSwgc3RhdFN5bmMsIHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcclxuaW1wb3J0IHsgcmVzb2x2ZSwgam9pbiwgZGlybmFtZSB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgKiBhcyBnbG9iYnkgZnJvbSAnZ2xvYmJ5JztcclxuaW1wb3J0IHsgU3RyaW5nRGVjb2RlciB9IGZyb20gJ3N0cmluZ19kZWNvZGVyJztcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9oZWxwZXJzL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL2hlbHBlcnMvU29ydCc7XHJcblxyXG5jb25zdCBkZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIoJ3V0ZjgnKTtcclxuY29uc3QgbG9nID0gKGluZm86IEVycm9yIHwgc3RyaW5nKSA9PiBjb25zb2xlLmxvZyhpbmZvKTtcclxuY29uc3QgaXNGaWxlID0gKGY6IHN0cmluZykgPT4gc3RhdFN5bmMoZikuaXNGaWxlKCk7XHJcblxyXG5jb25zdCByZW1vdmVJbXBvcnRzID0gKGNvbnRlbnQ6IHN0cmluZykgPT5cclxuICBjb250ZW50LnJlcGxhY2UoY29uZmlnLnNhc3NJbXBvcnRSZWdleCwgJycpO1xyXG5cclxuY29uc3QgcmVhZFN5bmMgPSAoZmlsZVBhdGg6IHN0cmluZykgPT4gcmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmOCcpO1xyXG5jb25zdCBnZXRVbmlxdWVTY3NzID0gKGZpbGVzOiBBcnJheTxzdHJpbmc+KSA9PiB7XHJcbiAgY29uc3Qgc2Nzc0ltcG9ydHMgPSBmaWxlc1xyXG4gICAgLm1hcChmaWxlID0+IHtcclxuICAgICAgbGV0IGJhc2VEaXIgPSBkaXJuYW1lKGZpbGUpO1xyXG4gICAgICByZXR1cm4gZ2V0SW1wb3J0cyhyZWFkU3luYyhmaWxlKSwgYmFzZURpcik7XHJcbiAgICB9KVxyXG4gICAgLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiBhY2MuY29uY2F0KGN1cnIpLCBbXSk7XHJcbiAgY29uc3QgYWxsSW1wb3J0cyA9IFsuLi5zY3NzSW1wb3J0cywgLi4uZmlsZXNdO1xyXG5cclxuICByZXR1cm4gWy4uLm5ldyBTZXQoYWxsSW1wb3J0cyldO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0SW1wb3J0cyA9IChcclxuICBjb250ZW50OiBzdHJpbmcsXHJcbiAgYmFzZURpcjogc3RyaW5nLFxyXG4gIGltcG9ydHM6IEFycmF5PHN0cmluZz4gPSBbXVxyXG4pID0+IHtcclxuICBsZXQgbWF0Y2g7XHJcbiAgd2hpbGUgKChtYXRjaCA9IGNvbmZpZy5zYXNzSW1wb3J0UmVnZXguZXhlYyhjb250ZW50KSkgIT09IG51bGwpIHtcclxuICAgIGNvbnN0IHBhdGhGaWxlID0gZGVmaW5lRXh0ZW5zaW9uKGpvaW4oYmFzZURpciwgbWF0Y2hbMV0pKTtcclxuICAgIGlmICghaW1wb3J0cy5zb21lKGVsID0+IGVsID09PSBwYXRoRmlsZSkpIHtcclxuICAgICAgaW1wb3J0cy5wdXNoKHBhdGhGaWxlKTtcclxuICAgICAgZ2V0SW1wb3J0cyhyZWFkU3luYyhwYXRoRmlsZSksIGRpcm5hbWUocGF0aEZpbGUpLCBpbXBvcnRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBpbXBvcnRzO1xyXG59O1xyXG5cclxuY29uc3Qgd3JpdGVBc3luYyA9IChwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykgPT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgIHdyaXRlRmlsZShyZXNvbHZlKHBhdGgpLCBjb250ZW50LCBlcnJvciA9PiB7XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiByZWooZXJyb3IpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmVzKGNvbnRlbnQpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBkZWZpbmVFeHRlbnNpb24gPSAoZmlsZVBhdGg6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IGp1c3RTY3NzID0gYCR7ZmlsZVBhdGh9LiR7Y29uZmlnLmZpbGVUeXBlfWA7XHJcblxyXG4gIGlmIChpc0ZpbGUoanVzdFNjc3MpKSB7XHJcbiAgICByZXR1cm4ganVzdFNjc3M7XHJcbiAgfVxyXG4gIHRocm93IG5ldyBFcnJvcihg4puUIOKblCDim5QgTm8gZmlsZSBmb3IgbW9kdWxlICR7ZmlsZVBhdGh9YCk7XHJcbn07XHJcblxyXG5leHBvcnQgPSAoXHJcbiAgbWFzazogc3RyaW5nW10gfCBzdHJpbmcsXHJcbiAgZGVzdDogc3RyaW5nLFxyXG4gIHNvcnQ6IHN0cmluZ1tdID0gY29uZmlnLmRlZmF1bHRQcmlvcml0eVxyXG4pID0+IHtcclxuICBjb25zdCBmdWxsUGF0aCA9IGpvaW4ocHJvY2Vzcy5jd2QoKSk7XHJcbiAgY29uc3Qgc29ydE9yZGVyID0gQXJyYXkuaXNBcnJheShzb3J0KSA/IHNvcnQgOiBbc29ydF07XHJcbiAgY29uc3Qgc29ydEluc3RhbmNlID0gbmV3IFNvcnQoc29ydE9yZGVyKTtcclxuICBpZiAoIW1hc2sgfHwgIW1hc2subGVuZ3RoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ+KblCDim5Qg4puUIFBsZWFzZSBwcm92aWRlIHRoZSBzcmMgZm9yIGNvbmNhdCBtZXRob2QnKTtcclxuICB9XHJcbiAgY29uc3Qgc2VhcmNoTWFzayA9IEFycmF5LmlzQXJyYXkobWFzaykgPyBtYXNrIDogW21hc2tdO1xyXG4gIHJldHVybiBnbG9iYnkoc2VhcmNoTWFzaykudGhlbihwYXRocyA9PiB7XHJcbiAgICBjb25zdCBmaWxlcyA9IHBhdGhzLm1hcChmaWxlID0+IGpvaW4oZnVsbFBhdGgsIGZpbGUpKTtcclxuXHJcbiAgICBjb25zdCB1bmlxdWUgPSBnZXRVbmlxdWVTY3NzKGZpbGVzKTtcclxuICAgIGNvbnN0IHNvcnRlZCA9IHNvcnRJbnN0YW5jZS5zb3J0KHVuaXF1ZSk7XHJcbiAgICBjb25zdCBidWZmZXJzID0gc29ydGVkLm1hcChmaWxlID0+IHtcclxuICAgICAgcmV0dXJuIHJlYWRGaWxlU3luYyhmaWxlKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgYnVmZiA9IEJ1ZmZlci5jb25jYXQoYnVmZmVycyk7XHJcbiAgICBsZXQgdXRmRm9ybWF0ID0gZGVjb2Rlci53cml0ZShidWZmKTtcclxuXHJcbiAgICBpZiAoZGVzdCkge1xyXG4gICAgICBsb2coYOKPsyDij7Mg4o+zIFNhdmluZyByZXN1bHQgdG8gJHtkZXN0fS4uLmApO1xyXG4gICAgICBjb25zdCB1dGYgPSByZW1vdmVJbXBvcnRzKHV0ZkZvcm1hdCk7XHJcbiAgICAgIHJldHVybiB3cml0ZUFzeW5jKGRlc3QsIHV0ZilcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBsb2coYO2gve26gCDtoL3tuoAg7aC97bqAIFNBVkVEIFNVQ0NFU1NGVUxMWSBcXG5QbGVhc2UgY2hlY2sgJHtkZXN0fWApO1xyXG4gICAgICAgICAgcmV0dXJuIHV0ZjtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChyZWFzb24gPT4ge1xyXG4gICAgICAgICAgbG9nKGDim5Qg4puUIOKblFxcbiR7cmVhc29ufWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9nKCftoL3ts4EgUGxlYXNlIHByb3ZpZGUgZGVzdGluYXRpb24gb3B0aW9uICcpO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCftoL3ts4EgUGxlYXNlIHByb3ZpZGUgZGVzdGluYXRpb24gb3B0aW9uICcpO1xyXG4gIH0pO1xyXG59O1xyXG4iXX0=