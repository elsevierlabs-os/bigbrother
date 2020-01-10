import { getConfig } from '../config';
import { SPACE } from '../lib/constants';
import {printError, printInfo} from '../lib/printer';
import {killProcess, spawnProcess} from '../lib/utils/process';

const NPM = 'npm';
export const BEFORE = 'before';
export const AFTER = 'after';

class TaskRunner {

    constructor() {
        this.tasks = {};
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

    start(name, command) {
        return new Promise((resolve, reject) => {
            try {
                const { cwd } = getConfig();
                const { cmd, args } = TaskRunner.parseCommand(command);
                printInfo(`Executing NPM command on ${cwd}, command: ${command}`);

                if (TaskRunner.isNpmCommand(cmd)) {
                    this.tasks[name] = spawnProcess(NPM, args, { cwd });
                } else {
                    this.tasks[name] = spawnProcess(cmd, args, { cwd });
                }
                resolve(name);
            } catch(e) {
                reject(e);
            }
        });

    }

    stop(taskId) {
        return new Promise((resolve, reject) => {
            const childProcess = this.tasks[taskId];
            try {
                if (childProcess) {
                    killProcess(childProcess);
                } else {
                    printInfo(`The required task ${taskId} does not exist.`);
                }
                resolve();
            } catch(e) {
                reject(e);
            }
        });
    }

    stopAll() {
        return Promise
            .all(Object.keys(this.tasks).map(t => this.stop(t)));
    }
}

export default new TaskRunner();
