const constants = require('./constants');

class Config {

    constructor() {
        this.url = 'http://sciencedirect.com/search/advanced';
        this.network = constants.NETWORK.WIFI;
        this.cpu = constants.CPU.DEFAULT;
    }

    setURL(newUrl) {
        if (newUrl && typeof newUrl === 'string') {
            this.url = newUrl;
        }
    }

    setNetwork(config) {
        if (config && typeof config  === 'object') {
            this.network = config;
        }
    }

    setCPU(config) {
        if (config && typeof config === 'object') {
            this.cpu = config;
        }
    }
}

module.exports = Config;
