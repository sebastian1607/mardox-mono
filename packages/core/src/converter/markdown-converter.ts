import { Converter } from './converter';
import { Options } from '../model';
import { Remarkable } from 'remarkable';
import { readFile } from '../file-reader';
import { print } from '../html-printer';

const convertMarkdown = (markdown: string) => {
    const md: Remarkable = new Remarkable();
    const html = md.render(markdown);
    return html;
};

class MarkdownConverter implements Converter {
    fileEnding = '.md';
    convert(options: Options): void {
        const markdown = readFile(options);
        const html = convertMarkdown(markdown);
        print(options, html);
    }
}

export const converter = new MarkdownConverter();
