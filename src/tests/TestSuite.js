/*
*   this represents an entire file
*
*   a single suite contains multiple blocks
* */
import TestBlock from './TestBlock';
import safeEval from 'safe-eval';
import { cleanFileName } from '../lib/pathutils';
import { PromiseSerial } from '../lib/functions';

class TestSuite {

    constructor(filename, content, browser) {
        // this holds the content of the file
        this.content = content;
        this.filename = cleanFileName(filename);
        this.browser = browser;
        this.blocks = [];
    }

    createBlock = async (key, cb) => {
        const blockKey = `${this.filename}.${key}`;
        const block = new TestBlock(blockKey, cb);
        this.blocks.push(block);
    }

    async execute() {
        // safe eval content
        safeEval(this.content, {
            describe: this.createBlock
        });

        await PromiseSerial(this.blocks.map(b => () => {
            return b.execute(this.browser);
        }));

        return this.blocks;
    }
}

export default TestSuite;