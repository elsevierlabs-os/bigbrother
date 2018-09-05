const esprima = require('esprima');
const escodegen = require('escodegen');
const constants = require('./constants');
const P = require('./performance');
const safeEval = require('safe-eval');

class Parser {

    constructor(scenarioName, scenario) {
        this.ALLOWED_TYPES = ['AwaitExpression'];
        this.locations = {};

        this.name = scenarioName;
        this.scenario = scenario;
    }

    getNodeParser(name) {
        return function(node, meta) {
            const generated = escodegen.generate(node);
            if (this.ALLOWED_TYPES.includes(node.type)) {
                let functionName = `${name}_${node.argument.callee.property.name}`;
                let index = 1;
                while (this.locations[functionName]) {
                    if (!this.locations[functionName + index]) {
                        functionName += index;
                        break;
                    }
                    index++;
                }
                this.locations[functionName] = { start: meta.start.offset, end: meta.end.offset };
            }
        }
    }

    getParsedScenarioCode() {
        const locationsKeys = Object.keys(this.locations);
        if (!locationsKeys.length) return this.scenario;

        let content = [this.scenario.substring(0, this.locations[locationsKeys[0]].start)];

        locationsKeys.forEach((key) => {
            const s = this.scenario.substring(this.locations[key].start, this.locations[key].end);

            content.push(
                P.getStart(key)
                .concat(s)
                .concat('\n')
                .concat(P.getEnd(key))
            );
        });

        content.push(this.scenario.substring(this.locations[locationsKeys[locationsKeys.length-1]].end, this.scenario.length));

        return content.join('');
    }

    extractLocations() {
        esprima.parse(this.scenario, constants.ESPRIMA_OPTIONS, this.getNodeParser(this.name).bind(this));
    }

    evaluateScenario() {
        return safeEval(this.getParsedScenarioCode(), { _performance: global._performance });
    }
}

module.exports = Parser;
