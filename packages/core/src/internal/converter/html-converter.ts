import { Node } from 'domhandler';
import { parseDOM } from 'htmlparser2';
import { Options } from '../../api';
import { readFile } from '../utils/file-reader';
import { Converter } from './converter';

const converter: Converter = {
    fileEnding: 'html',
    convert(options: Options): Node[] {
        const html = readFile(options.inputFile, options.encoding);
        return parseDOM(html);
    },
};

export default converter;
