import { Options, patchPath, splitPath, SplitResult } from '@mardox/core';
import { Command } from 'commander';
import { CliParam, valuePlaceHolder } from './model';

interface ParamBuild {
    short: string;
    long: string;
    description: string;
}
const buildParam = (
    short: string,
    long: string,
    description: string
): ParamBuild => ({
    short,
    long,
    description,
});

const buildArgsParam = (
    short: string,
    long: string,
    description: string
): ParamBuild => buildParam(short, `${long} ${valuePlaceHolder}`, description);

export const fileParam: CliParam = {
    ...buildArgsParam('f', 'file', 'File to convert'),
    mapping: (command: Command, options: Options) => {
        const completePath = patchPath(command.file);
        const splitResult: SplitResult = splitPath(completePath);
        return {
            ...options,
            inputFile: {
                path: splitResult.basePath,
                file: splitResult.file,
                fileEnding: splitResult.fileEnding.toLowerCase(),
            },
        };
    },
};

export const outParam: CliParam = {
    ...buildArgsParam('o', 'out', 'Output file'),
    deriveIfMissing: true,
    mapping: (command: Command, options: Options) => {
        const completePath = patchPath(command.out);
        const splitResult: SplitResult = splitPath(completePath);
        return {
            ...options,
            outputFile: {
                path: splitResult.basePath,
                file: splitResult.file,
                fileEnding: splitResult.fileEnding.toLowerCase(),
            },
        };
    },
};

export const verboseParam: CliParam = {
    ...buildParam('v', 'verbose', 'Verbose output'),
    mapping: (command: Command, options: Options) => {
        return {
            ...options,
            verbose: command.verbose,
        };
    },
};

export const marginLeft: CliParam = {
    ...buildArgsParam('ml', 'marginLeft', 'Margin Left'),
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
    ...buildArgsParam('mt', 'marginTop', 'Margin Top'),
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

export const marginRight: CliParam = {
    ...buildArgsParam('mr', 'marginRight', 'Margin Right'),
    mapping: (command: Command, options: Options) => {
        return {
            ...options,
            margins: {
                ...options.margins,
                right: command.marginRight,
            },
        };
    },
};

export const marginBottom: CliParam = {
    ...buildArgsParam('mb', 'marginBottom', 'Margin Bottom'),
    mapping: (command: Command, options: Options) => {
        return {
            ...options,
            margins: {
                ...options.margins,
                bottom: command.marginBottom,
            },
        };
    },
};
