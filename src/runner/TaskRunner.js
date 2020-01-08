import { getConfig } from '../config';
import { SPACE } from '../lib/constants';
import {printError, printInfo} from '../lib/printer';
import {killProcess, spawnProcess} from '../lib/utils/process';

const NPM = 'npm';
export const PRECOMMAND = 'precommand';
export const POSTCOMMAND = 'postcommand';

class TaskRunner {

    constructor() {
        this.tasks = {};
    }

    static isNpmCommand(command) {
        return command.split(SPACE)[0] === NPM;
    }

    static getCommandArguments(command) {
        const split = command.split(SPACE);
        return split.slice(1, split.length);
    }

    executePreCommand() {
        const { precommand } = getConfig();
        if (precommand) {
            printInfo('Executing PRECOMMAND');
            return this.start(PRECOMMAND, precommand);
        }

        return Promise.resolve();
    }

    executePostCommand() {
        const { postcommand } = getConfig();
        if (postcommand) {
            printInfo('Executing POSTCOMMAND');
            return this.start(POSTCOMMAND, postcommand);
        }

        return Promise.resolve();
    }

    start(name, command) {
        return new Promise((resolve, reject) => {
            try {
                if (TaskRunner.isNpmCommand(command)) {
                    const { cwd } = getConfig();
                    const args = TaskRunner.getCommandArguments(command);
                    printInfo(`Executing NPM command on ${cwd}, command: ${command}`);
                    this.tasks[name] = spawnProcess(NPM, args, { cwd });
                    resolve(name);
                }
                resolve();
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
                    resolve();
                } else {
                    printError(`The required task ${taskId} does not exist.`);
                    reject();
                }
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
