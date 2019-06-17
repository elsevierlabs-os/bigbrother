import PageWrapper from './PageWrapper';
import { CPU, NETWORK } from './constants';

const DEFAULT_OPTIONS = {
    cpu: CPU.DEFAULT,
    network: NETWORK.WIFI,
    url: ''
};

class PageBuilder {

    constructor(browser) {
        if (browser) {
            this.options = DEFAULT_OPTIONS;

            this.browser = browser;
        } else {
            return new Error('PageBuilder needs a valid browser instance');
        }
    }

    reset() {
        this.options = DEFAULT_OPTIONS;
    }

    withCpu(cpu) {
        this.options.cpu = cpu;
        return this;
    }

    withNetwork(network) {
        this.options.network = network;
        return this;
    }

    withUrl(url) {
        this.options.url = url;
        return this;
    }

    async build() {

        if (this.options.url) {
            const page = await this.browser.newPage();
            const pageWrapper = new PageWrapper(page, this.options);

            await pageWrapper.load();
            await this.browser.setConditions(pageWrapper);

            // we should probably restore options to original values
            this.reset();

            return page

        } else {
            throw new Error('cannnot create new page with url');
        }
    }
}

export default PageBuilder;