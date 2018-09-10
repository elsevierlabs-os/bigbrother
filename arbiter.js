const logger = require('./logger');
const ChromeLauncher = require('./chromelauncher');
const Parser = require('./parser');

const ZERO_SCENARIOS = '0 Scenarios found to evaluate.';

class Arbiter {
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
}

module.exports = new Arbiter();
