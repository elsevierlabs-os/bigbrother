const esprima = require('esprima');
const escodegen = require('escodegen');
const childprocess = require('child_process');
const constants = require('./constants');
const ChromeLauncher = require('./chromelauncher');
const P = require('./performance');
const Config = require('./config');
const Parser = require('./parser');
const colors = require('colors');
const fs = require('fs');

global.NETWORK = constants.NETWORK;
global._performance = new P.Performance();

// this should be cleared at the end of every stuff
let scenarios = {};
let measurements = {};

global.scenario = function(name, scenarioCallback) {
    scenarios[name] = scenarioCallback;
}

global.scenario.record = function(name, scenarioCallback) {

}

global.measure = async function(name, measureCallback) {
    const config = new Config();

    measureCallback(config);
    _performance.start(name, {root: true});

    Promise.all(Object.keys(scenarios).map(async function(scenarioName) {
        const chromelauncher = new ChromeLauncher(config);
        const scenario = scenarios[scenarioName].toString();
        const parser = new Parser(scenarioName, scenario);

        await chromelauncher.launch();

        parser.extractLocations();
        const parsedScenario = parser.evaluateScenario();

        _performance.start(scenarioName, {parent: true});
        await parsedScenario(chromelauncher.page);
        _performance.end(scenarioName);

        // getting navigation performance
        _performance.navigation = await chromelauncher.page.evaluate(function() {
            return performance.getEntriesByType('navigation')[0].toJSON();
        });

        console.table(_performance.navigation);
        await chromelauncher.close();
    }))
    .then(async function() {
        _performance.end(name);
        _performance.print();
    })
}

const filename = process.argv[2];
const content = fs.readFileSync(filename, 'utf8');

eval(content);


// get pattern of files **.perf.js
// for each file
