import * as params from './params';

import { CliParam } from './model';
export * from './model';

export const allParams: CliParam[] = [
    params.fileParam,
    params.outParam,
    params.verboseParam,
];
