/*
* this represents a single it
* */

import PageBuilder from '../PageBuilder';

class Test {

    constructor(name, cb) {
        // this requires a browser instance to get the pageBuilder
        // this also requires the block were it belongs

        this.name = name;
        this.cb = cb;
    }

    execute(browser) {
        // callback will receive a PageBuilder
        const pageBuilder = new PageBuilder(browser);
        console.log(this.name);
        this.cb(pageBuilder);
    }
}

export default Test;