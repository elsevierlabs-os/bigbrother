import { pingEndpoint } from '../lib/httpClient';
import { printBigBrother, printInfo, printException } from '../lib/printer';
import { exitProcess, onUserInterrupt } from '../lib/utils/process';
import ProcessRunner, { BEFORE } from './ProcessRunner';
import TestRunner from './TestRunner';
import FileReader from '../lib/FileReader';
import ReportGenerator from '../reports/ReportGenerator';
import { getConfig, storeConfiguration } from '../config';
import { RUNNER_CLEANUP_MESSAGE, RUNNER_STARTING_MESSAGE, RUNNER_TERMINATION_MESSAGE } from '../lib/constants';

class Runner {
    static setup(configuration) {
        storeConfiguration(configuration);
        onUserInterrupt(Runner.stop);
    }

    static cleanup = (exitCode) => {
        printInfo(RUNNER_CLEANUP_MESSAGE);
        ProcessRunner.executePostCommand();
        ProcessRunner
            .stop(BEFORE)
            .catch(printException)
            .finally(Runner.getTerminationHandler(exitCode));
    };

    static getTerminationHandler = exitCode => () => {
        printInfo(RUNNER_TERMINATION_MESSAGE);
        exitProcess(exitCode === undefined ?
            TestRunner.getFailures().length :
            exitCode
        );
    };

    static ensureTargetApplicationIsRunning() {
        const { baseUrl, maxRetries, retryTimeout } = getConfig();
        return pingEndpoint(baseUrl, maxRetries, retryTimeout);
    }

    static execute = () => {
        const { main } = getConfig();
        if (main) {
            return ProcessRunner.executeMainCommand();
        } else {
            return TestRunner
                .startBrowser()
                .then(FileReader.readTestFiles)
                .then(TestRunner.executeTestSuites)
                .then(TestRunner.stopBrowser)
                .then(ReportGenerator.generateReport)
                .then(ReportGenerator.openReport);
        }
    }

    static start(config) {
        printInfo(RUNNER_STARTING_MESSAGE);
        Runner.setup(config);
        printBigBrother();
        ProcessRunner
            .executePreCommand()
            .then(Runner.ensureTargetApplicationIsRunning)
            .then(Runner.execute)
            .then(Runner.cleanup)
            .catch(printException);
    }
}

export default Runner;
