const NETWORK = require('../../dist').NETWORK;
const USER_AGENTS = require('../../dist').USER_AGENTS;

describe('example', function() {

    it('should do something meaningful', async page => {
        await page.load('/search');

        const time = await page.click('input[type="text"]');

        expect(time).toBeLessThan(50);
    });

    it('should take less than 10s to load search/advanced', async (page) => {
        const loadTime = await page.load('/search/advanced');

        expect(loadTime).toBeLessThan(10000);
    });

    describe('slow connection', () => {

        it('should load sciencedirect in less than 15s with SLOW_3G', async (page) => {
            await page.setNetworkSpeed(NETWORK.SLOW3G);
            const loadTime = await page.load('/');

            expect(loadTime).toBeLessThan(15000);
            expect(page).toMatchRecording();
        });
    });

    describe('different user agent', () => {

        it('should be able to set User Agent', async (page) => {
            await page.setUserAgent(USER_AGENTS.DESKTOP.WIN_10_EDGE);

            await page.load('/');
            await page.click('#volume-searchbox-input');
            await page.click('.advanced-search-link');

            expect(page).toMatchRecording();
        });
    });
});
