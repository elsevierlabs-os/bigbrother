const puppeteer = require('puppeteer');

class PageWrapper {

    constructor(page) {
        this.page = page;
    }

    hasPage() {
        return Boolean(this.page);
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