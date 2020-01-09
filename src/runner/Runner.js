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
import TaskRunner, { PRECOMMAND } from './TaskRunner';
import FileReader from '../lib/FileReader';
import { getConfig, storeConfiguration } from '../config';

class Runner {

    constructor() {
        this.browser = null;
        this.suites = [];
    }

    executeTestSuites = (tests = []) => {
        const suites = tests.map(({ filename, content}) => {
            return new Suite(filename, content, this.browser);
        });

        return PromiseSerial(suites
            .map( s => () => s.execute()))
            .then(this.evaluateResults);
    };

    static handleException = (e) => {
        printException(e);
        exitProcess(1);
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
            .stop(PRECOMMAND)
            .then(() => printInfo(`${PRECOMMAND} command has been killed.`))
            .catch(Runner.handleException);
    }

    static checkTargetApplicationIsRunning() {
        const { baseUrl, maxRetries, retryTimeout } = getConfig();
        return pingEndpoint(baseUrl, maxRetries, retryTimeout);
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
                    .then(FileReader.getFiles)
                    .then(FileReader.onFilesFound)
                    .then(this.executeTestSuites)
                    .catch(Runner.handleException);
            })
            .catch(Runner.handleException);
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
