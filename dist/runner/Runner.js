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

var _Suite = _interopRequireDefault(require("../tests/Suite"));

var _Browser = _interopRequireDefault(require("../browser/Browser"));

var _functions = require("../lib/functions");

var _httpClient = require("../lib/httpClient");

var _printer = require("../lib/printer");

var _process = require("../lib/utils/process");

var _TaskRunner = _interopRequireWildcard(require("./TaskRunner"));

var _FileReader = _interopRequireDefault(require("../lib/FileReader"));

var _config = require("../config");

var Runner =
/*#__PURE__*/
function () {
  function Runner() {
    var _this = this;

    (0, _classCallCheck2.default)(this, Runner);
    (0, _defineProperty2.default)(this, "executeTestSuites", function () {
      var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var suites = tests.map(function (_ref) {
        var filename = _ref.filename,
            content = _ref.content;
        return new _Suite.default(filename, content, _this.browser);
      });
      return (0, _functions.PromiseSerial)(suites.map(function (s) {
        return function () {
          return s.execute();
        };
      })).then(_this.evaluateResults);
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
    (0, _defineProperty2.default)(this, "stop", function (status) {
      Runner.cleanup();

      if (_this.browser) {
        _this.browser.close().then(function () {
          return (0, _process.exitProcess)(status);
        });
      }
    });
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

        _this2.browser.launch().then(_FileReader.default.getFiles).then(_FileReader.default.onFilesFound).then(_this2.executeTestSuites).catch(Runner.handleException);
      }).catch(Runner.handleException);
    }
  }], [{
    key: "cleanup",
    value: function cleanup() {
      (0, _printer.printInfo)('Performing Runner cleanup.');

      _TaskRunner.default.executePostCommand();

      _TaskRunner.default.stop(_TaskRunner.BEFORE).then(function () {
        return (0, _printer.printInfo)("".concat(_TaskRunner.BEFORE, " command has been killed."));
      }).catch(Runner.handleException);
    }
  }, {
    key: "checkTargetApplicationIsRunning",
    value: function checkTargetApplicationIsRunning() {
      var _getConfig = (0, _config.getConfig)(),
          baseUrl = _getConfig.baseUrl,
          maxRetries = _getConfig.maxRetries,
          retryTimeout = _getConfig.retryTimeout;

      return (0, _httpClient.pingEndpoint)(baseUrl, maxRetries, retryTimeout);
    }
  }]);
  return Runner;
}();

(0, _defineProperty2.default)(Runner, "handleException", function (e) {
  (0, _printer.printException)(e);
  (0, _process.exitProcess)(1);
});
var _default = Runner;
exports.default = _default;