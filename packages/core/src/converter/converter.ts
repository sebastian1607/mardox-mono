import { Options } from '../model';

export interface Converter {
    fileEnding: string;
    convert(options: Options): void;
}
