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

class PageWrapper {

    constructor(page, name) {

        this.options = {};

        this.page = page;
        this.name = name;

        this.measurements = {
            __keys: []
        };
        this.responses = {};
        this.assetsHandler = new AssetsHandler();

        if (!this.page) {
            throw new Error(PAGEWRAPPER_MISSING_PAGE_ERROR);
        }
    }

    async close() {
        if (this.hasPage()) {
            await this.page.close();
        }
    }

    getCDPSessionClient = async () => {
        if (!this.cdpSessionClient) {
            this.cdpSessionClient = await this.page.target().createCDPSession();
        }
        return this.cdpSessionClient;
    }

    async setNetworkSpeed(network = NETWORK.WIFI) {
        const client = await this.getCDPSessionClient();
        await client.send(NETWORK_CONDITIONS_MESSAGE, network);
    }

    async setCpuSpeed(cpu = CPU.DEFAULT) {
        const client = await this.getCDPSessionClient();
        await client.send(CPU_CONDITIONS_MESSAGE, cpu);
    }

    async setSpeed({ cpu = CPU.DEFAULT, network = NETWORK.WIFI } = {}) {
        this.options.cpu = cpu;
        this.options.network = network;

        await this.setNetworkSpeed(network);
        await this.setCpuSpeed(cpu);
    }

    cpu = () => this.options.cpu;
    network = () => this.options.network;

    hasPage() {
        return Boolean(this.page);
    }

    getKey(key) {
        return `${this.name}.${key}`;
    }

    storeMeasurement = (data) => {
        deepSet(data.key, data, this.measurements);
        this.storeMeasurementKey(data.key);
    };

    storeMeasurementKey = key => this.measurements.__keys.push(key);

    clearAssets = () =>  this.assetsHandler.reset();
    clearResponses = () => this.responses = {};

    storeAsset = (url, asset) => this.assetsHandler.store(url, asset);
    storeResponse = (id, response) => this.responses[id] = response;

    handleNetworkResponseReceived = ({ response, requestId}) => this.storeResponse(requestId, response);

    handleNetworkDataReceived = ({ requestId, encodedDataLength, dataLength, ...rest }) => {
        const { url, mimeType } = this.responses[requestId];
        const isAssetData = NETWORK_ASSETS_MIMETYPES
            .map(type => new RegExp(type).test(mimeType))
            .some(Boolean);

        if (!url || url.startsWith('data:') || !isAssetData) {
            return;
        }

        const asset = this.assetsHandler.get(url)[0];

        this.storeAsset(url,{
            mimeType,
            encodedLength: (asset && asset.encodedLength || 0) + (encodedDataLength / 1024),
            length:  (asset && asset.length || 0) + (dataLength / 1024),
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

    async getPaintInfo() { return await this.getInfo(PAINT_INFO_TYPE); }
    async getNavigationInfo() { return await this.getInfo(NAVIGATION_INFO_TYPE); }
    async getAssetsInfo() { return this.assetsHandler; }

    _load = (url) => async () => await this.page.goto(url, PAGE_LOAD_OPTIONS);
    _click = (selector, options) => async () => await this.page.click(selector, options);
    _focus = (selector) => async () => await this.page.focus(selector);
    _setUserAgent = (userAgent) => async () => await this.page.setUserAgent(userAgent);
    _type = (text) => async () => await this.page.keyboard.type(text);

    async load(url) {
        return new Promise(async (resolve, reject) => {
            if (this.hasPage() && url) {
                await this.setupAssetsMetrics();
                const fullUrl = buildUrl(url);
                const data = await performanceAnalyzer.measure(this.getKey('load'), this._load(fullUrl));
                this.options.url = fullUrl;
                this.storeMeasurement(data);
                resolve(data.duration);
            } else {
                reject(PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR);
            }
        });
    }

    async click(selector, options = {}) {
        return new Promise(async (resolve, reject) => {
            if (this.hasPage()) {
                const data = await performanceAnalyzer.measure(this.getKey('click'), this._click(selector, options));
                this.storeMeasurement(data);
                resolve(data.duration);
            } else {
                reject(PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR);
            }
        });
    }

    async focus(selector) {
        return new Promise(async (resolve, reject) => {
            if (this.hasPage()) {
                const data = await performanceAnalyzer.measure(this.getKey('focus'), this._focus(selector));
                this.storeMeasurement(data);
                resolve(data.duration);
            } else {
                reject(PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR);
            }
        });
    }

    async tap(select) {}

    async setUserAgent(userAgent) {
        return new Promise( async (resolve, reject) => {
            if (this.hasPage()) {
                const data = await performanceAnalyzer.measure(this.getKey('userAgent', this._setUserAgent(userAgent)));
                this.storeMeasurement(data);
                resolve(data.duration);
            } else {
                reject(PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR);
            }
        });
    }

    async type(selector, text) {
        return new Promise(async (resolve, reject) => {
            if (this.hasPage()) {
                const data = await performanceAnalyzer.measure(this.getKey('type'), this._type(selector, text));
                this.storeMeasurement(data);
                resolve(data.duration);
            } else {
                reject(PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR);
            }
        });
    }

    async keyboard(event) {}

    async screenshot() {}

    async waitFor(selector) {}

    toJSON(spacing = 4) {
        const json = {
            ...this.measurements,
            assets: this.assetsHandler.toJSON()
        };

        return JSON.stringify(json, null, spacing);
    }
}

export default PageWrapper;
