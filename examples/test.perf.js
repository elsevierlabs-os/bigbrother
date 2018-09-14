measure('sciencedirect', function(config) {

    config.setURL('https://www.sciencedirect.com/search/advanced');
    config.setNetwork(NETWORK.WIFI);
    config.setCPU(CPU.DEFAULT);

    scenario('form', async (page) => {
        await page.type('input#qs', 'marco');

        await page.type('input#authors', 'marco');

        await page.type('input#date', '1990');

    });
});
