"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Runner = /*#__PURE__*/function () {
  function Runner() {
    (0, _classCallCheck2.default)(this, Runner);
  }

  (0, _createClass2.default)(Runner, null, [{
    key: "setup",
    value: function setup(configuration) {
      (0, _config.storeConfiguration)(configuration);
      (0, _process.onUserInterrupt)(Runner.cleanup);
    }
  }, {
    key: "ensureTargetApplicationIsRunning",
    value: function ensureTargetApplicationIsRunning() {
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

      _ProcessRunner.default.executePreCommand().then(Runner.ensureTargetApplicationIsRunning).then(Runner.execute).then(Runner.cleanup).catch(Runner.handleException);
    }
  }]);
  return Runner;
}();

(0, _defineProperty2.default)(Runner, "cleanup", function (exitCode) {
  (0, _printer.printInfo)(_constants.RUNNER_CLEANUP_MESSAGE);

  _ProcessRunner.default.executePostCommand();

  _ProcessRunner.default.stop(_ProcessRunner.BEFORE).catch(_printer.printException).finally(Runner.getTerminationHandler(exitCode));
});
(0, _defineProperty2.default)(Runner, "getTerminationHandler", function (exitCode) {
  return function () {
    (0, _printer.printInfo)(_constants.RUNNER_TERMINATION_MESSAGE);
    (0, _process.exitProcess)(exitCode === undefined ? _TestRunner.default.getFailures().length : exitCode);
  };
});
(0, _defineProperty2.default)(Runner, "execute", function () {
  var _getConfig2 = (0, _config.getConfig)(),
      main = _getConfig2.main;

  if (main) {
    return _ProcessRunner.default.executeMainCommand();
  } else {
    return _TestRunner.default.startBrowser().then(_FileReader.default.readTestFiles).then(_TestRunner.default.executeTestSuites).then(_TestRunner.default.stopBrowser).then(_ReportGenerator.default.generateReport).then(_ReportGenerator.default.openReport);
  }
});
(0, _defineProperty2.default)(Runner, "handleException", function (err) {
  (0, _printer.printException)(err);
  Runner.cleanup(0);
});
var _default = Runner;
exports.default = _default;