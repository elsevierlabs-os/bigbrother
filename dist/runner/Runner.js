"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _Suite = _interopRequireDefault(require("../tests/Suite"));

var _Browser = _interopRequireDefault(require("../browser/Browser"));

var _functions = require("../lib/functions");

var _httpClient = require("../lib/httpClient");

var _printer = require("../lib/printer");

var _process = require("../lib/utils/process");

var _TaskRunner = _interopRequireWildcard(require("./TaskRunner"));

var _config = require("../config");

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
      })).then(_this.evaluateResults).catch(_this.handleException);
    });
    (0, _defineProperty2.default)(this, "handleException", function (e) {
      (0, _printer.printException)(e);
      (0, _process.exitProcess)(1);
    });
    (0, _defineProperty2.default)(this, "onFilesFound", function (err) {
      var files = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (err) {
        (0, _printer.printError)(err);
        (0, _process.exitProcess)(1);
      }

      if (!files.length) {
        (0, _printer.printFilePatternError)(_this.pattern);
        (0, _process.exitProcess)(1);
      }

      var suitesLabel = files.length > 1 ? 'suites' : 'suite';
      (0, _printer.printInfo)("Found ".concat(files.length, " ").concat(suitesLabel));
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
    (0, _defineProperty2.default)(this, "getIgnoredFiles", function () {
      var NODE_MODULES = 'node_modules/**/*.*';

      var _getConfig = (0, _config.getConfig)(),
          ignore = _getConfig.ignore;

      return [NODE_MODULES].concat((0, _toConsumableArray2.default)(ignore));
    });
    (0, _defineProperty2.default)(this, "stop", function (status) {
      Runner.cleanup();

      if (_this.browser) {
        _this.browser.close().then(function () {
          return (0, _process.exitProcess)(status);
        });
      }
    });
    this.pattern = pattern;
    this.browser = null;
    this.suites = [];
  }

  (0, _createClass2.default)(Runner, [{
    key: "setup",
    value: function setup(configuration) {
      (0, _config.storeConfiguration)(configuration);
      (0, _process.onUserInterrupt)(this.stop);

      _TaskRunner.default.executePreCommand();
    }
  }, {
    key: "start",
    value: function start(config) {
      var _this2 = this;

      (0, _printer.printInfo)('Starting Runner.');
      this.setup(config);
      Runner.checkTargetApplicationIsRunning().then(function () {
        (0, _printer.printBigBrother)();
        (0, _printer.printInfo)('Starting Browser.');
        _this2.browser = new _Browser.default(config);

        _this2.browser.launch().then(function () {
          return (0, _glob.default)(_this2.pattern, {
            ignore: _this2.getIgnoredFiles()
          }, _this2.onFilesFound);
        });
      }).catch(_printer.printException);
    }
  }], [{
    key: "cleanup",
    value: function cleanup() {
      (0, _printer.printInfo)('Performing Runner cleanup.');

      _TaskRunner.default.executePostCommand();

      _TaskRunner.default.stop(_TaskRunner.PRECOMMAND).then(function () {
        return (0, _printer.printInfo)("".concat(_TaskRunner.PRECOMMAND, " command has been killed."));
      }).catch(_printer.printException);
    }
  }, {
    key: "checkTargetApplicationIsRunning",
    value: function checkTargetApplicationIsRunning() {
      var _getConfig2 = (0, _config.getConfig)(),
          baseUrl = _getConfig2.baseUrl,
          maxRetries = _getConfig2.maxRetries;

      var timeout = 1500;
      return (0, _httpClient.pingEndpoint)(baseUrl, maxRetries, timeout);
    }
  }]);
  return Runner;
}();

var _default = Runner;
exports.default = _default;