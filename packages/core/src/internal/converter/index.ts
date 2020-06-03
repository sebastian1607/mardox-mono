import { Converter } from './converter';
import htmlConverter from './html-converter';
import markdownConverter from './markdown-converter';

export * from './converter';
export const CONVERTER: Converter[] = [markdownConverter, htmlConverter];
