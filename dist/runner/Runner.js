"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

var _ProcessRunner = _interopRequireWildcard(require("./ProcessRunner"));

var _FileReader = _interopRequireDefault(require("../lib/FileReader"));

var _config = require("../config");

var Runner =
/*#__PURE__*/
function () {
  function Runner() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, Runner);
    (0, _defineProperty2["default"])(this, "executeTestSuites", function () {
      var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var suites = tests.map(function (_ref) {
        var filename = _ref.filename,
            content = _ref.content;
        return new _Suite["default"](filename, content, _this.browser);
      });
      return (0, _functions.PromiseSerial)(suites.map(function (s) {
        return function () {
          return s.execute();
        };
      })).then(_this.evaluateResults);
    });
    (0, _defineProperty2["default"])(this, "evaluateResults", function (suites) {
      var failed = suites.reduce(function (total, suite) {
        return [].concat((0, _toConsumableArray2["default"])(total), (0, _toConsumableArray2["default"])(suite.filter(function (test) {
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

      _this.failed = failed;
    });
    (0, _defineProperty2["default"])(this, "printFailures", function (failed) {
      (0, _printer.printNewLines)();
      failed.forEach(function (test) {
        (0, _printer.printTitleTest)(test.title);
        (0, _printer.printFailedTest)(test.reason.message);
        (0, _printer.printNewLines)(1);
      });
    });
    (0, _defineProperty2["default"])(this, "cleanup", function () {
      (0, _printer.printInfo)('Performing Runner cleanup.');

      _ProcessRunner["default"].executePostCommand();

      _ProcessRunner["default"].stop(_ProcessRunner.BEFORE)["catch"](_printer.printException)["finally"](_this.terminate);
    });
    (0, _defineProperty2["default"])(this, "terminate", function () {
      (0, _printer.printInfo)('Terminating Runner.');
      (0, _process.exitProcess)(_this.failed.length);
    });
    (0, _defineProperty2["default"])(this, "startBrowser", function () {
      (0, _printer.printInfo)('Starting Browser.');
      _this.browser = new _Browser["default"]((0, _config.getConfig)());
      return _this.browser.launch();
    });
    (0, _defineProperty2["default"])(this, "stop", function () {
      if (_this.browser) {
        return _this.browser.close();
      }

      return Promise.resolve();
    });
    this.browser = null;
    this.suites = [];
    this.failed = [];
  }

  (0, _createClass2["default"])(Runner, [{
    key: "setup",
    value: function setup(configuration) {
      (0, _config.storeConfiguration)(configuration);
      (0, _process.onUserInterrupt)(this.stop);

      _ProcessRunner["default"].executePreCommand();
    }
  }, {
    key: "start",
    value: function start(config) {
      (0, _printer.printInfo)('Starting Runner.');
      this.setup(config);
      (0, _printer.printBigBrother)();
      Runner.checkTargetApplicationIsRunning().then(this.startBrowser).then(_FileReader["default"].readFiles).then(this.executeTestSuites).then(this.stop)["catch"](_printer.printException)["finally"](this.cleanup);
    }
  }], [{
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

var _default = Runner;
exports["default"] = _default;