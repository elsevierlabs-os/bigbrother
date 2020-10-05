import puppeteer from 'puppeteer';
import { printWarning } from '../lib/printer';
import { BROWSER_CANT_CLOSE_MESSAGE, BROWSER_CANT_OPEN_PAGE_MESSAGE } from '../lib/constants';

class Browser {
    constructor({ headless = true, cacheEnabled = false } = {}) {
        this.browser = null;

        this.puppeteerOptions = {
            headless
        };

        this.pageOptions = {
            cacheEnabled
        };

        this.hasLaunched = false;
        this.pages = [];
    }

    async newPage() {
        if (this.hasLaunched) {
            const page = await this.browser.newPage();
            page.setCacheEnabled(this.pageOptions.cacheEnabled);

            return page;
        } else {
            printWarning(BROWSER_CANT_OPEN_PAGE_MESSAGE);
        }
    }

    async launch() {
        this.browser = await puppeteer.launch(this.puppeteerOptions);
        this.hasLaunched = true;
        return this.browser;
    }

    async close() {
        if (this.hasLaunched) {
            await this.browser.close();
            this.browser = null;
        } else {
            printWarning(BROWSER_CANT_CLOSE_MESSAGE);
        }
    }
}

export default Browser;
