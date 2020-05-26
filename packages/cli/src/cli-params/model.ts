import { Options } from '@mardox/core';
import * as commander from 'commander';
export interface ParamKey {
    short: string;
    long: string;
    description: string;
}

export interface CliParam {
    short: string;
    long: string;
    description: string;
    deriveIfMissing?: boolean;
    mapping: (command: commander.Command, options: Options) => Options;
}

export const valuePlaceHolder = '<VALUE>';
