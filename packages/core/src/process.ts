import { Options } from './model';
import { converter as markdownConverter } from './converter/markdown-converter';
import { converter as htmlConverter } from './converter/html-converter';
import { Converter } from './converter/converter';
import { DEFAULT_OPTIONS } from './default-options';

const CONVERTER: Array<Converter> = [markdownConverter, htmlConverter];

const setDefaultOptionsIfNeeded = (options: Options): Options =>
    Object.assign(DEFAULT_OPTIONS, options);

export function process(inputOptions: Options): void {
    const options = setDefaultOptionsIfNeeded(inputOptions);
    const converter = CONVERTER.find((converter) =>
        options.inputFile.toLowerCase().endsWith(converter.fileEnding)
    );
    if (!converter) {
        throw Error('Unknown file format!!');
    }
    converter.convert(options);
}
