import {
    CPU,
    CPU_CONDITIONS_MESSAGE,
    NETWORK,
    NETWORK_CONDITIONS_MESSAGE
} from './constants';

class PageWrapper {

    constructor(page) {

        this.options = {};

        this.page = page;

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

    setNetworkConditions(client, networkOptions) {
        if (client) {
            return client.send(NETWORK_CONDITIONS_MESSAGE, networkOptions);
        }
    }

    setCpuConditions(client, cpuOptions) {
        if (client) {
            return client.send(CPU_CONDITIONS_MESSAGE, cpuOptions);
        }
    }

    setConditions = async ({ cpu = CPU.DEFAULT, network = NETWORK.WIFI } = {}) => {
        const client = await this.page.target().createCDPSession();

        this.options.cpu = cpu;
        this.options.network = network;

        this.setNetworkConditions(client, this.network());
        this.setCpuConditions(client, this.cpu());
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

    async load(url) {
        if (this.hasPage() && url) {
            this.options.url = url;
            await this.page.goto(url);
        } else {
            throw new Error('PageWrapper.load(): url is missing');
        }
    }

    async click(selector) {
        return new Promise((resolve, reject) => {
            if (this.hasPage()) {
                const now = +(new Date());
                // now we click on the thing and we measure perf
                const end = +(new Date());
                resolve(end - now);
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
}

export default PageWrapper;