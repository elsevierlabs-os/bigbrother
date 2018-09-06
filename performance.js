const vivify = require('./vivify');

class Performance {

    constructor() {
        this.timeline = {};
        this.entries = [];
    }

    start(name, option) {

        vivify.set(name, {
            start: Number(new Date()),
            end: null,
            duration: 0
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

    _printNode(depth, _duration, name) {
        const newLines = (depth < 3 ) ? '\n' : '';
        const toPrint = newLines
            .concat(Array(depth)
            .join('\t'))
            .concat('* ')
            .concat(name);
        const duration = _duration.concat(' ms');

        if (depth === 1) {
            console.log(`${toPrint}`.underline, '√'.green, duration.green);
        } else {
            console.log(`${toPrint}`.blue, '√'.green, duration.green)
        }
    }

    _explore(object, name, depth) {
        const newDepth = depth + 1;
        Object.keys(object).forEach((function(key) {
            if (typeof object[key] === 'object') {
                this._explore(object[key], key, newDepth);
            } else if (key === 'duration') {
                const duration = object[key].toString();
                this._printNode(newDepth, duration, name);
            }
        }).bind(this));
    }

    print() {
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
