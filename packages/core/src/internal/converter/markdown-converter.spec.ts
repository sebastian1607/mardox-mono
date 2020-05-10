import { Node } from 'domhandler';
import { getOuterHTML } from 'domutils';
import { Options } from '../../api';
import { readFile } from '../utils/file-reader';
import unitToTest from './markdown-converter';
jest.mock('../utils/file-reader');

const testMarkdown = `
<link href='style.css'></link>
# Das
## ist ein Dummy
### Markdown
`;

const expectation = `<html><head><link href="style.css"></head><body>
<h1>Das</h1>
<h2>ist ein Dummy</h2>
<h3>Markdown</h3>
</body></html>`;

describe('MarkdownConverter should', () => {
    test('convert markdown', () => {
        const options: Options = {} as Options;
        (readFile as jest.Mock).mockReturnValue(testMarkdown);
        const result: Node[] = unitToTest.convert(options);
        expect(getOuterHTML(result)).toBe(expectation);
    });
});
