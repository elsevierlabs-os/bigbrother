import assert from './assert';

class Expectation {

    constructor(value) {
        this.value = value;
        this.type = typeof value;
    }

    toExist(message) {
        assert(
            this.value,
            (message || 'Expected %s to exist'),
            this.value
        );

        return this;
    }

    toTakeLessThan(time) {
        assert(
            this.value < time,
            'Expected %s to take less than %s',
            this.value,
            time
        );

        return this;
    }
}

export default Expectation;