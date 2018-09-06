measure('advanced form', (config) => {

    config.setURL('https://www.sciencedirect.com/search/advanced');
    // config.setUrl('http://www.local.sdfe.sciencedirect.com:5025/search/advanced');
    config.setNetwork(NETWORK.WIFI);
    config.setCPU({ rate: 1 });

    scenario('submit', async (page) => {
        await page.click('input[name="qs"]');
        await page.type('input[name="qs"]', 'cell');
        await page.type('input[name="authors"]', 'smit');
        await page.keyboard.sendCharacter('\n');
    });

    scenario('fill everything', async (page) => {
        await page.type('input#qs', 'cell');
        await page.type('input#authors', 'smith');
    });

    scenario('fill', async (page) => {
        await page.type('input#qs', '*');
        await page.type('input#authors', 'smith');
        await page.type('input#qs', '*');
        await page.type('input#qs', '');
        await page.type('input#qs', '*');
        await page.type('input#qs', '');
        await page.type('input#qs', '*');
        await page.type('input#qs', '');
    });

    scenario('onboarding', async (page) => {
        await page.type('input#qs', '*');
        await page.waitForSelector('label.info-message-label');
        await page.type('input#qs', '');
        await page.click('input#authors');

        await page.type('input#qs', '*');
        await page.waitForSelector('label.info-message-label');
        await page.type('input#qs', '');
        await page.click('input#authors');

        await page.type('input#qs', '*');
        await page.waitForSelector('label.info-message-label');
        await page.type('input#qs', '');
        await page.click('input#authors');

        await page.type('input#qs', '*');
        await page.waitForSelector('label.info-message-label');
        await page.type('input#qs', '');
        await page.click('input#authors');

        await page.type('input#qs', '*');
        await page.waitForSelector('label.info-message-label');
        await page.type('input#qs', '');
        await page.click('input#authors');

        await page.type('input#qs', '*');
        await page.waitForSelector('label.info-message-label');
        await page.type('input#qs', '');
        await page.click('input#authors');

        await page.type('input#qs', '*');
        await page.waitForSelector('label.info-message-label');
        await page.type('input#qs', '');
        await page.click('input#authors');


    });
});
