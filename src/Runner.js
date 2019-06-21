import glob from 'glob';
import fs from 'fs';
import 'colors';
import { PATTERN_DOESNT_MATCH_ERROR } from './constants';
import TestSuite from './tests/TestSuite';
import Browser from './Browser';
import performanceAnalyzer from './PerformanceAnalyzer';

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

    executeTestSuites = (tests = []) => {
        this.suites = tests.map(({ filename, content}) => (
            new TestSuite(filename, content, this.browser)
        ));

        Promise
            .all(this.suites.map(s => s.execute()))
            .then(this.evaluateResults);
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

        const tests = files.map(this.readFile);

        this.executeTestSuites(tests);
    }

    evaluateResults = (suites) => {
        const message = `Done running ${suites.length} suites`.green;
        console.log(message);

        console.log(performanceAnalyzer.toJSON());

        this.stop();
    }

    start({ headless = true }) {
        this.browser = new Browser({ headless });
        this.browser
            .launch()
            .then(() => glob(this.pattern, {}, this.onFilesFound));
    }

    stop() {
        this.browser
            .close()
            .then(() => process.exit(0));
    }
}

export default Runner;