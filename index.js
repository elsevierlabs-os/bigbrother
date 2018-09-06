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
const glob = require('glob');

global.NETWORK = constants.NETWORK;
global.CPU = constants.CPU;
global._performance = new P.Performance();

let scenarios = {};
let measurements = {};

global.scenario = function(name, scenarioCallback) {
    scenarios[name] = scenarioCallback;
}

global.measure = async function(rootName, measureCallback) {
    const config = new Config();

    measureCallback(config);
    _performance.start(rootName);

    Promise.all(Object.keys(scenarios).map(async function(scenarioName) {
        const chromelauncher = new ChromeLauncher(config);
        const scenario = scenarios[scenarioName].toString();
        const parser = new Parser(rootName, scenarioName, scenario);

        await chromelauncher.launch();

        parser.extractLocations();
        const parsedScenario = parser.evaluateScenario();

        const scenarioTimelineKey = `${rootName}.${scenarioName}`;
        _performance.start(scenarioTimelineKey);
        await parsedScenario(chromelauncher.page);
        _performance.end(scenarioTimelineKey);

        const navigation = await chromelauncher.getNavigationInfo();
        const key = `${rootName}.${scenarioName}`;
        _performance.setNavigationInfo(key, navigation);

        await chromelauncher.close();
    }))
    .then(async function() {
        _performance.end(rootName);
        _performance.print();
    })
}

global.measure.record = async function(rootName, measureCallback) {
    _performance.startRecording(rootName);

    await measure(rootName, measureCallback);
}

const filename = process.argv[2];
const content = fs.readFileSync(filename, 'utf8');

eval(content);


// get pattern of files **.perf.js
// for each file
