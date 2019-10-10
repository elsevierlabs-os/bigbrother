import {cleanFileName} from '../lib/pathutils';
import expect from '../expectations/expect';
import PageWrapper from '../PageWrapper';
import Spinner from '../Spinner';
import {PromiseSerial} from '../lib/functions';

export default class Suite {

    constructor(filename, content, browser) {
        this.content = content;
        this.filename = cleanFileName(filename);
        this.browser = browser;
        this.tests = [];

        this.root = true;
    }

    async createPageWrapper(name) {
        const page = await this.browser.newPage();

        return new PageWrapper(page, name);
    }

    it = async (title, f)  => {

        const asyncTest = async () => {
            let success = true,
                reason = '';

            if (this._beforeEach) {
                this._beforeEach()
            }
            const page = await this.createPageWrapper(title, this.browser);
            const spinner = new Spinner(title);
            try {
                await f(page);
                await page.close();
                spinner.complete();
            } catch(e) {
                success = false;
                reason = e;
                spinner.exception(e);
            }
            if (this._afterEach) {
                this._afterEach();
            }

            return { title, success, reason };
        };

        this.tests.push(() => asyncTest());
    }

    describe = (title, f)  => {
        f();
        if (this._after && this.root) {
            this.root = false;
            this._after();
        }
    };

    before = (f) => {
        f();
    };

    after = (f) => {
        this._after = f;
    };

    beforeEach = (f) => {
        this._beforeEach = f;
    };

    afterEach = (f) => {
        this._afterEach = f;
    };

    async execute() {
        const args = {
            'describe': this.describe,
            'it': this.it,
            'before': this.before,
            'beforeEach': this.beforeEach,
            'after': this.after,
            'afterEach': this.afterEach,
            'expect': expect,
            'require': require,
            'module': module
        };

        const executor = new Function(...Object.keys(args), this.content);
        executor.call(null, ...Object.values(args));

        return await PromiseSerial(this.tests);
    }
}
