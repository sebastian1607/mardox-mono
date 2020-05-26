import { Element, Node } from 'domhandler';
import { filter, getOuterHTML } from 'domutils';
import { launch } from 'puppeteer';
import { Options } from '../../api';
import { convertPath as convertFile } from '../utils/file-reader';
import { Inliner, INLINE_NODES } from './tag-inliner';

export function print(options: Options, content: Node[]) {
    (INLINE_NODES as Inliner[]).forEach((inliner) => {
        const toInlineElements = filter(inliner.predicate, content, true);
        toInlineElements.forEach((toInlineElement) => {
            inliner.inline(toInlineElement as Element, content, options);
        });
    });

    (async () => {
        const browser = await launch({
            args: ['--disable-dev-shm-usage'],
        });
        const page = await browser.newPage();
        await page.setContent(getOuterHTML(content));
        await page.pdf({
            path: convertFile(options.outputFile),
            format: options.format,
            margin: options.margins,
        });
        await page.close();
        await browser.close();
    })();
}
