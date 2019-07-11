describe('Search', () => {

    it('should take less than 2.5s to load search/advanced', async (page) => {

        const loadTime = await page.load('http://www.sciencedirect.com/search/advanced');

        expect(loadTime).toBeLessThan(2500);
    });

    it('should take less than 2.5s to load search/advanced?qs=cell', async (page) => {
        const loadTime = await page.load('http://www.sciencedirect.com/search/advanced?qs=cell');

        expect(loadTime).toBeLessThan(2500);
    });
});