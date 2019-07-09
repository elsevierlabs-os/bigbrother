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

    toBeLessThan(value) {
        assert(
            this.value < value,
            'Expected %s to be less than %s',
            this.value,
            value
        );

        return this;
    }

    toBeEqual(value) {
        assert(
            this.value === value,
            (message || 'Expected %s to be equal to %s'),
            this.value,
            value
        );

        return this;
    }

    toMatchRecording() {
        // do stuff about recordings
    }

    toBeWithinRange(min, max) {
        assert(
            min < this.value && this.value < max,
            (message || 'Expected %s to be between %s and %s'),
            this.value,
            min,
            max
        );

        return this;
    }

    toBeMoreThan() {
        assert(
            this.value > value,
            'Expected %s to be more than %s',
            this.value,
            value
        );

        return this;
    }


}

export default Expectation;