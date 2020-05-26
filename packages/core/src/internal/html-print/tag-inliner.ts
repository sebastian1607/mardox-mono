import { DataNode, Element, Node } from 'domhandler';
import { appendChild, replaceElement } from 'domutils';
import { ElementType } from 'htmlparser2';
import { Options } from '../../api';
import { readFile } from '../utils/file-reader';
import { patchPath } from '../utils/path-utils';

const isLocalRessource = (element: Element) => (
    name: string,
    attribute: string
) =>
    element.name === name &&
    element.attribs[attribute] !== '' &&
    element.attribs[attribute] !== undefined &&
    !element.attribs[attribute].startsWith('http');

export interface Inliner {
    predicate: (element: Element) => boolean;
    inline: (element: Element, dom: Node[], options: Options) => void;
}

export const css: Inliner = {
    predicate: (element: Element) => isLocalRessource(element)('link', 'href'),
    inline: (element: Element, dom: Node[], options: Options) => {
        // tslint:disable-next-line:no-string-literal
        const href = element.attribs['href'];

        const filePath = patchPath(href, options.inputFile.path);
        const content = readFile(filePath);

        const styleElement = new Element(ElementType.Style, {});
        const textNode = new DataNode(ElementType.Text, content);
        appendChild(styleElement, textNode);
        replaceElement(element, styleElement);
    },
};

export const image: Inliner = {
    predicate: (element: Element) => isLocalRessource(element)('img', 'src'),
    inline: (element: Element, dom: Node[], options: Options) => {
        // tslint:disable-next-line:no-string-literal
        const src = element.attribs['src'];
        const imageFileFormat = src.split('.').pop();

        const filePath = patchPath(src, options.inputFile.path);
        const content = readFile(filePath, null);

        const base64Encoded = Buffer.from(content).toString('base64');

        const inlinedImg = new Element('img', {
            ...element.attribs,
            src: `data:image/${imageFileFormat.toLowerCase()};base64,${base64Encoded}`,
        });
        replaceElement(element, inlinedImg);
    },
};

export const INLINE_NODES: Inliner[] = [css, image];
