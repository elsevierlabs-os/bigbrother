import { pingEndpoint } from '../lib/httpClient';
import {
    printBigBrother,
    printInfo,
    printException
} from '../lib/printer';
import { exitProcess, onUserInterrupt } from '../lib/utils/process';
import ProcessRunner, { BEFORE } from './ProcessRunner';
import TestRunner from './TestRunner';
import FileReader from '../lib/FileReader';
import { getConfig, storeConfiguration } from '../config';
import {
    RUNNER_CLEANUP_MESSAGE,
    RUNNER_STARTING_MESSAGE,
    RUNNER_TERMINATION_MESSAGE
} from '../lib/constants';

class Runner {

    static setup(configuration) {
        storeConfiguration(configuration);
        onUserInterrupt(Runner.stop);
        ProcessRunner.executePreCommand();
    }

    static cleanup = () => {
        printInfo(RUNNER_CLEANUP_MESSAGE);
        ProcessRunner.executePostCommand();
        ProcessRunner
            .stop(BEFORE)
            .catch(printException)
            .finally(Runner.terminate);
    };

    static terminate = () => {
        printInfo(RUNNER_TERMINATION_MESSAGE);
        exitProcess(TestRunner.getFailures().length);
    };

    static checkTargetApplicationIsRunning() {
        const { baseUrl, maxRetries, retryTimeout } = getConfig();
        return pingEndpoint(baseUrl, maxRetries, retryTimeout);
    }

    static start(config) {
        printInfo(RUNNER_STARTING_MESSAGE);
        Runner.setup(config);
        printBigBrother();
        Runner.checkTargetApplicationIsRunning()
            .then(TestRunner.startBrowser)
            .then(FileReader.readFiles)
            .then(TestRunner.executeTestSuites)
            .then(Runner.stop)
            .catch(printException)
            .finally(Runner.cleanup);
    }

    static stop = () => {
        return TestRunner.stopBrowser();
    }
}

export default Runner;
