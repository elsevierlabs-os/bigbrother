const babelConfig = require('./babel.config');
require('@babel/register')({
    presets: babelConfig.presets,
    plugins: babelConfig.plugins
});

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const chai = require('chai');
const chaiJestSnapshot = require('chai-jest-snapshot');

Enzyme.configure({ adapter: new Adapter() });

// setting up chai for snapshot testing
chai.use(chaiJestSnapshot);

before(function() {
    chaiJestSnapshot.resetSnapshotRegistry();
});

beforeEach(function() {
    if (this.currentTest) {
        const { title, file } = this.currentTest;
        const newFilename = file.replace('test.js', 'snap');

        chaiJestSnapshot.configureUsingMochaContext(this);
        chaiJestSnapshot.setFilename(newFilename);
        chaiJestSnapshot.setTestName(title);
    }
});
