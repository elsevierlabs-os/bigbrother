import { deepSet, deepGet, deepExist } from './utils/object';

class PerformanceAnalyzer {
    constructor() {
        // somewhere here we're going to store information about all scenario
        this.data = {};
    }

    getUniqueKey(key) {
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

    startTracking(key) {
        const timestamp = +new Date();
        const uniqueKey = this.getUniqueKey(key);

        deepSet(`${uniqueKey}.start`, timestamp, this.data);

        return uniqueKey;
    }

    stopTracking(key) {
        const action = deepGet(`${key}`, this.data);
        const end = +new Date();
        const duration = end - action.start;

        const value = {
            ...action,
            end,
            duration,
            key
        };

        deepSet(`${key}`, value, this.data);

        return value;
    }

    async measure(key, targetFunction) {
        const uniqueKey = this.startTracking(key);
        try {
            await targetFunction();
        } catch (e) {
            this.stopTracking(key);
        }
        return this.stopTracking(uniqueKey);
    }

    toJSON() {
        return JSON.stringify(this.data, null, 4);
    }
}

export default new PerformanceAnalyzer();
