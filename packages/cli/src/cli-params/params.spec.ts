import { Options } from '@mardox/core';
import { Command } from 'commander';
import { patchPath, splitPath } from '../path-utils';
import * as params from './params';

jest.mock('../path-utils');

describe('params should', () => {
    let command: Command;

    beforeEach(() => {
        command = {} as Command;
    });

    test('map -f correct', () => {
        const fileName = 'a/b/newFileIn';
        const basePath = 'a/b';
        (patchPath as jest.Mock).mockReturnValue(fileName);
        (splitPath as jest.Mock).mockReturnValue({ basePath });
        const result: Options = params.fileParam.mapping(command, {});
        expect(result.inputFile).toBe(fileName);
        expect(result.basePath).toBe(basePath);
    });

    test('map -o correct', () => {
        const fileName = 'a/b/newFileOut';
        (patchPath as jest.Mock).mockReturnValue(fileName);
        const result: Options = params.outParam.mapping(command, {});
        expect(result.outputFile).toBe(fileName);
    });

    test('map -o correct based on -f', () => {
        (patchPath as jest.Mock).mockReturnValue('/a/b/newFileOut.md');
        const result: Options = params.outParam.mapping(command, {});
        expect(result.outputFile).toBe('/a/b/newFileOut.pdf');
    });

    test('map -v correct', () => {
        command.verbose = true;
        const result: Options = params.verboseParam.mapping(command, {});
        expect(result.verbose).toBe(true);
    });
});
