const config = {
    baseUrl: 'https://www.sciencedirect.com/',
    cacheEnabled: false,
    headless: true,
    threshold: 0.3,
    recordingsPath: '.recordings',
    openReport: true,
    ignore: [],
    verbose: true,
    pattern: '**/*.perf.js',
    puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox']
};

module.exports = config;
