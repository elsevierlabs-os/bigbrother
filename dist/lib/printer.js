"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printRunnerFailure = exports.printRunnerSuccess = exports.printFailedTest = exports.printTitleTest = exports.printNewLines = exports.printDelimiter = exports.printWarning = exports.printSuccess = exports.printError = exports.printException = exports.printFilePatternError = exports.printBigBrother = void 0;

require("colors");

var _constants = require("../constants");

var _package = _interopRequireDefault(require("../../package.json"));

var NEW_LINE = '\n';
var TAB = '\t';
var DELIMITER = '-';
var WARNING = '!'.yellow;
var ERROR = '*'.red;
var COLON = ':';
var BIGBROTHER_HEADER = "BIGBROTHER v".concat(_package.default.version);

var print = function print(message) {
  return console.log(message);
};

var printError = function printError(message) {
  return console.log(ERROR, message.red);
};

exports.printError = printError;

var printSuccess = function printSuccess(message) {
  return console.log(message.green);
};

exports.printSuccess = printSuccess;

var printWarning = function printWarning(message) {
  return console.log(WARNING, message.yellow);
};

exports.printWarning = printWarning;

var printDelimiter = function printDelimiter() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
  return console.log(NEW_LINE, Array(size).join(DELIMITER), NEW_LINE);
};

exports.printDelimiter = printDelimiter;

var printNewLines = function printNewLines() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return console.log(Array(size).join(NEW_LINE));
};

exports.printNewLines = printNewLines;

var printFilePatternError = function printFilePatternError(pattern) {
  return console.log(ERROR, _constants.PATTERN_DOESNT_MATCH_ERROR.red, pattern);
};

exports.printFilePatternError = printFilePatternError;

var printException = function printException(e) {
  printError(e.message);
  print(e.stackTrace);
};

exports.printException = printException;

var printBigBrother = function printBigBrother() {
  printNewLines();
  console.log(Array(5).join(DELIMITER).blue, BIGBROTHER_HEADER.blue, Array(5).join(DELIMITER).blue);
  printNewLines();
};

exports.printBigBrother = printBigBrother;

var printTitleTest = function printTitleTest(title) {
  return console.log(DELIMITER, title, COLON);
};

exports.printTitleTest = printTitleTest;

var printFailedTest = function printFailedTest(reason) {
  return console.log(TAB, ERROR, reason.red);
};

exports.printFailedTest = printFailedTest;

var printRunnerSuccess = function printRunnerSuccess(suitesCount) {
  printNewLines(1);
  printSuccess("Done running ".concat(suitesCount, " suites").green);
};

exports.printRunnerSuccess = printRunnerSuccess;

var printRunnerFailure = function printRunnerFailure(suitesCount, failedCount) {
  printNewLines(1);
  printError("Done running ".concat(suitesCount, " suites").red);
  printError("".concat(failedCount, " failures found").red);
};

exports.printRunnerFailure = printRunnerFailure;