import {deepSet, deepGet, deepExist} from './lib/objectutils';

class PerformanceAnalyzer {

    constructor() {
        // somewhere here we're going to store information about all scenario
        this.data = {};
    }

    store() {
        // we should store information about this specific run
    }

    getKey(key) {
        let inc = 1;
        let _key = key;

        if (!deepExist(_key, this.data)) {
            return _key;
        }

        _key = `${key}_${inc}`;
        while (deepExist(_key, this.data)) {
            inc++;
            _key = `${key}_${inc}`;
        }

        return _key;
    }

    startTracking(key, action) {
        const timestamp = +new Date();
        const uniqueKey = this.getKey(`${key}.${action}`);

        deepSet(`${uniqueKey}.start`, timestamp, this.data);

        return uniqueKey;
    }

    stopTracking(key) {
        const action = deepGet(`${key}`, this.data);
        const end = +new Date();
        const duration = end - action.start;

        deepSet(`${key}`, {
            ...action,
            end,
            duration
        }, this.data);

        return duration;
    }

    toJSON() {
        return JSON.stringify(this.data);
    }

}

export default new PerformanceAnalyzer();