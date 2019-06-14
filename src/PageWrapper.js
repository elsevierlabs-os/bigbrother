import { CPU, NETWORK } from './constants';

class PageWrapper {

    constructor(page, { url = '', cpu = CPU.DEFAULT, network = NETWORK.WIFI } = {}) {
        this.options = {
            cpu,
            network,
            url
        };
        this.page = page;

        if (!this.page) {
            throw new Error('PageWrapper requires a puppeteer Page');
        }
    }

    url() { return this.options.url; }
    cpu() { return this.options.cpu; }
    network() { return this.options.network; }

    hasPage() {
        return Boolean(this.page);
    }

    async load(url = this.url()) {
        if (this.hasPage()) {
            console.log(this.page);
            await this.page.goto(url);
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
}

export default PageWrapper;