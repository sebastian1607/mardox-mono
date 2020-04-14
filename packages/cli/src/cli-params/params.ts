import { CliParam } from './model';
import { Command } from 'commander';
import { patchPath } from '../path-utils';

export const fileParam: CliParam = {
    short: 'f',
    long: 'file <inputFile>',
    description: 'File to convert',
    mapping: (command: Command) => {
        return {
            inputFile: patchPath(command.file),
        };
    },
};

export const outParam: CliParam = {
    short: 'o',
    long: 'out <outFile>',
    description: 'Output file',
    mapping: (command: Command) => {
        return {
            outputFile: patchPath(command.out),
        };
    },
};

export const verboseParam: CliParam = {
    short: 'v',
    long: 'verbose',
    description: 'Verbose output',
    mapping: (command: Command) => {
        return {
            verbose: command.verbose,
        };
    },
};
