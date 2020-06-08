"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _httpClient = require("../lib/httpClient");

var _printer = require("../lib/printer");

var _process = require("../lib/utils/process");

var _ProcessRunner = _interopRequireWildcard(require("./ProcessRunner"));

var _TestRunner = _interopRequireDefault(require("./TestRunner"));

var _FileReader = _interopRequireDefault(require("../lib/FileReader"));

var _ReportGenerator = _interopRequireDefault(require("../reports/ReportGenerator"));

var _config = require("../config");

var _constants = require("../lib/constants");

var Runner = /*#__PURE__*/function () {
  function Runner() {
    (0, _classCallCheck2["default"])(this, Runner);
  }

  (0, _createClass2["default"])(Runner, null, [{
    key: "setup",
    value: function setup(configuration) {
      (0, _config.storeConfiguration)(configuration);
      (0, _process.onUserInterrupt)(Runner.stop);

      _ProcessRunner["default"].executePreCommand();
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
  }, {
    key: "start",
    value: function start(config) {
      (0, _printer.printInfo)(_constants.RUNNER_STARTING_MESSAGE);
      Runner.setup(config);
      (0, _printer.printBigBrother)();
      Runner.checkTargetApplicationIsRunning().then(_TestRunner["default"].startBrowser).then(_FileReader["default"].readTestFiles).then(_TestRunner["default"].executeTestSuites).then(Runner.stop).then(_ReportGenerator["default"].generateReport)["catch"](_printer.printException)["finally"](Runner.cleanup);
    }
  }]);
  return Runner;
}();

(0, _defineProperty2["default"])(Runner, "cleanup", function () {
  (0, _printer.printInfo)(_constants.RUNNER_CLEANUP_MESSAGE);

  _ProcessRunner["default"].executePostCommand();

  _ProcessRunner["default"].stop(_ProcessRunner.BEFORE)["catch"](_printer.printException)["finally"](Runner.terminate);
});
(0, _defineProperty2["default"])(Runner, "terminate", function () {
  (0, _printer.printInfo)(_constants.RUNNER_TERMINATION_MESSAGE);

  _ReportGenerator["default"].openReport();

  (0, _process.exitProcess)(_TestRunner["default"].getFailures().length);
});
(0, _defineProperty2["default"])(Runner, "stop", function () {
  return _TestRunner["default"].stopBrowser();
});
var _default = Runner;
exports["default"] = _default;