import * as fspath from 'path';
import { SplitResult } from '../model';

export const isAbsolutePath = (path: string): boolean =>
    fspath.resolve(path) === fspath.normalize(path);

export const patchPath = (
    path: string,
    basePath = `${process.cwd()}`
): string => {
    let result;
    if (path.includes(fspath.sep)) {
        result = isAbsolutePath(path) ? path : fspath.resolve(basePath, path);
    } else {
        result = `${
            basePath.endsWith(fspath.sep) ? basePath : basePath + fspath.sep
        }${path}`;
    }
    return result;
};

export const splitPath = (path: string): SplitResult => {
    const regex = new RegExp(`^(.*)\\${fspath.sep}(.*)\\.(.*)$`);
    const result = path.match(regex);
    return {
        basePath: result[1],
        file: result[2],
        fileEnding: result[3],
    };
};
