import { Converter } from './converter';
import { Options } from '../model';
import { Remarkable } from 'remarkable';
import { readFile } from '../file-reader';
import { print } from '../html-printer';

const convertMarkdown = (markdown: string) => {
    const md: Remarkable = new Remarkable({
        html: true,
    });
    const html = md.render(markdown);
    return html;
};

class MarkdownConverter implements Converter {
    fileEnding = '.md';
    convert(options: Options): void {
        const fileContent = readFile(options);
        const convertedMarkdown = convertMarkdown(fileContent);
        print(options, convertedMarkdown);
    }
}

export const converter = new MarkdownConverter();
