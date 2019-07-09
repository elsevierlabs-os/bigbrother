describe('something else', () => {

    it('should open google', async (page) => {
        await page.setConditions();
        await page.load('http://www.google.com');

        const time = await page.click('input[type="text"]');

        expect(time).toBeLessThan(30);
    });

    it('should open sciencedirect', async (page) => {
        const loadTime = await page.load('http://www.sciencedirect.com');

        await page.click();
        await page.click();
        await page.click();

        expect(loadTime).toBeLessThan(500);
    });

    describe('some other scenario', () => {

        it('should do something else on twitter', async (page) => {
            await page.load('http://twitter.com');

            await page.click();
            await page.click();
            const randomClick = await page.click();

            expect(randomClick).toBeLessThan(100);
        });
    });
});