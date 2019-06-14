#!/usr/bin/env node

const constants = require('./constants');
const P = require('./performance');
const Config = require('./config');
const colors = require('colors');
const glob = require('glob');
const yargs = require('yargs')
const logger = require('./logger');
const bigbrother = require('./bigbrother');

const SCENARIO_ERROR = 'Something went wrong evaluating a scenario: ';

global.NETWORK = constants.NETWORK;
global.CPU = constants.CPU;
global.performance = new P.Performance();

global.scenario = function(name, scenarioCallback) {
    bigbrother.storeScenario(name, scenarioCallback);
}

global.measure = async function(rootName, measureCallback) {
    const config = new Config();

    measureCallback(config);
    performance.start(rootName);

    return new Promise(function(resolve, reject) {
        bigbrother.evaluateScenarios(config, rootName)
            .then(function() {
                performance.end(rootName);
                resolve();
            })
            .catch(function(err) {
                logger.error(SCENARIO_ERROR);
                logger.debug(err);
                reject(err);
            })
    });
}

global.measure.record = async function(rootName, measureCallback) {
    performance.startRecording(rootName);

    await measure(rootName, measureCallback);
}

var argv = require('yargs').argv;

if (!argv.p || argv.h) {
    logger.usage();
    process.exit(0);
}

logger.setVerboseMode(argv.v);

glob(argv.p, {}, bigbrother.start.bind(bigbrother));
