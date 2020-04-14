import * as fs from 'fs';
import { Options } from './model';

export const readFile = (options: Options): string => {
    return fs.readFileSync(options.inputFile, options.encoding);
};
