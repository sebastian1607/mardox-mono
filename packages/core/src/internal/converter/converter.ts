import { Node } from 'domhandler';
import { Options } from '../../api';

export interface Converter {
    fileEnding: string;
    convert(options: Options): Node[];
}
