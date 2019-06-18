describe('something else', () => {

    it('should open browser', async (page) => {
        await page.setConditions();
        await page.load('http://www.google.com');

        console.log('opened google');
    });

    it('should open sciencedirect', async (page) => {
        await page.load('http://www.sciencedirect.com');

        console.log('done sciencedirect');
    });

    describe('some other scenario', () => {

        it('should do something else on twitter', async (page) => {
            await page.load('http://twitter.com');

            console.log('done twitter');
        });
    });
});