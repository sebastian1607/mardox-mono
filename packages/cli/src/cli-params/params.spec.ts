import * as params from './params';
import { Command } from 'commander';
import { Options } from '@mardox/core';
import { patchPath } from '../path-utils';

jest.mock('../path-utils');

describe('params should', () => {
    let command: Command;

    beforeEach(() => {
        command = {} as Command;
    });

    test('map -f correct', () => {
        const fileName = 'a/b/newFileIn';
        (patchPath as jest.Mock).mockReturnValue(fileName);
        const result: Partial<Options> = params.fileParam.mapping(command);
        expect(result.inputFile).toBe(fileName);
    });

    test('map -o correct', () => {
        const fileName = 'a/b/newFileOut';
        (patchPath as jest.Mock).mockReturnValue(fileName);
        const result: Partial<Options> = params.outParam.mapping(command);
        expect(result.outputFile).toBe(fileName);
    });

    test('map -v correct', () => {
        command.verbose = true;
        const result: Partial<Options> = params.verboseParam.mapping(command);
        expect(result.verbose).toBe(true);
    });
});