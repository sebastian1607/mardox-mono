import { Options } from '../api';

export const DEFAULT_OPTIONS: Partial<Options> = {
    encoding: 'utf8',
    format: 'A4',
    verbose: false,
    margins: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
    },
};
