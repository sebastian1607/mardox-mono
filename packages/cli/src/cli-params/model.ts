import { Options } from '@mardox/core';
import * as commander from 'commander';

export interface CliParam {
    short: string;
    long: string;
    description: string;
    mapping: (command: commander.Command) => Partial<Options>;
}
