import { Converter } from './converter';
import { Options } from '../model';
import { Remarkable } from 'remarkable';
import { readFile } from '../file-reader';
import { print } from '../html-printer';

class HtmlConverter implements Converter {
    fileEnding = '.html';
    convert(options: Options): void {
        const html = readFile(options);
        print(options, html);
    }
}

export const converter = new HtmlConverter();
