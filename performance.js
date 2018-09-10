const vivify = require('./vivify');
const logger = require('./logger');
const fs = require('fs');

class Performance {

    constructor() {
        this.timeline = {};
        this.entries = [];

        // storing navigation info from page
        this.navigation = {};

        this.recordings = [];
        this.squashedRecordings = {};
        this.recordingFolder = '.recordings';

        // storing failures
        this.failures = 0;
    }

    startRecording(scenario) {
        if (!this.recordings.includes(scenario)) {
            this.recordings.push(scenario);
        }

        this.recordingsFolderExists() || fs.mkdirSync(this.recordingFolder);
    }

    setNavigationInfo(name, data) {
        const toStore = {
            domInteractive: data.domInteractive + ' ms',
            domComplete: data.domComplete + ' ms',
            redirectCount: data.redirectCount,
            transferSize: (data.transferSize / 1024) + ' kb',
            encodedBodySize: (data.encodedBodySize / 1024) + ' kb',
            decodedBodySize: (data.decodedBodySize / 1024) + ' kb',
            location: data.name,
        }

        vivify.set(name, toStore, this.navigation);
    }

    start(name, option) {

        vivify.set(name, {
            start: Number(new Date()),
            end: null,
            duration: 0,
            __key: name
        }, this.timeline);

        this.entries.push(name);
    }

    end(name) {
        let entry = vivify.get(name, this.timeline);

        if (entry && entry.start) {
            entry.end = Number(new Date());
            entry.duration = entry.end - entry.start;
        }

        vivify.set(name, entry, this.timeline);
    }

    hasRecordings() {
        return this.recordings.length > 0;
    }

    storeSingleRecording(scenario) {
        const json = JSON.stringify(this.timeline[scenario]);
        logger.debug(typeof json === 'string');
        logger.debug(this.recordings);
        logger.info(`Writing on ${this.recordingFolder}/${scenario}.json`);
        fs.writeFileSync(`${this.recordingFolder}/${scenario}.json`, json, 'utf8', function(err) {
            logger.info(`Finished writing on ${this.recordingFolder}/${scenario}.txt`);
            if (err) {
                logger.error('Error occurred while storing recording' + scenario);
                logger.debug(err);
            }
        });
    }

    storeRecordings() {
        if (!this.recordings.length) {
            return;
        }
        logger.info('Storing recordings.');
        this.recordings.forEach(this.storeSingleRecording.bind(this));
    }

    readRecording(name) {
        const content = {};
        const key = name.split('.json')[0];
        const json = fs.readFileSync(`${this.recordingFolder}/${name}`, 'utf8');
        try {
            content[key] = JSON.parse(json);
        } catch (e) {
            content[key] = {};
        }

        return content;
    }

    recordingsFolderExists() {
        return fs.existsSync(this.recordingFolder);
    }

    readAndSquashRecordings() {
        if (this.recordingsFolderExists()) {
            logger.info('Reading and squashing recordings.');
            const content = fs.readdirSync(this.recordingFolder);
            const jsons = content.map(this.readRecording.bind(this));
            let recordings = {};

            jsons.forEach(function(json) {
                Object.assign(recordings, json);
            });

            this.squashedRecordings = recordings;
        }
    }

    increaseFailures() {
        this.failures ++;
    }

    printNode(depth, _duration, name, fullkey) {
        const newLines = (depth < 3 ) ? '\n' : '';
        const toPrint = newLines
            .concat(Array(depth)
            .join('\t'))
            .concat('* ')
            .concat(name);
        let comparison = 100000;
        const duration = _duration.toString().concat(' ms');

        if (this.squashedRecordings && Object.keys(this.squashedRecordings).length) {
            comparison = vivify.get(`${fullkey}.duration`, this.squashedRecordings);
        }

        if (!comparison || _duration <= (comparison * 1.40)) {
            logger.passed(depth, toPrint, duration);
        } else {
            const expected = comparison.toString().concat(' ms');
            this.increaseFailures();
            logger.failed(depth, toPrint, duration, expected);
        }

        if (depth == 2) {
            this.printNavigation(vivify.get(fullkey, this.navigation));
        }
    }

    printNavigation(data) {
        console.log('\t\t', Array(50).join('-').green);
        Object.keys(data).forEach(function(key) {
            console.log('\t\t', key.bold, data[key].toString().green);
        });
        console.log('\t\t', Array(50).join('-').green);
    }

    explore(object, name, depth) {
        const newDepth = depth + 1;
        Object.keys(object).forEach((function(key) {
            if (typeof object[key] === 'object') {
                this.explore(object[key], key, newDepth);
            } else if (key === 'duration') {
                const fullkey = object.__key;
                const duration = object[key];
                this.printNode(newDepth, duration, name, fullkey);
            }
        }).bind(this));
    }

    evaluate() {
        if (this.hasRecordings()) {
            this.storeRecordings();
        } else {
            this.readAndSquashRecordings();
        }
        this.explore(this.timeline, '', -1);

        // printing final results
        const successCount = Object.keys(this.timeline).length - this.failures + 1;

        return {
            failures: this.failures,
            success: successCount
        }
    }
}

const getStart = function(name) {
    return `;performance.start('${name}');\n`;
};

const getEnd = function(name) {
    return `;performance.end('${name}');\n`;
};

module.exports = {
    Performance: Performance,
    getStart: getStart,
    getEnd: getEnd
};
