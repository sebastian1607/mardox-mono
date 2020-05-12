import { Options } from '@mardox/core';
import { Command } from 'commander';
import { patchPath, splitPath } from '../path-utils';
import { CliParam, ParamKey } from './model';

const buildParam = (
    short: string,
    long: string,
    withParam = false
): ParamKey => ({
    short,
    long,
    parserInput: withParam ? `${long} <value>` : long,
});

const buildParamKey = (short: string, long: string): ParamKey => ({
    short,
    long,
    parserInput: long,
});

const buildParamKeyWithValue = (short: string, long: string): ParamKey => ({
    ...buildParamKey(short, long),
    parserInput: `${long} <value>`,
});

export const fileParam: CliParam = {
    ...buildParam('f', 'file', true),
    description: 'File to convert',
    mapping: (command: Command, options: Options) => {
        const completePath = patchPath(command.file);
        const splitResult = splitPath(completePath);
        return {
            ...options,
            inputFile: completePath,
            basePath: splitResult.basePath,
        };
    },
};

export const outParam: CliParam = {
    ...buildParam('o', 'out', true),
    deriveIfMissing: true,
    description: 'Output file',
    mapping: (command: Command, options: Options) => {
        let outFile;
        if (command.out && command.out !== '') {
            outFile = patchPath(command.out);
        } else {
            const inputFile = patchPath(command.file);
            inputFile.match(/$/);
            outFile = inputFile.replace(/(.*)\.(.*)$/g, '$1.pdf');
        }
        return {
            ...options,
            outputFile: outFile,
        };
    },
};

export const verboseParam: CliParam = {
    ...buildParam('v', 'verbose'),
    description: 'Verbose output',
    mapping: (command: Command, options: Options) => {
        return {
            ...options,
            verbose: command.verbose,
        };
    },
};

export const marginLeft: CliParam = {
    ...buildParam('ml', 'marginLeft', true),
    description: 'Margin Left',
    mapping: (command: Command, options: Options) => {
        return {
            ...options,
            margins: {
                ...options.margins,
                left: command.marginLeft,
            },
        };
    },
};

export const marginTop: CliParam = {
    ...buildParam('mt', 'marginTop', true),
    description: 'Margin Top',
    mapping: (command: Command, options: Options) => {
        return {
            ...options,
            margins: {
                ...options.margins,
                top: command.marginTop,
            },
        };
    },
};
