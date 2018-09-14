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
        this.NAVIGATION_INFO_TYPE = 'navigation';
        this.PAINT_INFO_TYPE = 'paint';
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

    async getInfo(type) {
        logger.info(`Retrieving ${type} info`);
        if (this.page) {
            const info = await this.page.evaluate(function(type) {
                let entries = performance.getEntriesByType(type);
                if (entries.length == 1) {
                    return entries[0].toJSON();
                } else {
                    return [entries[0].toJSON(), entries[1].toJSON()];
                }
            }, type);

            return info;
        }
        return [];
    }

    async getNavigationInfo() {
        return await this.getInfo(this.NAVIGATION_INFO_TYPE);
    }

    async getPaintInfo() {
        return await this.getInfo(this.PAINT_INFO_TYPE);
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
        const options = Object.assign(constants.PUPPETEER, { headless: this.config.headless })
        this.browser = await puppeteer.launch(options);
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
