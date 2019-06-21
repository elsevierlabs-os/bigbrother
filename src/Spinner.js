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
        this.instance.succeed(`${this.text} completed!`);
    }

    // fail(e) {
    //     this.instance.fail(text);
    // }

    exception(e) {
        this.instance.fail('Exception! ' + e.toString().red);
    }

    warn(text) {
        this.instance.warn(text);
    }
}

export default Spinner;