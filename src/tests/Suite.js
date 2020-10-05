import expect from '../expectations/expect';
import PageWrapper from '../page/PageWrapper';
import Spinner from '../lib/Spinner';
import { PromiseSerial } from '../lib/functions';
import { FULL_STOP, ALL_SPACES, UNDERSCORE } from '../lib/constants';
import { getConfig } from '../config';
import { appendNodeModulesPathToModule } from '../lib/utils/module';
import ReportGenerator from '../reports/ReportGenerator';

export default class Suite {
    constructor(content, browser) {
        this.content = content;
        this.browser = browser;
        this.tests = [];

        this.names = [];
        this.rootname = '';
        this.root = true;
    }

    formatName = n => n.replace(ALL_SPACES, UNDERSCORE);

    getFullPageName = name => {
        return this.names.map(this.formatName).join(FULL_STOP).concat(FULL_STOP).concat(this.formatName(name));
    };

    async createPageWrapper(name) {
        const page = await this.browser.newPage();

        return new PageWrapper(page, name);
    }

    it = (name, f) => {
        const fullName = this.getFullPageName(name);

        const asyncTest = async () => {
            let success = true,
                reason = {};

            if (this._beforeEach) {
                this._beforeEach();
            }
            const page = await this.createPageWrapper(fullName);
            const spinner = new Spinner(name);
            try {
                await f(page);
                await page.close();
                spinner.complete();
            } catch ({ message, expected, received }) {
                success = false;
                reason = { message, expected, received };
                spinner.exception(reason);
            }
            if (this._afterEach) {
                this._afterEach();
            }
            ReportGenerator.storePage(page);

            return { name, success, reason, fullName };
        };

        this.tests.push(() => asyncTest());
    };

    describe = (name, f) => {
        if (this.root) {
            this.rootname = name;
            this.root = false;
            this.names.push(name);

            if (this._before) this._before();
            f();
            if (this._after) this._after();
        } else {
            this.names.push(name);
            f();
            this.names.pop();
        }
    };

    before = f => (this._before = f);
    after = f => (this._after = f);
    beforeEach = f => (this._beforeEach = f);
    afterEach = f => (this._afterEach = f);

    async execute() {
        const { cwd } = getConfig();
        appendNodeModulesPathToModule(module, cwd);

        const args = {
            describe: this.describe,
            it: this.it,
            before: this.before,
            beforeEach: this.beforeEach,
            after: this.after,
            afterEach: this.afterEach,
            expect: expect,
            require: require,
            module: module
        };

        const executor = new Function(...Object.keys(args), this.content);
        executor.call(null, ...Object.values(args));

        return await PromiseSerial(this.tests);
    }
}
