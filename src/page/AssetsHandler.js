class AssetsHandler {

    constructor() {
        this.assets = {};
    }

    reset() {
        this.assets = {};
    }

    store(id, asset) {
        this.assets[id] = asset;
    }

    has(key) {
        return !!this._filterKeys(key).length;
    }

    _filterKeys(key) {
        const regex = new RegExp(key);

        return Object.keys(this.assets)
            .filter(regex.test.bind(regex));
    }

    get(key) {
        return this._filterKeys(key).map(k => this.assets[k]);
    }
}

export default AssetsHandler;