const logger = require('./logger');
const ChromeLauncher = require('./chromelauncher');
const Parser = require('./parser');
const safeEval = require('safe-eval');
const fs = require('fs');

const ZERO_SCENARIOS = '0 Scenarios found to evaluate.';
const MISSING_PATTERN = 'Something went wrong reading your pattern.';
const ZERO_FILES = '0 files were found.';
const EXPLOSION = '';

class Bigbrother {
    constructor() {
        this.scenarios = {};
    }

    storeScenario(name, cb) {
        if (name && cb) {
            this.scenarios[name] = cb;
        }
    }

    async evaluateSingleScenario(scenarioName) {
        logger.info(`Evaluating single scenario ${scenarioName}.`);
        const chromelauncher = new ChromeLauncher(this.config);
        const scenario = this.scenarios[scenarioName].toString();
        const parser = new Parser(this.rootName, scenarioName, scenario);
        const KEY = `${this.rootName}.${scenarioName}`;

        await chromelauncher.launch();

        performance.start(KEY);
        await parser.evaluateScenario()(chromelauncher.page);
        performance.end(KEY);

        const navigation = await chromelauncher.getNavigationInfo();
        performance.setNavigationInfo(KEY, navigation);

        const paint = await chromelauncher.getPaintInfo();
        performance.setPaintInfo(KEY, paint);

        await chromelauncher.close();
    }

    evaluateScenarios(config, rootName) {
        const keys = Object.keys(this.scenarios);

        if (!keys.length) {
            logger.error(ZERO_SCENARIOS);
            process.exit(1);
        }

        this.config = config;
        this.rootName = rootName;

        return Promise.all(keys.map(this.evaluateSingleScenario.bind(this)));
    }

    evaluateResults() {
        logger.info('Evaluating results.');
        const results = performance.evaluate();

        logger.debug('\n\n');
        logger.success(results.success);
        if (results.failures) {
            logger.failure(results.failures);
            logger.debug('\n')
            return 1;
        } else {
            return 0;
        }
    }

    start(err, files) {
        if (err) {
            logger.usage();
            logger.error(MISSING_PATTERN);
            logger.debug(err);
            process.exit(1);
        }

        if (files.length === 0) {
            logger.usage();
            logger.error(ZERO_FILES);
            process.exit(1);
        }

        logger.info('Starting measurements.');

        Promise.all(files.map(function(filename) {
            const content = fs.readFileSync(filename, 'utf8');

            return safeEval(content, {
                measure: global.measure,
                scenario: global.scenario,
                performance: global.performance,
                NETWORK: global.NETWORK,
                CPU: global.CPU
            });
        }))
        .then((function() {
            logger.info('Measurements done!');
            const CODE = this.evaluateResults();

            process.exit(CODE);
        }).bind(this))
        .catch(function(err) {
            logger.error(EXPLOSION);
            logger.debug(err);
            process.exit(1);
        });
    }
}

module.exports = new Bigbrother();
