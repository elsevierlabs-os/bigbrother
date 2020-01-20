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
    printInfo,
    printException
} from '../lib/printer';

import { exitProcess, onUserInterrupt } from '../lib/utils/process';
import ProcessRunner, { BEFORE } from './ProcessRunner';
import FileReader from '../lib/FileReader';
import { getConfig, storeConfiguration } from '../config';

class Runner {

    constructor() {
        this.browser = null;
        this.suites = [];
        this.failed = [];
    }

    executeTestSuites = (tests = []) => {
        const suites = tests.map(({ filename, content}) => {
            return new Suite(filename, content, this.browser);
        });

        return PromiseSerial(suites
            .map( s => () => s.execute()))
            .then(this.evaluateResults);
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

        this.failed = failed;
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
        ProcessRunner.executePreCommand();
    }

    cleanup = () => {
        printInfo('Performing Runner cleanup.');
        ProcessRunner.executePostCommand();
        ProcessRunner
            .stop(BEFORE)
            .catch(printException)
            .finally(this.terminate);
    };

    terminate = () => {
        printInfo('Terminating Runner.');
        exitProcess(this.failed.length);
    };

    static checkTargetApplicationIsRunning() {
        const { baseUrl, maxRetries, retryTimeout } = getConfig();
        return pingEndpoint(baseUrl, maxRetries, retryTimeout);
    }

    startBrowser = () => {
        printInfo('Starting Browser.');
        this.browser = new Browser(getConfig());

        return this.browser.launch();
    };

    start(config) {
        printInfo('Starting Runner.');
        this.setup(config);
        printBigBrother();
        Runner.checkTargetApplicationIsRunning()
            .then(this.startBrowser)
            .then(FileReader.readFiles)
            .then(this.executeTestSuites)
            .then(this.stop)
            .catch(printException)
            .finally(this.cleanup);
    }

    stop = () => {
        if (this.browser) {
            return this.browser.close();
        }

        return Promise.resolve();
    }
}

export default Runner;
