#!/usr/bin/env node
const minimist = require('minimist');
require('colors');
const Runner = require('./dist').Runner;
const usageMessage = require('./usage');

const argv = minimist(process.argv.slice(2));

const pattern = argv._[0];
const help = argv.help || argv.h;
const configPath = argv.config || argv.c;

const DEFAULT_CONFIGURATION = {
    headless: true,
    cacheEnabled: false
};

const printUsage = () => console.log(usageMessage);
const handleMissingPattern = () => {
    console.log('Bigbrother requires a pattern'.red);
    printUsage();
    process.exit(1);
};
const handleDefaultConfiguration = () => {
    console.log('[i] Loading default configuration'.blue);
};

if (help) {
    printUsage();
    process.exit(1);
}

if (!pattern) {
    handleMissingPattern();
}

let config = {};
if (configPath) {
    config = require(configPath);
} else {
    handleDefaultConfiguration();
    config = DEFAULT_CONFIGURATION;
}

const envConfig = {
    headless: process.env.HEADLESS,
    cacheEnabled: process.env.CACHE_ENABLED
};

const runnerOptions = Object.assign(DEFAULT_CONFIGURATION, envConfig, config);
new Runner(pattern)
    .start(runnerOptions);
