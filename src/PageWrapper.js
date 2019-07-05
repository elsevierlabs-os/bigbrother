import {
    CPU,
    CPU_CONDITIONS_MESSAGE,
    NETWORK,
    NETWORK_CONDITIONS_MESSAGE
} from './constants';

import performanceAnalyzer from './PerformanceAnalyzer';
import {deepSet} from './lib/objectutils';

class PageWrapper {

    constructor(page, testKey) {

        this.options = {};

        this.page = page;
        this.testKey = testKey;

        this.measurements = {};

        if (!this.page) {
            throw new Error('PageWrapper requires a puppeteer Page');
        }
    }

    async close() {
        // using the page to close
        if (this.hasPage()) {
            await this.page.close();
        }
    }

    setNetworkConditions() {
        if (this.client) {
            return this.client.send(NETWORK_CONDITIONS_MESSAGE, this.network());
        }
    }

    setCpuConditions() {
        if (this.client) {
            return this.client.send(CPU_CONDITIONS_MESSAGE, this.cpu());
        }
    }

    setConditions = async ({ cpu = CPU.DEFAULT, network = NETWORK.WIFI } = {}) => {
        this.client = await this.page
            .target()
            .createCDPSession();

        this.options.cpu = cpu;
        this.options.network = network;

        this.setNetworkConditions();
        this.setCpuConditions();
    }

    cpu() {
        return this.options.cpu;
    }

    network() {
        return this.options.network;
    }

    hasPage() {
        return Boolean(this.page);
    }

    getKey(key) {
        return `${this.testKey}.${key}`;
    }

    storeMeasurement = (data) => {
        deepSet(data.key, data, this.measurements);
    };

    _load = (url) => async () => await this.page.goto(url);
    _click = (selector, options) => async () => await this.page.click(selector, options);
    _focus = (selector) => async () => await this.page.focus(selector);

    async load(url) {
        return new Promise(async (resolve, reject) => {
            if (this.hasPage() && url) {
                this.options.url = url;
                const data = await performanceAnalyzer.measure(this.getKey('load'), this._load(url));
                this.storeMeasurement(data);
                resolve(data.duration);
            } else {
                reject('Page has not been initialised.');
            }
        });
    }

    async click(selector, options = {}) {
        return new Promise(async (resolve, reject) => {
            if (this.hasPage()) {
                const data = await performanceAnalyzer.measure(this.getKey('click'), this._click(selector, options));
                this.storeMeasurement(data);
                resolve(data.duration);
            } else {
                reject('Page has not been initialised.');
            }
        });
    }

    async focus(selector) {
        return new Promise(async (resolve, reject) => {
            if (this.hasPage()) {
                const data = await performanceAnalyzer.measure(this.getKey('focus'), this._focus(selector));
                this.storeMeasurement(data);
                resolve(data.duration);
            } else {
                reject('Page has not been initialised.');
            }
        });
    }

    async tap(select) {}

    async setUserAgent(userAgent) {}

    async type(selector, text) {}

    async keyboard(event) {}

    async screenshot() {}

    async waitFor(selector) {}

    toJSON() {
        return JSON.stringify(this.measurements, null, 4);
    }
}

export default PageWrapper;