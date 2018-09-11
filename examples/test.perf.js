measure('sciencedirect', function(config) {

    config.setURL('https://www.sciencedirect.com/search/advanced');
    config.setNetwork(NETWORK.SLOW3G);
    config.setCPU(CPU.SLOW_7);

    scenario('click', async (page) => {
        await page.type('input#qs', 'marco');


        await page.keyboard.sendCharacter('\n');

    });

    scenario('form', async (page) => {
        await page.type('input#qs', 'marco');
        await page.type('input#authors', 'marco');

        await page.type('input#date', '1990');
    });

});
