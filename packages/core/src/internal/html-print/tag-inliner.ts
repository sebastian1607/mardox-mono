import { DataNode, Element, Node } from 'domhandler';
import { appendChild, replaceElement } from 'domutils';
import { ElementType } from 'htmlparser2';
import { Options } from '../../api';
import { readFile } from '../utils/file-reader';
import { patchPath } from '../utils/path-utils';

export interface Inliner {
    predicate: (element: Element) => boolean;
    inline: (element: Element, dom: Node[], options: Options) => void;
}

export const css: Inliner = {
    predicate: (element: Element) =>
        element.name === 'link' &&
        element.attribs['href'] !== '' &&
        element.attribs['href'] !== undefined,
    inline: (element: Element, dom: Node[], options: Options) => {
        const href = element.attribs['href'];

        const filePath = patchPath(href, options.basePath);
        const content = readFile(filePath);

        const styleElement = new Element(ElementType.Style, {});
        const textNode = new DataNode(ElementType.Text, content);
        appendChild(styleElement, textNode);
        replaceElement(element, styleElement);
    },
};

export const INLINE_NODES: Inliner[] = [css];
