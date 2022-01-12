import { printInfo } from './lib/printer';

export const DEFAULT_CONFIGURATION = {
    baseUrl: 'https://www.sciencedirect.com',
    maxRetries: 10,
    retryTimeout: 1500,
    headless: true,
    cacheEnabled: false,
    recordingsPath: '.recordings',
    reportPath: '.report',
    openReport: false,
    cwd: './',
    threshold: 0.5,
    puppeteerArgs: [],
    before: false,
    main: false,
    after: false,
    verbose: false
};

let config = DEFAULT_CONFIGURATION;

export const storeConfiguration = configuration => {
    config = {
        ...DEFAULT_CONFIGURATION,
        ...configuration
    };
    printInfo('current configuration:', config);
};

export const getConfig = () => config;
