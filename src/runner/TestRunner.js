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
import {
    BROWSER_NOT_INITIALISED,
    BROWSER_STARTING_MESSAGE
} from '../lib/constants';

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
    }

    stopBrowser = () => {
        if (this.hasBrowser()) {
            return this.browser.close();
        }

        return Promise.reject(BROWSER_NOT_INITIALISED);
    };

    hasBrowser() {
        return !!this.browser;
    }

    mapTestToNewSuite = ({ filename, content }) => new Suite(filename, content, this.browser);
    mapSuitesToExecution = suite => () => suite.execute();
    mapTestsToPromises = (tests) => (
        tests
            .map(this.mapTestToNewSuite)
            .map(this.mapSuitesToExecution)
    );

    executeTestSuites = (tests = []) => (
        PromiseSerial(this.mapTestsToPromises(tests))
            .then(this.evaluateResults)
    );

    static extractFailure(suites = []) {
        return suites.reduce((total, suite) => ([
            ...total,
            ...suite.filter(test => !test.success)
        ]), []);
    }

    evaluateResults = (suites) => {
        this.failures = TestRunner.extractFailure(suites);
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
        this.getFailures().forEach(test => {
            printTitleTest(test.title);
            printFailedTest(test.reason.message);
            printNewLines(1)
        });
    };
}

export default new TestRunner();
