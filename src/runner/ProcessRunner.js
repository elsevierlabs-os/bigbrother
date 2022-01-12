import { getConfig } from '../config';
import { SPACE } from '../lib/constants';
import { printInfo } from '../lib/printer';
import { killProcess, spawnProcess } from '../lib/utils/process';

const NPM = 'npm';
export const BEFORE = 'before';
export const AFTER = 'after';
export const MAIN = 'main';

class ProcessRunner {
    constructor() {
        this.processes = {};
    }

    static isNpmCommand(command) {
        return command === NPM;
    }

    static parseCommand(command) {
        const split = command.split(SPACE);

        return {
            cmd: split[0],
            args: split.splice(1, split.length)
        };
    }

    executePreCommand() {
        const { before } = getConfig();
        if (before) {
            printInfo('Executing BEFORE');
            return this.start(BEFORE, before);
        }

        return Promise.resolve();
    }

    executePostCommand() {
        const { after } = getConfig();
        if (after) {
            printInfo('Executing AFTER');
            return this.start(AFTER, after);
        }

        return Promise.resolve();
    }

    executeMainCommand() {
        const { main } = getConfig();
        if (main) {
            printInfo('Executing MAIN');
            return new Promise((resolve, reject) => {
                const options = {
                    onClose: resolve,
                    onError: reject,
                    stdio: [
                        process.stdin,
                        process.stdout,
                        process.stderr
                    ]
                };
                this.start(MAIN, main, options);
            });
        }

        return Promise.resolve();
    }

    start(name, command, options ) {
        return new Promise((resolve, reject) => {
            try {
                const { cwd } = getConfig();
                const { cmd, args } = ProcessRunner.parseCommand(command);
                printInfo(`Executing NPM command on ${cwd}, command: ${command}`);

                if (ProcessRunner.isNpmCommand(cmd)) {
                    this.processes[name] = spawnProcess(NPM, args, { cwd, ...options });
                } else {
                    this.processes[name] = spawnProcess(cmd, args, { cwd, ...options });
                }
                resolve(name);
            } catch (e) {
                reject(e);
            }
        });
    }

    stop(taskId) {
        return new Promise((resolve, reject) => {
            const childProcess = this.processes[taskId];
            try {
                if (childProcess && !childProcess.killed) {
                    killProcess(childProcess);
                    printInfo(`${taskId} process has been killed`);
                } else {
                    const message =
                        `The required process ${taskId}` + (!childProcess ? ' does not exist' : ' is already dead.');
                    printInfo(message);
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    stopAll() {
        return Promise.all(Object.keys(this.processes).map(t => this.stop(t)));
    }
}

export default new ProcessRunner();
