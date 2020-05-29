import { Element } from 'domhandler';
import { appendChild, getOuterHTML } from 'domutils';
import { Options } from '../../api';
import { readFile } from '../utils/file-reader';
import * as unitToTest from './tag-inliner';
jest.mock('../utils/file-reader');

describe('Tag Inliner should', () => {
    test('predicate inline external css', () => {
        let element = new Element('link', { href: '' });
        let result = false;
        result = unitToTest.css.predicate(element);
        expect(result).toBe(false);

        element = new Element('link', {});
        result = unitToTest.css.predicate(element);
        expect(result).toBe(false);

        element = new Element('src', { href: 'xyz' });
        result = unitToTest.css.predicate(element);
        expect(result).toBe(false);

        element = new Element('link', { href: 'xyz' });
        result = unitToTest.css.predicate(element);
        expect(result).toBe(true);
    });

    test('convert inline external css', () => {
        const fileContent = 'THIS IS FILE CONTENT';
        (readFile as jest.Mock).mockReturnValue(fileContent);
        const element = new Element('link', { href: '' });
        const root = new Element('root', {});
        appendChild(root, element);

        unitToTest.css.inline(element, [root], { inputFile: {} } as Options);

        expect(getOuterHTML(root.children)).toBe(
            `<style>${fileContent}</style>`
        );
    });

    test('convert inline external img', () => {
        const fileContent = '12345678';
        const base64Encoding = Buffer.from(fileContent).toString('base64');
        (readFile as jest.Mock).mockReturnValue(fileContent);
        const element = new Element('img', { src: './pic.png' });
        const root = new Element('root', {});
        appendChild(root, element);

        unitToTest.image.inline(element, [root], { inputFile: {} } as Options);

        expect(getOuterHTML(root.children)).toBe(
            `<img src="data:image/png;base64,${base64Encoding}">`
        );
    });
});
