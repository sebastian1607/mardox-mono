import { Options } from '@mardox/core';
import * as commander from 'commander';
export interface ParamKey {
    short: string;
    long: string;
    parserInput: string;
}

export interface CliParam {
    short: string;
    long: string;
    parserInput: string;
    description: string;
    deriveIfMissing?: boolean;
    mapping: (command: commander.Command, options: Options) => Options;
}
