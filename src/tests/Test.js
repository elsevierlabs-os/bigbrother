import PageWrapper from '../PageWrapper';
import Spinner from '../Spinner';

class Test {

    constructor(name, cb, displayName) {
        // this requires a browser instance to get the pageBuilder
        // this also requires the block were it belongs
        this.name = name;
        this.cb = cb;
        this.displayName = displayName || name;
    }

    async createPageWrapper(browser) {
        const page = await browser.newPage();

        return new PageWrapper(page, this.name);
    }

    async execute(browser) {
        // callback will receive a PageBuilder

        const spinner = new Spinner(this.displayName);

        try {
            const pageWrapper = await this.createPageWrapper(browser);

            await this.cb(pageWrapper);
            // closing all pages when we're done.
            // we should close page
            await pageWrapper.close();

            spinner.complete();
        } catch(e) {
            spinner.exception(e);
        }
        // should return test output
        return {};
    }
}

export default Test;