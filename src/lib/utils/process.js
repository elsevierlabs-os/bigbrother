import { printError, printInfo } from '../printer';
import { spawn, exec } from 'child_process';
import { SPACE } from '../constants';

const SIGTERM = 'SIGTERM';
const SIGINT = 'SIGINT';

export const LOCAL_DEVELOPMENT_ENV_FLAG = 'BIGBROTHER_LOCAL';

const CLOSE_EVENT = 'close';
const ERROR_EVENT = 'error';

export const TASKS = {
    open: 'open'
};

export const getEnvFlag = flag => process && process.env && process.env[flag];
export const exitProcess = (status = 0) => process && process.exit && process.exit(status);
export const getProcessCWD = () => process && process.cwd && process.cwd();

const handleChildProcessDeath = pid => (code, signal) =>
    printInfo(`ChildProcess with pid: ${pid} died because of ${signal}, code: ${code}`);
const handleChildProcessError = pid => err => printInfo(`ChildProcess with pid: ${pid} received error`, err);

export const logChildProcessEvents = childProcess => {
    childProcess.on(CLOSE_EVENT, handleChildProcessDeath(childProcess.pid));
    childProcess.on(ERROR_EVENT, handleChildProcessError(childProcess.pid));
};

export const spawnProcess = (cmd, args, options) => {
    const childProcess = spawn(cmd, args, {
        detached: true,
        ...options
    });
    logChildProcessEvents(childProcess);

    return childProcess;
};

export const killProcess = childProcess => {
    const processGroupPid = -childProcess.pid;
    printInfo(`Killing process withing group pid: ${-processGroupPid}`);
    process.kill(processGroupPid);
};

export const onUserInterrupt = action => {
    const signalHandler = signal => () => {
        printInfo(`Received ${signal}, executing action`);
        action();
    };

    process.on(SIGTERM, signalHandler(SIGTERM));
    process.on(SIGINT, signalHandler(SIGINT));
};

export const executeTask = (task, ...args) => {
    if (task in TASKS) {
        const command = `${task} ${args.join(SPACE)}`;
        exec(command, (error, stdout) => {
            if (error) {
                printError(`Error while executing task "${command}": ${error}`);
                return;
            }

            printInfo(`Received from task "${command}": ${stdout}`);
        });
    } else {
        printError(`The following task "${task}" is not available.`);
    }
};
