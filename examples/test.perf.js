describe('something else', () => {

    it('should open google', async (page) => {
        await page.setConditions();
        await page.load('http://www.google.com');

        await page.click('input[type="text"]');
    });

    it('should open sciencedirect', async (page) => {
        await page.load('http://www.sciencedirect.com');

        await page.click();
        await page.click();
        await page.click();
    });

    describe('some other scenario', () => {

        it('should do something else on twitter', async (page) => {
            await page.load('http://twitter.com');

            await page.click();
            await page.click();
            await page.click();

            throw new Error('something bad');
        });
    });
});