/*
*  This represents a single Describe block
*
*  it and describe will be injected into the callback
*
* */

import Test from './Test';
import safeEval from 'safe-eval';

class TestBlock {

    constructor(block, cb) {
        // this is the name of the block where we are
        this.block = block;
        this.blocks = [];
        this.tests = [];

        this.cb = cb;

        // storing before / after / afterEach / beforeEach callbacks
        this._before = f => f;
        this._after = f => f;
        this._beforeEach = f => f;
        this._afterEach = f => f;
    };

    createBlock = (browser) => (key, cb) => {
        const blockKey = `${this.block}.${key}`;
        const block = new TestBlock(blockKey, cb);
        this.blocks.push(block);

        block.execute(browser);
    }

    createTest = (key, cb) => {
        // this is for it calls
        const testKey = `${this.block}.${key}`;
        const test = new  Test(testKey, cb, this.block);

        this.tests.push(test);
    }

    beforeEach = (cb) => {
        this._beforeEach = cb;
    }

    execute(browser) {
        // this should inject the right it inside the test
        // it should also create the test
        // executing callback
        const executor = new Function('it', 'describe', 'beforeEach', `(${this.cb.toString()})()`);
        executor(this.createTest, this.createBlock(browser), this.beforeEach);

        // const block = safeEval(this.cb.toString(), {
        //     it: this.createTest,
        //     describe: this.createBlock(browser)
        // });
        // console.log('after saf eval', block);
        // when callback is done, it means we can call each test in our tests list
        this._before();
        this.tests.forEach(test => {
            this._beforeEach();
            test.execute(browser);
            this._afterEach();
        });
        this._after();
    }
}

export default TestBlock;