import { Command } from 'commander';
import { patchPath } from '../path-utils';
import { CliParam } from './model';

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
        let outFile;
        if (command.out) {
            outFile = patchPath(command.out);
        } else {
            const inputFile = patchPath(command.file);
            outFile = inputFile.replace(/(.*)\.(.*)$/g, '$1.pdf');
        }
        return {
            outputFile: outFile,
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
