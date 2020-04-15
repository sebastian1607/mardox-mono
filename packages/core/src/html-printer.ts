import { Options } from './model';
import { launch } from 'puppeteer';

export function print(options: Options, content: string) {
    console.log('CONTENT', content);
    (async () => {
        const browser = await launch({
            args: ['--disable-dev-shm-usage'],
        });
        const page = await browser.newPage();
        await page.setContent(content);
        await page.pdf({
            path: options.outputFile,
            format: options.format,
            margin: options.margins,
        });
        await page.close();
        await browser.close();
    })();
}
