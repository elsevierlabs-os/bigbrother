import {
    CPU,
    CPU_CONDITIONS_MESSAGE,
    NETWORK,
    NETWORK_CONDITIONS_MESSAGE,
    NAVIGATION_INFO_TYPE,
    PAINT_INFO_TYPE,
    PAGE_LOAD_OPTIONS,
    NETWORK_ENABLE,
    NETWORK_RESPONSE_RECEIVED,
    NETWORK_DATA_RECEIVED,
    NETWORK_ASSETS_MIMETYPES,
    PAGEWRAPPER_MISSING_PAGE_ERROR,
    PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR
} from '../lib/constants';

import performanceAnalyzer from '../lib/PerformanceAnalyzer';
import { deepSet } from '../lib/utils/object';
import AssetsHandler from './AssetsHandler';
import { buildUrl } from '../lib/utils/url';
import { printException } from '../lib/printer';

class PageWrapper {

    constructor(page, name) {
        this.options = {};

        this.page = page;
        this.name = name;

        this.measurements = {
            __keys: []
        };
        this.timings = {};
        this.responses = {};
        this.assetsHandler = new AssetsHandler();
        this.pageSettings = {
            userAgent: '',
            cpu: CPU.DEFAULT,
            network: NETWORK.WIFI
        };

        if (!this.page) {
            throw new Error(PAGEWRAPPER_MISSING_PAGE_ERROR);
        }
    }

    getPageName() {
        return this.name;
    }

    getPageSettings() {
        return this.pageSettings;
    }

    async close() {
        try {
            if (this.hasPage()) {
                // collecting paint and navigation info
                const paint = await this.getPaintInfo();
                const navigation = await this.getNavigationInfo();
                this.storeTimings(paint, navigation);

                await this.page.close();
            }
        } catch (e) {
            printException(e);
        }
    }

    getCDPSessionClient = async () => {
        if (!this.cdpSessionClient) {
            this.cdpSessionClient = await this.page.target().createCDPSession();
        }
        return this.cdpSessionClient;
    };

    async setNetworkSpeed(network = NETWORK.WIFI) {
        try {
            const client = await this.getCDPSessionClient();
            await client.send(NETWORK_CONDITIONS_MESSAGE, network);
            this.storePageSetting({ network });
        } catch (e) {
            printException(e);
        }
    }

    async setCpuSpeed(cpu = CPU.DEFAULT) {
        try {
            const client = await this.getCDPSessionClient();
            await client.send(CPU_CONDITIONS_MESSAGE, cpu);
            this.storePageSetting({ cpu });
        } catch (e) {
            printException(e);
        }
    }

    storePageSetting(setting) {
        this.pageSettings = {
            ...this.getPageSettings(),
            ...setting
        };
    }

    storeTimings(paint, navigation) {
        this.timings = {
            paint,
            navigation
        };
    }

    getTimings() {
        return this.timings;
    }
    //
    // cpu = () => this.options.cpu;
    // network = () => this.options.network;

    hasPage() {
        return Boolean(this.page);
    }

    getKey(key) {
        return `${this.getPageName()}.${key}`;
    }

    storeMeasurement = data => {
        deepSet(data.key, data, this.measurements);
        this.storeMeasurementKey(data.key);
    };

    storeMeasurementKey = key => this.measurements.__keys.push(key);

    clearAssets = () => this.assetsHandler.reset();
    clearResponses = () => (this.responses = {});

    storeAsset = (url, asset) => this.assetsHandler.store(url, asset);
    storeResponse = (id, response) => (this.responses[id] = response);

    handleNetworkResponseReceived = ({ response, requestId }) => this.storeResponse(requestId, response);

    handleNetworkDataReceived = ({ requestId, encodedDataLength, dataLength, ...rest }) => {
        const { url, mimeType } = this.responses[requestId];
        const isAssetData = NETWORK_ASSETS_MIMETYPES.map(type => new RegExp(type).test(mimeType)).some(Boolean);

        if (!url || url.startsWith('data:') || !isAssetData) {
            return;
        }

        const asset = this.assetsHandler.get(url)[0];

        this.storeAsset(url, {
            mimeType,
            encodedLength: ((asset && asset.encodedLength) || 0) + encodedDataLength / 1024,
            length: ((asset && asset.length) || 0) + dataLength / 1024,
            ...rest
        });
    };

    async setupAssetsMetrics() {
        this.clearResponses();
        this.clearAssets();
        const client = await this.getCDPSessionClient();
        await client.send(NETWORK_ENABLE);

        client.on(NETWORK_RESPONSE_RECEIVED, this.handleNetworkResponseReceived);
        client.on(NETWORK_DATA_RECEIVED, this.handleNetworkDataReceived);
    }

    async getInfo(type) {
        if (this.page) {
            return await this.page.evaluate(type => {
                let entries = performance.getEntriesByType(type);
                if (entries.length) {
                    return entries.map(e => e.toJSON());
                }
            }, type);
        } else {
            return [];
        }
    }

    async getPaintInfo() {
        return await this.getInfo(PAINT_INFO_TYPE);
    }
    async getNavigationInfo() {
        return await this.getInfo(NAVIGATION_INFO_TYPE);
    }
    async getAssetsInfo() {
        return this.assetsHandler;
    }

    _load = url => async () => await this.page.goto(url, PAGE_LOAD_OPTIONS);
    _click = (selector, options) => async () => await this.page.click(selector, options);
    _focus = selector => async () => await this.page.focus(selector);
    _setUserAgent = userAgent => async () => await this.page.setUserAgent(userAgent);
    _type = text => async () => await this.page.keyboard.type(text);

    async load(url) {
        if (this.hasPage() && url) {
            await this.setupAssetsMetrics();
            const fullUrl = buildUrl(url);
            const data = await performanceAnalyzer.measure(this.getKey('load'), this._load(fullUrl));
            this.options.url = fullUrl;
            this.storeMeasurement(data);
            return Promise.resolve(data.duration);
        } else {
            return Promise.reject(PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR);
        }
    }

    async click(selector, options = {}) {
        if (this.hasPage()) {
            const data = await performanceAnalyzer.measure(this.getKey('click'), this._click(selector, options));
            this.storeMeasurement(data);
            return Promise.resolve(data.duration);
        } else {
            return Promise.reject(PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR);
        }
    }

    async focus(selector) {
        if (this.hasPage()) {
            const data = await performanceAnalyzer.measure(this.getKey('focus'), this._focus(selector));
            this.storeMeasurement(data);
            return Promise.resolve(data.duration);
        } else {
            return Promise.reject(PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR);
        }
    }

    async tap() {}

    async setUserAgent(userAgent) {
        if (this.hasPage()) {
            const data = await performanceAnalyzer.measure(this.getKey('userAgent', this._setUserAgent(userAgent)));
            this.storeMeasurement(data);
            this.storePageSetting({ userAgent });
            return Promise.resolve(data.duration);
        } else {
            return Promise.reject(PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR);
        }
    }

    async type(selector, text) {
        if (this.hasPage()) {
            const data = await performanceAnalyzer.measure(this.getKey('type'), this._type(selector, text));
            this.storeMeasurement(data);
            return Promise.resolve(data.duration);
        } else {
            return Promise.reject(PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR);
        }
    }

    async keyboard() {}

    async screenshot() {}

    async waitFor() {}

    toJSON(spacing = 4, stringify = true) {
        const json = {
            ...this.measurements,
            assets: this.assetsHandler.toJSON(),
            timings: this.getTimings(),
            pageSettings: this.getPageSettings()
        };

        return stringify ? JSON.stringify(json, null, spacing) : json;
    }
}

export default PageWrapper;
