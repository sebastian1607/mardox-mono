import { Element, Node } from 'domhandler';
import { appendChild, filter, findOne, removeElement } from 'domutils';
import { parseDOM } from 'htmlparser2';
import { Remarkable } from 'remarkable';
import { Options } from '../../api';
import { readFile } from '../utils/file-reader';
import { Converter } from './converter';

const convertMarkdown = (markdown: string) => {
    const md: Remarkable = new Remarkable({
        html: true,
    });
    const html = md.render(markdown);
    return html;
};

const addHtmlData = (data: string) => `<html><head></head><body>${data}</body>`;

const filterExternalCss = (nodes: Node[]): Node[] =>
    filter(
        (element: Element) =>
            element.name === 'link' && element.attribs['href'] !== undefined,
        nodes,
        true
    );

const moveCssToHead = (domRoot: Node[], cssElements: Element[]): void => {
    const head = findOne(
        (element: Element) => element.name === 'head',
        domRoot,
        true
    );
    cssElements.forEach((cssElement) => {
        const element = new Element(cssElement.name, cssElement.attribs);
        appendChild(head, element);
    });
    cssElements.forEach((cssElement) => removeElement(cssElement));
};

const removeEmptyPTags = (domRoot: Node[]): void => {
    const emptyPTags = filter(
        (element: Element) =>
            element.name === 'p' && element.childNodes.length === 0,
        domRoot,
        true
    );
    emptyPTags.forEach((emptyPTag) => removeElement(emptyPTag));
};

const converter: Converter = {
    fileEnding: 'md',
    convert(options: Options): Node[] {
        const fileContent = readFile(options.inputFile, options.encoding);
        const convertedMarkdown = addHtmlData(convertMarkdown(fileContent));

        const dom = parseDOM(convertedMarkdown);

        const cssLinks: Element[] = filterExternalCss(dom) as Element[];
        if (cssLinks && cssLinks.length > 0) {
            moveCssToHead(dom, cssLinks);
            removeEmptyPTags(dom);
        }
        return dom;
    },
};

export default converter;
