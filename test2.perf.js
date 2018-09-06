measure('google', function(config) {

    config.setURL('https://www.google.com');

    scenario('submit', async (page) => {
        await page.type('input', 'marco');
        await page.keyboard.sendCharacter('\n');
    });
});
