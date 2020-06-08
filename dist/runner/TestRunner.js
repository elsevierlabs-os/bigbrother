"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ = require("..");

var _Browser = _interopRequireDefault(require("../browser/Browser"));

var _config = require("../config");

var _Suite = _interopRequireDefault(require("../tests/Suite"));

var _functions = require("../lib/functions");

var _printer = require("../lib/printer");

var _constants = require("../lib/constants");

var TestRunner = /*#__PURE__*/function () {
  function TestRunner() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, TestRunner);
    (0, _defineProperty2["default"])(this, "startBrowser", function () {
      (0, _.printInfo)(_constants.BROWSER_STARTING_MESSAGE);
      _this.browser = new _Browser["default"]((0, _config.getConfig)());
      return _this.browser.launch();
    });
    (0, _defineProperty2["default"])(this, "stopBrowser", function () {
      if (_this.hasBrowser()) {
        return _this.browser.close();
      }

      return Promise.reject(_constants.BROWSER_NOT_INITIALISED);
    });
    (0, _defineProperty2["default"])(this, "mapTestToNewSuite", function (_ref) {
      var filename = _ref.filename,
          content = _ref.content;
      return new _Suite["default"](content, _this.browser);
    });
    (0, _defineProperty2["default"])(this, "mapSuitesToExecution", function (suite) {
      return function () {
        return suite.execute();
      };
    });
    (0, _defineProperty2["default"])(this, "mapTestsToPromises", function (tests) {
      return tests.map(_this.mapTestToNewSuite).map(_this.mapSuitesToExecution);
    });
    (0, _defineProperty2["default"])(this, "executeTestSuites", function () {
      var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return (0, _functions.PromiseSerial)(_this.mapTestsToPromises(tests)).then(_this.evaluateResults);
    });
    (0, _defineProperty2["default"])(this, "isFailedTest", function (_ref2) {
      var success = _ref2.success;
      return !success;
    });
    (0, _defineProperty2["default"])(this, "extractFailuresFromSuites", function () {
      return _this.suites.reduce(function (total, suite) {
        return [].concat((0, _toConsumableArray2["default"])(total), (0, _toConsumableArray2["default"])(suite.filter(_this.isFailedTest)));
      }, []);
    });
    (0, _defineProperty2["default"])(this, "evaluateResults", function () {
      var suites = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      _this.suites = suites;
      _this.failures = _this.extractFailuresFromSuites();
      var failuresCount = _this.failures.length;
      var suitesCount = suites.length;
      (0, _printer.printDelimiter)();

      if (failuresCount > 0) {
        (0, _printer.printRunnerFailure)(suitesCount, failuresCount);

        _this.printFailures();
      } else {
        (0, _printer.printRunnerSuccess)(suitesCount);
      }
    });
    (0, _defineProperty2["default"])(this, "printFailures", function () {
      (0, _.printNewLines)();

      _this.getFailures().forEach(function (_ref3) {
        var name = _ref3.name,
            reason = _ref3.reason;
        (0, _printer.printTitleTest)(name);
        (0, _printer.printFailedTest)(reason.message);
        (0, _.printNewLines)(1);
      });
    });
    this.failures = [];
    this.suites = [];
    this.browser = null;
  }

  (0, _createClass2["default"])(TestRunner, [{
    key: "hasBrowser",
    value: function hasBrowser() {
      return !!this.browser;
    }
  }, {
    key: "getFailures",
    value: function getFailures() {
      return this.failures;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        suites: this.suites,
        failures: this.failures
      };
    }
  }]);
  return TestRunner;
}();

var _default = new TestRunner();

exports["default"] = _default;