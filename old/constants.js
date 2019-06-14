const NETWORK = {
    WIFI: {
        offline: false,
        latency: 28,
        downloadThroughput: 5000000,
        uploadThroughput: 1000000
    },
    DSL: {
        offline: false,
        latency: 50,
        downloadThroughput: 1500000,
        uploadThroughput: 384000
    },
    SLOW3G: {
        offline: false,
        latency: 400,
        downloadThroughput: 400000,
        uploadThroughput: 400000
    },
    REG3G: {
        offline: false,
        latency: 300,
        downloadThroughput: 1600000,
        uploadThroughput: 768000
    },
    FAST3G: {
        offline: false,
        latency: 170,
        downloadThroughput: 1600000,
        uploadThroughput: 768000
    },
    REG4G: {
        offline: false,
        latency: 150,
        downloadThroughput: 9000000,
        uploadThroughput: 9000000
    },
    LTE: {
        offline: false,
        latency: 70,
        downloadThroughput: 12000000,
        uploadThroughput: 12000000
    },
    EDGE: {
        offline: false,
        latency: 840,
        downloadThroughput: 240000,
        uploadThroughput: 240000
    },
    REG2G: {
        offline: false,
        latency: 800,
        downloadThroughput: 280000,
        uploadThroughput: 256000
    },
    OFFLINE: {
        offline: false,
        latency: 10000,
        downloadThroughput: 0,
        uploadThroughput: 0
    }
}

const CPU = {
    DEFAULT: {
        rate: 1
    },
    SLOW_2: {
        rate: 2
    },
    SLOW_3: {
        rate: 3
    },
    SLOW_4: {
        rate: 4
    },
    SLOW_5: {
        rate: 5
    },
    SLOW_6: {
        rate: 6
    },
    SLOW_7: {
        rate: 7
    },
    SLOW_8: {
        rate: 8
    },
    SLOW_9: {
        rate: 9
    },
    SLOW_10: {
        rate: 10
    }
}

const ESPRIMA_OPTIONS = {
    range: true,
    loc: true,
    tokens: true,
    jsx: true
};

const PUPPETEER = {
    headless: true
}

module.exports = {
    NETWORK: NETWORK,
    CPU: CPU,
    ESPRIMA_OPTIONS: ESPRIMA_OPTIONS,
    PUPPETEER: PUPPETEER
};
