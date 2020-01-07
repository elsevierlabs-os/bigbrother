import { getConfig } from '../config';
import { spawn } from 'child_process';
import { SPACE } from '../lib/constants';
import { printInfo} from '../lib/printer';
import { killProcess } from '../lib/utils/process';

const NPM = 'npm';
const PRECOMMAND = 'precommand';
const POSTCOMMAND = 'postcommand';

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
                    this.tasks[name] = spawn(NPM, args, { cwd });
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
            const { pid } = this.tasks[taskId];
            try {
                printInfo(`About to terminate process ${pid}`);
                killProcess(pid);
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
