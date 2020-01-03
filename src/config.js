const DEFAULT_CONFIGURATION = {
    headless: true,
    cacheEnabled: false,
    recordingsPath: './.recordings',
    threshold: 0.5
};

let config = DEFAULT_CONFIGURATION;

const storeConfiguration = (configuration) => {
    config = configuration;
};

export const getConfig = () => config;

export default {
    DEFAULT_CONFIGURATION,
    storeConfiguration
};
