import 'colors';
import {PATTERN_DOESNT_MATCH_ERROR} from '../constants';
import packageJSON from '../../package.json';

const NEW_LINE = '\n';
const TAB = '\t';
const DELIMITER = '-';
const WARNING = '!'.yellow;
const ERROR = '*'.red;
const COLON = ':';
const BIGBROTHER_HEADER = `BIGBROTHER v${packageJSON.version}`;

const print = (message) => console.log(message);
const printError = (message) => console.log(ERROR, message.red);
const printSuccess = (message) => console.log(message.green);
const printWarning = (message) => console.log(WARNING, message.yellow);
const printDelimiter = (size = 30) => console.log(NEW_LINE, Array(size).join(DELIMITER), NEW_LINE);
const printNewLines = (size = 2) => console.log(Array(size).join(NEW_LINE));

const printFilePatternError = (pattern) => console.log(ERROR, PATTERN_DOESNT_MATCH_ERROR.red, pattern);
const printException = (e) => {
    printError(e.message);
    print(e.stackTrace);
};

const printBigBrother = () => {
    printNewLines();
    console.log(
        Array(5).join(DELIMITER).blue,
        BIGBROTHER_HEADER.blue,
        Array(5).join(DELIMITER).blue);
    printNewLines();
};

const printTitleTest = (title) => console.log(DELIMITER, title, COLON);
const printFailedTest = (reason) => console.log(TAB, ERROR, reason.red);

const printRunnerSuccess = (suitesCount) => {
    printNewLines(1);
    printSuccess(`Done running ${suitesCount} suites`.green);
};

const printRunnerFailure = (suitesCount, failedCount) => {
    printNewLines(1);
    printError(`Done running ${suitesCount} suites`.red);
    printError(`${failedCount} failures found`.red);
};

export {
    printBigBrother,
    printFilePatternError,
    printException,
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
