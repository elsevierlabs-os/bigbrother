"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _glob = _interopRequireDefault(require("glob"));

var _fs = _interopRequireDefault(require("fs"));

var _Suite = _interopRequireDefault(require("./tests/Suite"));

var _Browser = _interopRequireDefault(require("./Browser"));

var _functions = require("./lib/functions");

var _printer = require("./lib/printer");

var Runner =
/*#__PURE__*/
function () {
  function Runner(pattern) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Runner);
    (0, _defineProperty2.default)(this, "readFile", function (filename) {
      var content = _fs.default.readFileSync(filename, 'utf8');

      return {
        filename: filename,
        content: content
      };
    });
    (0, _defineProperty2.default)(this, "executeTestSuites", function () {
      var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      _this.suites = tests.map(function (_ref) {
        var filename = _ref.filename,
            content = _ref.content;
        return new _Suite.default(filename, content, _this.browser);
      });
      (0, _functions.PromiseSerial)(_this.suites.map(function (s) {
        return function () {
          return s.execute();
        };
      })).then(_this.evaluateResults).catch(_printer.printException);
    });
    (0, _defineProperty2.default)(this, "onFilesFound", function (err) {
      var files = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (err) {
        (0, _printer.printError)(err);
        process.exit(1);
      }

      if (!files.length) {
        (0, _printer.printFilePatternError)(_this.pattern);
        process.exit(1);
      }

      var tests = files.map(_this.readFile);

      _this.executeTestSuites(tests);
    });
    (0, _defineProperty2.default)(this, "evaluateResults", function (suites) {
      var failed = suites.reduce(function (total, suite) {
        return [].concat((0, _toConsumableArray2.default)(total), (0, _toConsumableArray2.default)(suite.filter(function (test) {
          return !test.success;
        })));
      }, []);
      var failedCount = failed.length;
      var suitesCount = suites.length;
      (0, _printer.printDelimiter)();

      if (failedCount > 0) {
        (0, _printer.printRunnerFailure)(suitesCount, failedCount);

        _this.printFailures(failed);
      } else {
        (0, _printer.printRunnerSuccess)(suitesCount);
      }

      _this.stop(failedCount);
    });
    (0, _defineProperty2.default)(this, "printFailures", function (failed) {
      (0, _printer.printNewLines)();
      failed.forEach(function (test) {
        (0, _printer.printTitleTest)(test.title);
        (0, _printer.printFailedTest)(test.reason.message);
        (0, _printer.printNewLines)(1);
      });
    });
    this.pattern = pattern;
    this.browser = null;
    this.suites = [];
  }

  (0, _createClass2.default)(Runner, [{
    key: "start",
    value: function start(browserOptions) {
      var _this2 = this;

      (0, _printer.printBigBrother)();
      this.browser = new _Browser.default(browserOptions);
      this.browser.launch().then(function () {
        return (0, _glob.default)(_this2.pattern, {}, _this2.onFilesFound);
      });
    }
  }, {
    key: "stop",
    value: function stop(status) {
      this.browser.close().then(function () {
        return process.exit(status);
      });
    }
  }]);
  return Runner;
}();

var _default = Runner;
exports.default = _default;