import { Options } from "./model";

import { launch } from 'puppeteer';
import { Remarkable } from 'remarkable';

export function convert(options: Options) {
    (async () => {
        const browser = await launch();
        const page = await browser.newPage();
        page.setContent(convertMarkdown())
        //await page.goto('file:///Users/sebastiankempken/test.md');
        await page.pdf({
            path: 'test.pdf',
            format: 'A4',
            margin: {
                top: "20px",
                left: "20px",
                right: "20px",
                bottom: "20px"
            }
        });
        await browser.close();
    })();
}

const convertMarkdown = () => {
    const md: Remarkable = new Remarkable();
    const html = md.render('# Hallo22223');
    console.log("HTML:", html)
    return html;
}