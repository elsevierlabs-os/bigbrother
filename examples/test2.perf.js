describe('something else', () => {

    it('should open google', async (page) => {
        await page.setConditions();
        await page.load('http://www.google.com');

        const time = await page.click('input[type="text"]');

        expect(time).toBeLessThan(50);
    });

    it('should take less than 2s to load sciencedirect.com', async (page) => {
        const loadTime = await page.load('http://www.sciencedirect.com');

        expect(loadTime).toBeLessThan(2000);
    });

    it('should take less than 2.5s to load search/advanced', async (page) => {

        const loadTime = await page.load('http://www.sciencedirect.com/search/advanced');

        expect(loadTime).toBeLessThan(2500);
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