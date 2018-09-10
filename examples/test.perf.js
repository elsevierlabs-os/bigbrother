measure('sciencedirect', function(config) {

    config.setURL('https://www.sciencedirect.com/search/advanced');
    config.setNetwork(NETWORK.SLOW3G);
    config.setCPU(CPU.DEFAULT);

    scenario('click', async (page) => {
        await page.type('input#qs', 'marco');
        await page.type('input#qs', 'marco');
    });

});
