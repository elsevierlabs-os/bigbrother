const config = {
    cacheEnabled: false,
    headless: true,
    // options below are not being used
    pattern: '**/*.perf.js',
    output: './data',
    ignore: [
        'file.perf.js',
        'somethingelse.js'
    ],
    loader: 'we are fancy and we use babel',
    verbose: false
};

module.exports = config;
