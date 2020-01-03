import glob from 'glob';
import fs from 'fs';
import Suite from './tests/Suite';
import Browser from './browser/Browser';
import { PromiseSerial } from './lib/functions';

import {
    printDelimiter,
    printRunnerFailure,
    printNewLines,
    printRunnerSuccess,
    printFailedTest,
    printTitleTest,
    printBigBrother,
    printFilePatternError,
    printError,
    printException
} from './lib/printer';

import { exitProcess } from './lib/processutils';
import config from './config';

class Runner {

    constructor(pattern) {
        this.pattern = pattern;
        this.browser = null;
        this.suites = [];
    }

    readFile = (filename) => {
        const content = fs.readFileSync(filename, 'utf8');

        return { filename, content };
    };

    executeTestSuites = (tests = []) => {
        this.suites = tests.map(({ filename, content}) => {
            return new Suite(filename, content, this.browser);
        });

        PromiseSerial(this.suites
            .map( s => () => s.execute()))
            .then(this.evaluateResults)
            .catch(this.handleException);
    };

    handleException = (e) => {
        printException(e);
        exitProcess(1);
    };

    onFilesFound = (err, files = []) => {
        if (err) {
            printError(err);
            exitProcess(1);
        }

        if (!files.length) {
            printFilePatternError(this.pattern);
            exitProcess(1);
        }

        const tests = files.map(this.readFile);

        this.executeTestSuites(tests);
    };

    evaluateResults = (suites) => {
        let failed = suites.reduce((total, suite) => (
            [...total, ...suite.filter(test => !test.success)]
        ), []);
        const failedCount = failed.length;
        const suitesCount = suites.length;

        printDelimiter();

        if (failedCount > 0) {
            printRunnerFailure(suitesCount, failedCount);
            this.printFailures(failed);
        } else {
            printRunnerSuccess(suitesCount);
        }

        this.stop(failedCount);
    };

    printFailures = (failed) => {
        printNewLines();
        failed.forEach(test => {
            printTitleTest(test.title);
            printFailedTest(test.reason.message);
            printNewLines(1)
        });
    };

    start(browserOptions) {
        config.storeConfiguration(browserOptions);
        printBigBrother();
        this.browser = new Browser(browserOptions);
        this.browser
            .launch()
            .then(() => glob(this.pattern, {}, this.onFilesFound));
    }

    stop(status) {
        this.browser
            .close()
            .then(() => exitProcess(status));
    }
}

export default Runner;
