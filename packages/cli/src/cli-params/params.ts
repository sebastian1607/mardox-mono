import { Command } from 'commander';
import { patchPath, splitPath } from '../path-utils';
import { CliParam } from './model';

export const fileParam: CliParam = {
    short: 'f',
    long: 'file <inputFile>',
    description: 'File to convert',
    mapping: (command: Command) => {
        const completePath = patchPath(command.file);
        const splitResult = splitPath(completePath);
        return {
            inputFile: completePath,
            basePath: splitResult.basePath,
        };
    },
};

export const outParam: CliParam = {
    short: 'o',
    long: 'out <outFile>',
    description: 'Output file',
    mapping: (command: Command) => {
        let outFile;
        if (command.out && command.out !== '') {
            outFile = patchPath(command.out);
        } else {
            const inputFile = patchPath(command.file);
            inputFile.match(/$/);
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

export const marginLeft: CliParam = {
    short: 'ml',
    long: 'marginLeft',
    description: 'Margin Left',
    mapping: (command: Command) => {
        return {
            margins: {
                left: command.marginLeft,
            },
        };
    },
};

export const marginTop: CliParam = {
    short: 'mT',
    long: 'marginTop',
    description: 'Margin Top',
    mapping: (command: Command) => {
        return {
            margins: {
                top: command.marginTop,
            },
        };
    },
};
