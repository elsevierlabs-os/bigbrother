"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printRunnerFailure = exports.printRunnerSuccess = exports.printFailedTest = exports.printTitleTest = exports.printNewLines = exports.printDelimiter = exports.printWarning = exports.printSuccess = exports.printError = exports.printInfo = exports.printException = exports.printFilePatternError = exports.printBigBrother = exports.print = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("colors");

var _constants = require("./constants");

var _package = _interopRequireDefault(require("../../package.json"));

var _config = require("../config");

var NEW_LINE = '\n';
var TAB = '\t';
var DELIMITER = '-';
var WARNING = '[*]'.yellow;
var INFO = '[i️]'.blue;
var ERROR = '[!!]'.red;
var COLON = ':';
var BIGBROTHER_HEADER = "BIGBROTHER v".concat(_package["default"].version);

var print = function print(message) {
  return console.log(message);
};

exports.print = print;

var printInfo = function printInfo(message) {
  var _getConfig = (0, _config.getConfig)(),
      verbose = _getConfig.verbose;

  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  var extraMessage = rest.length ? [NEW_LINE].concat(rest, [NEW_LINE]) : [];

  if (verbose) {
    var _console;

    (_console = console).log.apply(_console, [INFO, message.blue].concat((0, _toConsumableArray2["default"])(extraMessage)));
  }
};

exports.printInfo = printInfo;

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
  return console.log(NEW_LINE, Array(size).join(DELIMITER).grey, NEW_LINE);
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

var printException = function printException(_ref) {
  var message = _ref.message,
      stackTrace = _ref.stackTrace;
  printError(message);

  if (stackTrace) {
    print(stackTrace);
  }
};

exports.printException = printException;

var printBigBrother = function printBigBrother() {
  printNewLines();
  console.log(Array(5).join(DELIMITER).grey, BIGBROTHER_HEADER.grey, Array(5).join(DELIMITER).grey);
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
  var suitesLabel = suitesCount > 1 ? 'suites' : 'suite';
  printNewLines(1);
  printSuccess("Done running ".concat(suitesCount, " ").concat(suitesLabel).green);
};

exports.printRunnerSuccess = printRunnerSuccess;

var printRunnerFailure = function printRunnerFailure(suitesCount, failedCount) {
  var suitesLabel = suitesCount > 1 ? 'suites' : 'suite';
  var failuresLabel = failedCount > 1 ? 'failures' : 'failure';
  printNewLines(1);
  printError("Done running ".concat(suitesCount, " ").concat(suitesLabel).red);
  printError("".concat(failedCount, " ").concat(failuresLabel, " found").red);
};

exports.printRunnerFailure = printRunnerFailure;