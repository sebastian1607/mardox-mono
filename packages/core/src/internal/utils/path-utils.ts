import * as fspath from 'path';

export const isAbsolutePath = (path: string): boolean =>
    fspath.resolve(path) === fspath.normalize(path);

export const patchPath = (
    path: string,
    basePath = `${process.cwd()}`
): string => {
    let result;
    if (path.includes(fspath.sep)) {
        result = isAbsolutePath(path) ? path : fspath.resolve(path);
    } else {
        result = `${
            basePath.endsWith(fspath.sep) ? basePath : basePath + fspath.sep
        }${path}`;
    }
    return result;
};
