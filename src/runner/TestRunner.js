import { printInfo, printNewLines } from '..';
import Browser from '../browser/Browser';
import { getConfig } from '../config';
import Suite from '../tests/Suite';
import { PromiseSerial } from '../lib/functions';
import {
    printDelimiter,
    printFailedTest,
    printRunnerFailure,
    printRunnerSuccess,
    printTitleTest
} from '../lib/printer';
import { BROWSER_NOT_INITIALISED, BROWSER_STARTING_MESSAGE } from '../lib/constants';

class TestRunner {
    constructor() {
        this.failures = [];
        this.suites = [];
        this.browser = null;
    }

    startBrowser = () => {
        printInfo(BROWSER_STARTING_MESSAGE);
        this.browser = new Browser(getConfig());

        return this.browser.launch();
    };

    stopBrowser = () => {
        if (this.hasBrowser()) {
            return this.browser.close();
        }

        return Promise.reject(BROWSER_NOT_INITIALISED);
    };

    hasBrowser() {
        return !!this.browser;
    }

    mapTestToNewSuite = ({ content }) => new Suite(content, this.browser);
    mapSuitesToExecution = suite => () => suite.execute();
    mapTestsToPromises = tests => tests.map(this.mapTestToNewSuite).map(this.mapSuitesToExecution);

    executeTestSuites = (tests = []) => PromiseSerial(this.mapTestsToPromises(tests)).then(this.evaluateResults);

    isFailedTest = ({ success }) => !success;

    extractFailuresFromSuites = () =>
        this.suites.reduce((total, suite) => [...total, ...suite.filter(this.isFailedTest)], []);

    evaluateResults = (suites = []) => {
        this.suites = suites;
        this.failures = this.extractFailuresFromSuites();
        const failuresCount = this.failures.length;
        const suitesCount = suites.length;

        printDelimiter();

        if (failuresCount > 0) {
            printRunnerFailure(suitesCount, failuresCount);
            this.printFailures();
        } else {
            printRunnerSuccess(suitesCount);
        }
    };

    getFailures() {
        return this.failures;
    }

    printFailures = () => {
        printNewLines();
        this.getFailures().forEach(({ name, reason }) => {
            printTitleTest(name);
            printFailedTest(reason.message);
            printNewLines(1);
        });
    };

    toJSON() {
        return {
            suites: this.suites,
            failures: this.failures
        };
    }
}

export default new TestRunner();
