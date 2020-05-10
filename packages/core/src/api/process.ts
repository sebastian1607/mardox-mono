import { CONVERTER, DEFAULT_OPTIONS, print } from '../internal';
import { Options } from './model';

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
    const dom = converter.convert(options);
    print(options, dom);
}
