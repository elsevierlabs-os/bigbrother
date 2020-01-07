import { printInfo } from '../printer';
import kill from 'tree-kill';

const SIGTERM = 'SIGTERM';
const SIGINT = 'SIGINT';

export const getEnvFlag = (flag) => process && process.env && process.env[flag];
export const exitProcess = (status = 0) => process && process.exit && process.exit(status);
export const getProcessCWD = () => process && process.cwd && process.cwd();
export const killProcess = (pid) => {
    printInfo(`Killing process ${pid}`);
    kill(pid);
};
export const onUserInterrupt = (action) => {
    const signalHandler = (signal) => () => {
        printInfo(`Received ${signal}, executing action`);
        action();
    };

    process.on(SIGTERM, signalHandler(SIGTERM));
    process.on(SIGINT, signalHandler(SIGINT));
}
