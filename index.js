#!/usr/bin/env node
const minimist = require('minimist');
const path = require('path');
require('colors');
const {
    Runner,
    getEnvFlag,
    printError,
    exitProcess,
    getProcessCWD,
    print,
    printException,
    printNewLines,
    printInfo,
    config,
    ENV_FLAGS
} = require('./dist');

const usageMessage = require('./usage');
const { DEFAULT_CONFIGURATION } = config;

// printing a couple empty lines to give BigBrother some space
printNewLines(2);

const readArguments = () => {
    const argv = minimist(process.argv.slice(2));

    return {
        pattern: argv._[0],
        help: argv.help || argv.h,
        configPath: argv.config || argv.c
    };
};

const handleDefaultConfiguration = () => printInfo('Loading default configuration.');

const handleUsageHelp = () => {
    print(usageMessage);
    exitProcess(1);
};

const handleMissingPattern = () => {
    printError('BigBrother requires a pattern. Please check usage for more info.');
    handleUsageHelp();
};

const loadConfigFile = (cwd, configPath) => {
    let config = DEFAULT_CONFIGURATION;

    try {
        if (configPath) {
            const requirePath = path.join(cwd, configPath);
            config = require(requirePath);
        } else {
            handleDefaultConfiguration();
        }
    } catch(e) {
        printException(e);
        handleDefaultConfiguration();
    }

    return config;
};

const loadEnvConfig = () => ({
    headless: getEnvFlag(ENV_FLAGS.HEADLESS),
    cacheEnabled: getEnvFlag(ENV_FLAGS.CACHE_ENABLED)
});

const cwd = getProcessCWD();
const getModuleConfig = () => ({
    cwd
});

const { pattern, help, configPath } = readArguments();

if (help) handleUsageHelp();
if (!pattern) handleMissingPattern();

const runnerConfig = Object.assign(
    DEFAULT_CONFIGURATION,
    getModuleConfig(),
    loadEnvConfig(),
    loadConfigFile(cwd, configPath));

new Runner(pattern)
    .start(runnerConfig);
