import glob from 'glob';
import fs from 'fs';
import Suite from '../tests/Suite';
import Browser from '../browser/Browser';
import { PromiseSerial } from '../lib/functions';
import { pingEndpoint } from '../lib/httpClient';
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
    printInfo,
    printException
} from '../lib/printer';

import {exitProcess, onUserInterrupt} from '../lib/utils/process';
import TaskRunner from './TaskRunner';
import { getConfig, storeConfiguration } from '../config';

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

        const suitesLabel = files.length > 1 ? 'suites' : 'suite';
        printInfo(`Found ${files.length} ${suitesLabel}`);

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

    setup(configuration) {
        storeConfiguration(configuration);
        onUserInterrupt(this.stop);
        TaskRunner.executePreCommand();
    }

    static cleanup() {
        printInfo('Performing Runner cleanup.');
        TaskRunner.executePostCommand();
        TaskRunner
            .stopAll()
            .then(() => printInfo('All processes have been killed.'))
            .catch(printException);
    }

    static checkTargetApplicationIsRunning() {
        const { baseUrl, maxRetries } = getConfig();
        const timeout = 1500;
        return pingEndpoint(baseUrl, maxRetries, timeout);
    }

    start(config) {
        printInfo('Starting Runner.');
        this.setup(config);
        Runner.checkTargetApplicationIsRunning()
            .then(() => {
                printBigBrother();
                printInfo('Starting Browser.');
                this.browser = new Browser(config);
                this.browser
                    .launch()
                    .then(() => glob(this.pattern, {}, this.onFilesFound));
            })
            .catch(printException);
    }

    stop = (status) => {
        Runner.cleanup();
        if (this.browser) {
            this.browser
                .close()
                .then(() => exitProcess(status));
        }
    }
}

export default Runner;
