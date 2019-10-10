#!/usr/bin/env node
const minimist = require('minimist');
const path = require('path');
require('colors');
const Runner = require('./dist').Runner;
const usageMessage = require('./usage');

const argv = minimist(process.argv.slice(2));

const pattern = argv._[0];
const verboseMode = argv.verbose || argv.v;
const help = argv.help || argv.h;
const configPath = argv.config || argv.c;

const printUsage = () => {
    console.log(usageMessage);
};

if (help) {
    // print usage then return
    printUsage();
    process.exit(1);
}

if (!pattern) {
    console.log('Bigbrother requires a pattern'.red);
    printUsage();
    process.exit(1);
}

let config = {};
if (configPath) {
    config = require(configPath);
} else {
    console.log('\n\n');
    console.log('[i] Loading default configuration'.blue);
    console.log('\n\n');
}

const headless = process.env.HEADLESS === 'true' || config.headless || true;
const cacheEnabled = process.env.CACHE_ENABLED === 'true' ||  config.cacheEnabled || false;

const runnerOptions = {
    verboseMode: verboseMode,
    headless: headless,
    cacheEnabled: cacheEnabled
};

new Runner(pattern).start(runnerOptions);
