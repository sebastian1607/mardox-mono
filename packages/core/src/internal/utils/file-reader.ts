import * as fs from 'fs';

export const readFile = (path: string, encoding = 'UTF-8'): string => {
    return fs.readFileSync(path, encoding);
};
