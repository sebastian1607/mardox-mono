import { CliParam } from './model';
import * as params from './params';

export * from './model';

export const allParams: CliParam[] = [
    params.fileParam,
    params.outParam,
    params.verboseParam,
    params.marginLeft,
    //  params.marginTop,
];
