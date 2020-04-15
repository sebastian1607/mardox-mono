import * as fspath from 'path';
import * as unitToTest from './path-utils';

const buildPath = (...fragments: Array<string>) => fragments.join(fspath.sep);

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
        'detect path $path as relative path $expectation',
        ({ path, expectation }) => {
            const result = unitToTest.isAbsolutePath(path);
            expect(result).toBe(expectation);
        }
    );

    it.each`
        path                                          | expectation
        ${buildPath('.', 'a', 'file.md')}             | ${buildPath(process.cwd(), 'a', 'file.md')}
        ${buildPath(fspath.sep, 'a', 'b', 'test.md')} | ${buildPath(fspath.sep, 'a', 'b', 'test.md')}
        ${buildPath('..', 'test.md')}                 | ${fspath.join(process.cwd(), '..', 'test.md')}
    `('patch path: $path', ({ path, expectation }) => {
        const result = unitToTest.patchPath(path);
        expect(result).toBe(expectation);
    });
});
