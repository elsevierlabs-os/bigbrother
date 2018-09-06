const vivify = require('./vivify');
const fs = require('fs');

class Performance {

    constructor() {
        this.timeline = {};
        this.entries = [];

        // storing navigation info from page
        this.navigation = {};

        this.recording = null;
        this.recordingFolder = '.recordings';
    }

    startRecording(scenario) {
        this.recording = scenario;
        fs.existsSync(this.recordingFolder) || fs.mkdirSync(this.recordingFolder);
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

    _storeRecording() {
        const json = JSON.stringify(this.timeline[this.recording]);
        fs.writeFile(`${this.recordingFolder}/${this.recording}.json`, json, 'utf8', function(err) {
            if (err) {
                console.log('[ERR] error occurred while storing recording'.red, err);
            }
        });
    }

    _readRecording(name) {
        const content = {};
        const key = name.split('.json')[0];
        content[key] = JSON.parse(fs.readFileSync(`${this.recordingFolder}/${name}`, 'utf8'))

        return content;
    }


    _readAndSquashRecordings() {
        const content = fs.readdirSync(this.recordingFolder);
        const jsons = content.map(this._readRecording.bind(this));
        let recordings = {};

        jsons.forEach(function(json) {
            Object.assign(recordings, json);
        });

        this.recordings = recordings;

    }

    _printNode(depth, _duration, name, fullkey) {
        const newLines = (depth < 3 ) ? '\n' : '';
        const toPrint = newLines
            .concat(Array(depth)
            .join('\t'))
            .concat('* ')
            .concat(name);
        let comparison = 100000;
        const duration = _duration.toString().concat(' ms');

        if (this.recordings && Object.keys(this.recordings).length) {
            comparison = vivify.get(`${fullkey}.duration`, this.recordings);
        }

        if (!comparison || _duration <= (comparison * 1.40)) {
            if (depth === 1) {
                console.log(`${toPrint}`.underline, '√'.green, duration.green);
            } else {
                console.log(`${toPrint}`.grey, '√'.green, duration.green)
            }
        } else {
            const expected = comparison.toString().concat(' ms');
            if (depth === 1) {
                console.log(`${toPrint}`.underline, 'x'.red, duration.red, expected.yellow);
            } else {
                console.log(`${toPrint}`.red, 'x'.red, duration.red, expected.yellow)
            }
        }

        if (depth == 2) {
            this._printNavigation(vivify.get(fullkey, this.navigation));
        }
    }

    _printNavigation(data) {
        console.log('\t\t', Array(50).join('-').green);
        Object.keys(data).forEach(function(key) {
            console.log('\t\t', key.bold, data[key].toString().green);
        });
        console.log('\t\t', Array(50).join('-').green);
    }

    _explore(object, name, depth) {
        const newDepth = depth + 1;
        Object.keys(object).forEach((function(key) {
            if (typeof object[key] === 'object') {
                this._explore(object[key], key, newDepth);
            } else if (key === 'duration') {
                const fullkey = object.__key;
                const duration = object[key];
                this._printNode(newDepth, duration, name, fullkey);
            }
        }).bind(this));
    }

    print() {
        if (this.recording) {
            this._storeRecording();
        } else {
            this._readAndSquashRecordings();
        }
        this._explore(this.timeline, '', -1);

    }
}

const getStart = function(name) {
    return `;_performance.start('${name}');\n`;
};

const getEnd = function(name) {
    return `;_performance.end('${name}');\n`;
};

module.exports = {
    Performance: Performance,
    getStart: getStart,
    getEnd: getEnd
};
