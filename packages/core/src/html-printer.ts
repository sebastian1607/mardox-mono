import { Options } from './model';
import { launch } from 'puppeteer';

export function print(options: Options, content: string) {
    (async () => {
        console.log('CONTENT', content);
        console.log('OPTIONS', options);
        const browser = await launch();
        const page = await browser.newPage();
        page.setContent(content);
        await page.pdf({
            path: options.outputFile,
            format: options.format,
            margin: options.margins,
        });
        await browser.close();
    })();
}
