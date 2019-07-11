import puppeteer from 'puppeteer';
import path from 'path';

class Browser {

    // Browser is created by bigbrother, sending env flags
    constructor({ headless = true, cacheEnabled = false } = {}) {
        this.browser = null;

        this.puppeteerOptions = {
            headless
            // executablePath: path.resolve('./node_modules/puppeteer/.local-chromium/mac-662092')
        };

        this.pageOptions = {
            cacheEnabled
        };

        this.pages = [];
    }

    storePage(key, page) {
        // we should use a key value map
        // to store pages.
        // key should be the name of the single scenario.
        this.pages.push(page);
    }

    closePage(key) {
        // we get the page using the key
        // we remove the page from the list
        // after closing it.
    }

    async newPage() {
        const page = await this.browser.newPage();
        page.setCacheEnabled(this.pageOptions.cacheEnabled);

        this.storePage('', page);

        return page;
    }
    async launch() {
        this.browser = await puppeteer.launch(this.puppeteerOptions);
        // this.browser.on(this.TARGET_CHANGED_EVENT, this.onTargetChanged);

        return this.browser;
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
}

export default Browser;