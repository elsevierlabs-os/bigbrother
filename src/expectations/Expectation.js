import assert from './assert';
import {
    compareWithStoredRecording,
    recordingExists,
    recordPage
} from '../page/PageRecorder';

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
        /*
        * we get the page
        * check inside .recordings if the page exists
        *   if the page exists, compare the json and return the diff
        *   if the page does not exist, save the json inside the recordings folder. and return OK
        * */
        const page = this.value;

        if (recordingExists(page)) {
            const comparison = compareWithStoredRecording(page);
        } else {
            recordPage(page);
        }
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

    toBeMoreThan(value) {
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
