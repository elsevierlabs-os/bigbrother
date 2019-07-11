import PageWrapper from '../PageWrapper';
import Spinner from '../Spinner';
import expect from '../expectations/expect';
import { AsyncFunction } from '../lib/functions';

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
        const spinner = new Spinner(this.displayName);
        const pageWrapper = await this.createPageWrapper(browser);

        try {
            const executor = new AsyncFunction('expect', 'page', `return Promise.resolve((${this.cb.toString()})(page))`);
            await executor(expect, pageWrapper);

            await pageWrapper.close();

            spinner.complete();
        } catch(e) {
            spinner.exception(e);
            await pageWrapper.close();
        }
        // should return test output
        return pageWrapper.toJSON();
    }
}

export default Test;