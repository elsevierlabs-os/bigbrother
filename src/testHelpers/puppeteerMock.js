import sinon from 'sinon';

export const getPageMock = () => ({
    setCacheEnabled: sinon.stub(),

    reset: function() {
        this.setCacheEnabled.reset();
    }
});

export const getPuppeteerBrowserMock = (PageMock = getPageMock()) => ({
    newPage: sinon.stub().resolves(PageMock),

    reset: function() {
        PageMock.reset();
        this.newPage.reset();
    }
});

const getPuppeteerMock = () => {
    const PageMock = getPageMock();
    const PuppeteerBrowserMock = getPuppeteerBrowserMock(PageMock);

    return {
        launch: sinon
            .stub()
            .resolves(PuppeteerBrowserMock),

        reset: function() {
            PuppeteerBrowserMock.reset();
            this.launch.reset();
        }
    };
};

export default getPuppeteerMock;
