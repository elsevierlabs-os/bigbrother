class Config {

    constructor() {
        this.url = 'http://sciencedirect.com/search/advanced';
        this.network = NETWORK.WIFI;
        this.cpu = {};
    }

    setUrl(newUrl) {
        if (newUrl && typeof newUrl === 'string') {
            this.url = newUrl;
        }
    }

    setNetwork(config) {
        if (config && typeof config  === 'object') {
            this.network = config;
        }
    }

    setCpu(config) {
        if (config && typeof config === 'object') {
            this.cpu = config;
        }
    }
}

module.exports = Config;
