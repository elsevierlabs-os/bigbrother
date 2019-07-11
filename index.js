#!/usr/bin/env node
const minimist = require('minimist');
require('colors');
const Runner = require('./bigbrother').Runner;

const argv = minimist(process.argv.slice(2));

const pattern = argv._[0];
const verboseMode = argv.verbose || argv.v;
const help = argv.help || argv.h;
const configPath = argv.config || argv.c;

let config = {};
if (configPath) {
    config = require(configPath);
}

if (help) {
    // print usage then return
    process.exit(1);
}

if (!pattern) {
    console.log('Bigbrother requires a pattern'.red);
    process.exit(1);
}

const headless = process.env.HEADLESS === 'true' || config.headless || true;
const cacheEnabled = process.env.CACHE_ENABLED === 'true' ||  config.cacheEnabled || false;

const runnerOptions = {
    verboseMode: verboseMode,
    headless: headless,
    cacheEnabled: cacheEnabled
};

new Runner(pattern).start(runnerOptions);