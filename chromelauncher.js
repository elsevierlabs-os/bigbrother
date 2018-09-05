const puppeteer = require('puppeteer');
const constants = require('./constants');

class ChromeLauncher {

    constructor(config) {
        this.browser = null;
        this.page = null;
        this.config = config;

        this.NETWORK_CONDITIONS_MESSAGE = 'Network.emulateNetworkConditions';
        this.CPU_CONDITIONS_MESSAGE = '';
    }

    setNetworkConditions(client) {
        if (client) {
            return client.send(this.NETWORK_CONDITIONS_MESSAGE, this.config.network);
        }
    }

    async onTargetChanged(target) {
        const page = await target.page();

        if (page && page.target().url() === this.config.url) {
            await page.target()
                .createCDPSession()
                .then(this.setNetworkConditions.bind(this))
                .catch(err => console.error(err));
        }
    }

    async launch() {
        this.browser = await puppeteer.launch(constants.PUPPETEER);
        this.browser.on('targetchanged', this.onTargetChanged.bind(this));

        this.page = await this.browser.newPage();
        await this.page.goto(this.config.url);
    }

    async close() {
        if (this.browser) {
            this.browser.close();
            this.browser = null;
            this.page = null;
        }
    }
}


module.exports = ChromeLauncher;
