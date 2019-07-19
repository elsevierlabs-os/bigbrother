describe('something', () => {

    it('loads sciencedirect', async page => {
        await page.load('https://sciencedirect.com');

        const assets = await page.getAssetsInfo();

        console.log(assets.get('style'));

    });
});