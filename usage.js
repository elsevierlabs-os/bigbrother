const getUsage = require('command-line-usage');
const packageJson = require('./package');

const usage = getUsage([
    {
        header: 'BigBrother'.bold.green,
        content: 'BigBrother is a test runner built on top of Puppeteer, that allows you to ' +
            'evaluate and measure the performance of your application, under specific CPU and Network configurations.' +
            '\n' +
            '\n' +
            'BigBrother provides also a small assertion library, and the chance to record/evaluate snapshots of' +
            'the page you\'re evaluating.'
    },
    {
        header: 'Synopsis'.yellow,
        content: [
            '$ bigbrother {bold --config}={underline configfile} \'**/*.perf.js\'',
            '$ bigbrother {bold --help}'
        ]
    },
    {
        header: 'Options'.yellow,
        optionList: [
            {
                name: 'help',
                description: 'Display this usage guide.'.bold.grey,
                alias: 'h',
                type: Boolean
            },
            {
                name: 'config',
                alias: 'c',
                description: 'The configuration file that will be used by bigbrother. Please note that the path has to be relative (e.g. "--config=./bigbrother.config.js".'.bold.grey,
                type: String,
                typeLabel: '{underline file}'
            },
            {
                name: 'verbose',
                description: 'Run bigbrother in verbose mode.'.bold.grey,
                alias: 'v',
                type: Boolean,
            }
        ]
    },
    {
        header: 'Info'.yellow,
        content: `Project home: {underline ${packageJson.homepage} }`
    },
    {
        content: `Bugs: ${packageJson.bugs.url}`
    },
    {
        content: `Author: ${packageJson.author}`
    }
]);

module.exports = usage;