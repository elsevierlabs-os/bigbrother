measure('sciencedirect', function(config) {

    config.setURL('https://www.sciencedirect.com/search/advanced');
    config.setNetwork(NETWORK.WIFI);
    config.setCPU(CPU.DEFAULT);
    config.setHeadless(true);

    scenario('form', async (page) => {
        await page.waitForSelector('input#qs');

        await page.type('input#qs', 'marco');

        await page.type('input#authors', 'marco');

        await page.type('input#date', '1990');
    });
});

// import { open } from 'performance';
//
// describe('Scenario', () => {
//
//     it('should take less than 1s to load page', async () => {
//         const options = {};
//         const page = await open('https://', options);
//
//         const clickTime = await page.click('someId');
//
//         expect(clickTime).to.equal(100);
//         expect(page.timeElapsed).to.be.lessThan(100);
//     });
// });
