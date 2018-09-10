const puppeteer = require('puppeteer');
const constants = require('./constants');
const logger = require('./logger');

class ChromeLauncher {

    constructor(config) {
        this.browser = null;
        this.page = null;
        this.config = config;

        this.NETWORK_CONDITIONS_MESSAGE = 'Network.emulateNetworkConditions';
        this.CPU_CONDITIONS_MESSAGE = 'Emulation.setCPUThrottlingRate';
    }

    setNetworkConditions(client) {
        if (client) {
            logger.info('Setting network conditions.');
            return client.send(this.NETWORK_CONDITIONS_MESSAGE, this.config.network);
        }
    }

    setCpuConditions(client) {
        if (client) {
            logger.info('Setting cpu conditions.');
            return client.send(this.CPU_CONDITIONS_MESSAGE, this.config.cpu);
        }
    }

    setConditions(client) {
        this.setNetworkConditions(client);
        this.setCpuConditions(client);
    }

    async getNavigationInfo() {
        logger.info('Retrieving navigation info.');
        if (this.page) {
            const navigation = await this.page.evaluate(function() {
               return performance.getEntriesByType('navigation')[0].toJSON();
            });

            return navigation;
        }
        return {};
    }

    async onTargetChanged(target) {
        const page = await target.page();

        if (page && page.target().url() === this.config.url) {
            await page.target()
                .createCDPSession()
                .then(this.setConditions.bind(this))
                .catch(err => console.error(err));
        }
    }

    async launch() {
        logger.info('Launching puppeteer instance.');
        this.browser = await puppeteer.launch(constants.PUPPETEER);
        this.browser.on('targetchanged', this.onTargetChanged.bind(this));

        this.page = await this.browser.newPage();
        await this.page.setCacheEnabled(false);
        await this.page.goto(this.config.url);
    }

    async close() {
        logger.info('Closing puppeteer.');
        if (this.browser) {
            this.browser.close();
            this.browser = null;
            this.page = null;
        }
    }
}


module.exports = ChromeLauncher;
