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
const safeEval = require('safe-eval');
const logger = require('./logger');

global.NETWORK = constants.NETWORK;
global.CPU = constants.CPU;
global.performance = new P.Performance();

let scenarios = {};

global.scenario = function(name, scenarioCallback) {
    scenarios[name] = scenarioCallback;
}

global.measure = async function(rootName, measureCallback) {
    const config = new Config();

    measureCallback(config);
    performance.start(rootName);

    return new Promise(function(resolve, reject) {
        Promise.all(Object.keys(scenarios).map(async function(scenarioName) {
            const chromelauncher = new ChromeLauncher(config);
            const scenario = scenarios[scenarioName].toString();
            const parser = new Parser(rootName, scenarioName, scenario);

            await chromelauncher.launch();

            const scenarioTimelineKey = `${rootName}.${scenarioName}`;
            performance.start(scenarioTimelineKey);
            await parser.evaluateScenario()(chromelauncher.page);
            performance.end(scenarioTimelineKey);

            const navigation = await chromelauncher.getNavigationInfo();
            const key = `${rootName}.${scenarioName}`;
            performance.setNavigationInfo(key, navigation);

            await chromelauncher.close();
        }))
        .then(function() {
            performance.end(rootName);
            resolve();
        })
        .catch(function(err) {
            reject(err);
        })
    });
}

global.measure.record = async function(rootName, measureCallback) {
    performance.startRecording(rootName);

    await measure(rootName, measureCallback);
}

const pattern = process.argv[2];
console.log(pattern);

glob(pattern, {}, function(err, files) {

    if (err) {
        logger.usage();
        logger.error('ERROR - something went wrong reading your pattern.');
        process.exit(1);
    }

    if (files.length === 0) {
        logger.usage();
        logger.error('ERROR - 0 files found.');
        process.exit(1);
    }

    Promise.all(files.map(function(filename) {
        const content = fs.readFileSync(filename, 'utf8');

        return safeEval(content, {
            measure: global.measure,
            scenario: global.scenario,
            performance: global.performance,
            NETWORK: global.NETWORK,
            CPU: global.CPU
        });
    }))
    .then(function() {
        logger.info('Measurements done!');
        performance.print();
    })
    .catch(function(err) {
        logger.error('ERROR - Something went really bad');
    });
});
