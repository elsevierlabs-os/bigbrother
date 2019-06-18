import PageWrapper from '../PageWrapper';

class Test {

    constructor(name, cb) {
        // this requires a browser instance to get the pageBuilder
        // this also requires the block were it belongs
        this.name = name;
        this.cb = cb;
    }

    async createPageWrapper(browser) {
        const page = await browser.newPage();

        return new PageWrapper(page);
    }

    async execute(browser) {
        // callback will receive a PageBuilder
        const pageWrapper = await this.createPageWrapper(browser);

        await this.cb(pageWrapper);
        // closing all pages when we're done.
        // we should close page
        await pageWrapper.close();
        // should return test output
        return {};
    }
}

export default Test;