import { Options } from '@mardox/core';
import { Command } from 'commander';
import { patchPath, splitPath, SplitResult } from '../path-utils';
import * as params from './params';

jest.mock('../path-utils');

describe('params should', () => {
    let command: Command;

    beforeEach(() => {
        command = {} as Command;
    });

    test('map -f correct', () => {
        const splitResult: SplitResult = {
            basePath: '/a/b/c',
            file: 'xyz',
            fileEnding: 'md',
        };
        (patchPath as jest.Mock).mockReturnValue('');
        (splitPath as jest.Mock).mockReturnValue(splitResult);
        const result: Options = params.fileParam.mapping(command, {});
        expect(result.inputFile.file).toBe(splitResult.file);
        expect(result.inputFile.fileEnding).toBe('md');
        expect(result.inputFile.path).toBe(splitResult.basePath);
    });

    test('map -o correct', () => {
        const splitResult: SplitResult = {
            basePath: '/a/b/c',
            file: 'xyz',
            fileEnding: 'pdf',
        };
        (patchPath as jest.Mock).mockReturnValue('');
        (splitPath as jest.Mock).mockReturnValue(splitResult);
        const result: Options = params.outParam.mapping(command, {});
        expect(result.outputFile.file).toBe(splitResult.file);
        expect(result.outputFile.fileEnding).toBe('pdf');
        expect(result.outputFile.path).toBe(splitResult.basePath);
    });

    test('map -v correct', () => {
        command.verbose = true;
        const result: Options = params.verboseParam.mapping(command, {});
        expect(result.verbose).toBe(true);
    });
});
