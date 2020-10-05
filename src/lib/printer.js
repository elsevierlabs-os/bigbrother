import 'colors';
import { PATTERN_DOESNT_MATCH_ERROR } from './constants';
import packageJSON from '../../package.json';
import { getConfig } from '../config';

const NEW_LINE = '\n';
const TAB = '\t';
const DELIMITER = '-';
const WARNING = '[*]'.yellow;
const INFO = '[i️]'.blue;
const ERROR = '[!!]'.red;
const COLON = ':';
const BIGBROTHER_HEADER = `BIGBROTHER v${packageJSON.version}`;

const print = message => console.log(message);
const printInfo = (message, ...rest) => {
    const { verbose } = getConfig();
    const extraMessage = rest.length ? [NEW_LINE, ...rest, NEW_LINE] : [];
    if (verbose) {
        console.log(INFO, message.blue, ...extraMessage);
    }
};
const printError = message => console.log(ERROR, message.red);
const printSuccess = message => console.log(message.green);
const printWarning = message => console.log(WARNING, message.yellow);
const printDelimiter = (size = 30) => console.log(NEW_LINE, Array(size).join(DELIMITER).grey, NEW_LINE);
const printNewLines = (size = 2) => console.log(Array(size).join(NEW_LINE));

const printFilePatternError = pattern => console.log(ERROR, PATTERN_DOESNT_MATCH_ERROR.red, pattern);
const printException = ({ message, stackTrace }) => {
    printError(message);
    if (stackTrace) {
        print(stackTrace);
    }
};

const printBigBrother = () => {
    printNewLines();
    console.log(Array(5).join(DELIMITER).grey, BIGBROTHER_HEADER.grey, Array(5).join(DELIMITER).grey);
    printNewLines();
};

const printTitleTest = title => console.log(DELIMITER, title, COLON);
const printFailedTest = reason => console.log(TAB, ERROR, reason.red);

const printRunnerSuccess = suitesCount => {
    const suitesLabel = suitesCount > 1 ? 'suites' : 'suite';

    printNewLines(1);
    printSuccess(`Done running ${suitesCount} ${suitesLabel}`.green);
};

const printRunnerFailure = (suitesCount, failedCount) => {
    const suitesLabel = suitesCount > 1 ? 'suites' : 'suite';
    const failuresLabel = failedCount > 1 ? 'failures' : 'failure';

    printNewLines(1);
    printError(`Done running ${suitesCount} ${suitesLabel}`.red);
    printError(`${failedCount} ${failuresLabel} found`.red);
};

export {
    print,
    printBigBrother,
    printFilePatternError,
    printException,
    printInfo,
    printError,
    printSuccess,
    printWarning,
    printDelimiter,
    printNewLines,
    printTitleTest,
    printFailedTest,
    printRunnerSuccess,
    printRunnerFailure
};
