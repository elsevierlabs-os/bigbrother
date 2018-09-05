class Performance {

    constructor() {
        this.timeline = {};
        this.root = null;
        this.parents = [];
    }

    start(name, option) {
        this.timeline[name] = {
            start: Number(new Date()),
            end: null,
            duration: 0
        }

        if (option.root) {
            this.root = name;
        }
    }

    end(name) {
        if (this.timeline[name] && this.timeline[name].start) {
            this.timeline[name].end = Number(new Date());
            this.timeline[name].duration = this.timeline[name].end - this.timeline[name].start;
        }
    }

    print() {
        console.log(this.timeline);
        console.table(this.timeline);
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
