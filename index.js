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
    DEFAULT_CONFIGURATION,
    ENV_FLAGS
} = require('./dist');

const usageMessage = require('./usage');

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

const args = readArguments();
const { help, configPath } = args;

if (help) handleUsageHelp();

const runnerConfig = Object.assign(
    DEFAULT_CONFIGURATION,
    getModuleConfig(),
    loadEnvConfig(),
    args,
    loadConfigFile(cwd, configPath));

new Runner()
    .start(runnerConfig);
