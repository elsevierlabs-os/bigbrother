import ora from 'ora';

class Spinner {

    constructor(text) {
        this.text = text;
        this.instance = ora({
            text,
            spinner: 'dots12'
        }).start();
    }

    complete() {
        this.instance.succeed(this.text);
    }

    exception(e) {
        const exception = ' ' + e.toString().red;
        const message = this.text.concat(exception);
        this.instance.fail(message);
    }

    warn(text) {
        this.instance.warn(text);
    }
}

export default Spinner;
