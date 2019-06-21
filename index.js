#!/usr/bin/env node
const minimist = require('minimist');
const colors = require('colors');
const Runner = require('./bigbrother').Runner;
const ora = require('ora');

const argv = minimist(process.argv.slice(2));

const pattern = argv._[0];
const verboseMode = argv.verbose || argv.v;
const help = argv.help || argv.h;

if (help) {
    // print usage then return
    process.exit(1);
}

if (!pattern) {
    console.log('Bigbrother requires a pattern'.red);
    process.exit(1);
}

const headless = process.env.HEADLESS === 'true';
const runnerOptions = {
    verboseMode: verboseMode,
    headless: headless
};

new Runner(pattern).start(runnerOptions);