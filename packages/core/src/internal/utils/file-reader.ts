import * as fs from 'fs';
import * as fspath from 'path';
import { File } from '../../api';

export const readFile = (path: string | File, encoding = 'UTF-8'): string => {
    const filePath: string = path.hasOwnProperty('file')
        ? convertPath(path as File)
        : (path as string);
    return fs.readFileSync(filePath, encoding);
};

export const convertPath = (file: File): string =>
    file.path + fspath.sep + file.file + '.' + file.fileEnding;
