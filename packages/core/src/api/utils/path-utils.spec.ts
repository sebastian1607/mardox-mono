import * as fspath from 'path';
import { SplitResult } from '../model';
import * as unitToTest from './path-utils';

const buildPath = (...fragments: string[]) => fragments.join(fspath.sep);
const buildAbsolutPath = (...fragments: string[]) =>
    fspath.sep + buildPath(...fragments);

describe('path utils should', () => {
    it.each`
        path          | expectation
        ${'./a'}      | ${false}
        ${'~/a'}      | ${false}
        ${'b'}        | ${false}
        ${'../c'}     | ${false}
        ${'../../c'}  | ${false}
        ${'/d'}       | ${true}
        ${'/a/b/c/d'} | ${true}
    `(
        'detect path $path as absolute path $expectation',
        ({ path, expectation }) => {
            const result = unitToTest.isAbsolutePath(path);
            expect(result).toBe(expectation);
        }
    );

    it.each`
        path                                     | expectation
        ${buildPath('.', 'a', 'file.md')}        | ${buildPath(process.cwd(), 'a', 'file.md')}
        ${buildAbsolutPath('a', 'b', 'test.md')} | ${buildAbsolutPath('a', 'b', 'test.md')}
        ${buildPath('..', 'test.md')}            | ${fspath.join(process.cwd(), '..', 'test.md')}
    `('patch path: $path', ({ path, expectation }) => {
        const result = unitToTest.patchPath(path);
        expect(result).toBe(expectation);
    });

    test('patch path with given base path', () => {
        const basePath = buildPath(fspath.sep, 'a', 'b');
        const relativePath = buildPath('..', 'test.md');
        const expectation = buildPath('a', 'test.md');
        const result = unitToTest.patchPath(relativePath, basePath);
        expect(result).toBe(fspath.sep + expectation);
    });

    test('split path', () => {
        const basePath = fspath.join('a', 'b', 'c');
        const fileName = 'fileXYZ';
        const fileEnding = 'md';
        const result: SplitResult = unitToTest.splitPath(
            `${basePath}${fspath.sep}${fileName}.${fileEnding}`
        );
        expect(result.basePath).toBe(basePath);
        expect(result.file).toBe(fileName);
        expect(result.fileEnding).toBe(fileEnding);
    });
});
