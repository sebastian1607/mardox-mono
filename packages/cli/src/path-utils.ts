import * as fspath from 'path';

export const isAbsolutePath = (path: string): boolean =>
    fspath.resolve(path) === fspath.normalize(path);

export const patchPath = (path: string): string => {
    let result;
    if (path.includes(fspath.sep)) {
        result = isAbsolutePath(path) ? path : fspath.resolve(path);
    } else {
        result = `${process.cwd()}${fspath.sep}${path}`;
    }
    return result;
};

export interface SplitResult {
    basePath: string;
    file: string;
    fileEnding: string;
}
export const splitPath = (path: string): SplitResult => {
    const regex = new RegExp(`^(.*)${fspath.sep}(.*)\\.(.*)$`);
    const result = path.match(regex);
    return {
        basePath: result[1],
        file: result[2],
        fileEnding: result[3],
    };
};
