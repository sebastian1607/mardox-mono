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
