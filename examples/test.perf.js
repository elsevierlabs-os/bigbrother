const NETWORK = require('../../dist').NETWORK;
const USER_AGENTS = require('../../dist').USER_AGENTS;

describe('sciencedirect', function() {

    it('should do something meaningful', async page => {
        await page.load('http://www.google.com');

        const time = await page.click('input[type="text"]');

        expect(time).toBeLessThan(50);
    });

    it('should take less than 10s to load search/advanced', async (page) => {
        const loadTime = await page.load('http://www.sciencedirect.com/search/advanced');

        expect(loadTime).toBeLessThan(10000);
    });

    describe('slow connection', () => {

        it('should load sciencedirect in less than 15s with SLOW_3G', async (page) => {
            await page.setNetworkSpeed(NETWORK.SLOW3G);
            const loadTime = await page.load('http://www.sciencedirect.com');

            expect(loadTime).toBeLessThan(15000);
        });
    });

    describe('different user agent', () => {

        it('should be able to set User Agent', async (page) => {
            await page.setUserAgent(USER_AGENTS.DESKTOP.WIN_10_EDGE);
            const loadTime = await page.load('http://www.sciencedirect.com');

            expect(loadTime).toBeLessThan(4000);
        });
    })
});
