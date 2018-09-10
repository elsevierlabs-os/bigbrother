const constants = require('./constants');
const P = require('./performance');
const Config = require('./config');
const colors = require('colors');
const fs = require('fs');
const glob = require('glob');
const yargs = require('yargs')
const safeEval = require('safe-eval');
const logger = require('./logger');
const arbiter = require('./arbiter');

global.NETWORK = constants.NETWORK;
global.CPU = constants.CPU;
global.performance = new P.Performance();

global.scenario = function(name, scenarioCallback) {
    arbiter.storeScenario(name, scenarioCallback);
}

global.measure = async function(rootName, measureCallback) {
    const config = new Config();

    measureCallback(config);
    performance.start(rootName);

    return new Promise(function(resolve, reject) {
        arbiter.evaluateScenarios(config, rootName)
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

var argv = require('yargs')
    .demandOption(['p'])
    .argv;

glob(argv.p, {}, function(err, files) {

    if (err) {
        logger.usage();
        logger.error('Something went wrong reading your pattern.');
        logger.debug(err);
        process.exit(1);
    }

    if (files.length === 0) {
        logger.usage();
        logger.error('0 files found.');
        process.exit(1);
    }

    logger.setVerboseMode(argv.v);

    logger.info('Starting measurements.');

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
        const CODE = arbiter.evaluateResults();

        process.exit(CODE);
    })
    .catch(function(err) {
        logger.error('Something went really bad');
        logger.debug(err);
        process.exit(1);
    });
});
