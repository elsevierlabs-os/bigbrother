import glob from 'glob';
import fs from 'fs';
import safeEval from 'safe-eval';

import { PATTERN_DOESNT_MATCH_ERROR } from './constants';
import TestSuite from './tests/TestSuite';
import Browser from './Browser';

class Runner {

    constructor(pattern) {
        this.pattern = pattern;
        this.browser = null;
        this.suites = [];
    }

    readFile = (filename) => {
        const content = fs.readFileSync(filename, 'utf8');

        return { filename, content };
    }

    executeTestSuites = ({ filename, content }) => {
        const suite = new TestSuite(filename, content, this.browser);
        this.suites.push(suite);

        suite.execute();
    }

    onFilesFound = (err, files = []) => {

        if (err) {
            console.log(err);
            process.exit(1);
        }

        if (!files.length) {
            console.log(PATTERN_DOESNT_MATCH_ERROR.red, this.pattern);
            process.exit(1);
        }

        files
            .map(this.readFile)
            .map(this.executeTestSuites);
    }

    start() {
        this.browser = new Browser({ headless: true });
        this.browser
            .launch()
            .then(() => glob(this.pattern, {}, this.onFilesFound));
    }
}

export default Runner;