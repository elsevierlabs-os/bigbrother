import { expect } from 'chai';
import { getPageMock } from '../testHelpers/puppeteerMock'
import PageWrapper from './PageWrapper'
import { CPU, NETWORK } from '../lib/constants'

describe.only('PageWrapper', () => {

    let pageMock;

    beforeEach(() => {
        pageMock = getPageMock();
    });

    afterEach(() => {
        pageMock.reset();
    });

    describe('contructor', () => {

        it('should set the page name', () => {
            const wrapper = new PageWrapper(pageMock, 'title');
            expect(wrapper.getPageName()).to.equal('title');
        });

        it('should set the default page Settings', () => {
            const wrapper = new PageWrapper(pageMock);
            const pageSettings = wrapper.getPageSettings();


            expect(pageSettings.userAgent).to.equal('');
            expect(pageSettings.cpu).to.deep.equal(CPU.DEFAULT);
            expect(pageSettings.network).to.deep.equal(NETWORK.WIFI);
        });

        it('should throw an error if page is missing', () => {
            const createWrapper = () => new PageWrapper(null, 'title');
            expect(createWrapper).to.throw();
        });
    });

    describe('setNetworkSpeed', () => {

        it('should send settings to the CDPSessionClient');

        it('should store the new network settings');
    });

    describe('setCPUSpeed', () => {

    });


});
