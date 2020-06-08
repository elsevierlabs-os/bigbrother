import { printInfo } from './lib/printer';

export const DEFAULT_CONFIGURATION = {
    baseUrl: 'https://www.sciencedirect.com',
    maxRetries: 10,
    retryTimeout: 1500,
    headless: true,
    cacheEnabled: false,
    recordingsPath: './.recordings',
    reportPath: './.report',
    cwd: './',
    threshold: 0.5
};

let config = DEFAULT_CONFIGURATION;

export const storeConfiguration = (configuration) => {
    config = configuration;
    printInfo('current configuration:', configuration);
};

export const getConfig = () => config;
