import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

import Browser from './Browser';
import getPuppeteerMock from '../testHelpers/puppeteerMock';

describe('Browser', () => {
    describe('contructor', () => {
        it('default should set right options', () => {
            const browser = new Browser();

            expect(browser.puppeteerOptions.headless).to.equal(true);
            expect(browser.pageOptions.cacheEnabled).to.equal(false);
        });

        it('should set headless option correctly when provided', () => {
            const browser = new Browser({ headless: false });

            expect(browser.puppeteerOptions.headless).to.equal(false);
        });

        it('should set the cacheEnabledOption correctly when provided', () => {
            const browser = new Browser({ cacheEnabled: true });

            expect(browser.pageOptions.cacheEnabled).to.equal(true);
        });
    });

    describe.only('newPage', () => {
        let BrowserMock, printWarning, printInfo;

        beforeEach(() => {
            printWarning = sinon.stub();
            printInfo = sinon.stub();

            BrowserMock = proxyquire.noCallThru().load('./Browser', {
                puppeteer: getPuppeteerMock(),
                '../lib/printer': { printWarning, printInfo }
            }).default;
        });

        it('creating a new page without launching will print a warning', async () => {
            const browser = new BrowserMock();
            await browser.newPage();

            expect(printWarning.called).to.equal(true);
        });

        it('should create a new page after launching browser', async () => {
            const browser = new BrowserMock();
            await browser.launch();

            const page = await browser.newPage();

            expect(page).to.not.equal(undefined);
        });

        it('should set cache options for new page', async () => {
            const browser = new BrowserMock();
            await browser.launch();

            const page = await browser.newPage();

            expect(page.setCacheEnabled.called).to.equal(true);
        });
    });
});
