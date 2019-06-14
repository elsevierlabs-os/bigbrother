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

        // constants
        this.TARGET_CHANGED_EVENT = 'targetchanged';
        this.NETWORK_CONDITIONS_MESSAGE = 'Network.emulateNetworkConditions';
        this.CPU_CONDITIONS_MESSAGE = 'Emulation.setCPUThrottlingRate';
        this.NAVIGATION_INFO_TYPE = 'navigation';
        this.PAINT_INFO_TYPE = 'paint';
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

    onTargetChanged = (target) => {
        this.target = target;
    }

    hasTarget = () => !!this.target;

    setNetworkConditions(client, networkOptions) {
        if (client) {
            return client.send(this.NETWORK_CONDITIONS_MESSAGE, networkOptions);
        }
    }

    setCpuConditions(client, cpuOptions) {
        if (client) {
            return client.send(this.CPU_CONDITIONS_MESSAGE, cpuOptions);
        }
    }

    setConditions = async (pageWrapper) => {
        if (!this.hasTarget()) {
            const page = await this.target.page();

            if (page && page.target().url() === pageWrapper.url()) {
                await page.target()
                    .createCDPSession()
                    .then((client) => {
                        this.setNetworkConditions(client, pageWrapper.network());
                        this.setCpuConditions(client, pageWrapper.cpu());
                    })
                    .catch(err => console.error(err));
            }
        } else {
            throw new Error('Browser need a target to set proper conditions');
        }
    }

    async launch() {
        this.browser = await puppeteer.launch(this.puppeteerOptions);
        this.browser.on(this.TARGET_CHANGED_EVENT, this.onTargetChanged);

        return this.browser;
    }

    close() {
        if (this.browser) {
            this.browser.close();
            this.browser = null;
        }
    }
}

export default Browser;