"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _glob = _interopRequireDefault(require("glob"));

var _fs = _interopRequireDefault(require("fs"));

require("colors");

var _constants = require("./constants");

var _TestSuite = _interopRequireDefault(require("./tests/TestSuite"));

var _Browser = _interopRequireDefault(require("./Browser"));

var _functions = require("./lib/functions");

var _PerformanceAnalyzer = _interopRequireDefault(require("./PerformanceAnalyzer"));

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
        return new _TestSuite.default(filename, content, _this.browser);
      });
      (0, _functions.PromiseSerial)(_this.suites.map(function (s) {
        return function () {
          return s.execute();
        };
      })).then(_this.evaluateResults).catch(console.log);
    });
    (0, _defineProperty2.default)(this, "onFilesFound", function (err) {
      var files = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (err) {
        console.log(err);
        process.exit(1);
      }

      if (!files.length) {
        console.log(_constants.PATTERN_DOESNT_MATCH_ERROR.red, _this.pattern);
        process.exit(1);
      }

      var tests = files.map(_this.readFile);

      _this.executeTestSuites(tests);
    });
    (0, _defineProperty2.default)(this, "evaluateResults", function (suites) {
      var message = "Done running ".concat(suites.length, " suites").green;
      console.log(message); // console.log(performanceAnalyzer.toJSON());

      _this.stop();
    });
    this.pattern = pattern;
    this.browser = null;
    this.suites = [];
  }

  (0, _createClass2.default)(Runner, [{
    key: "start",
    value: function start(browserOptions) {
      var _this2 = this;

      this.browser = new _Browser.default(browserOptions);
      this.browser.launch().then(function () {
        return (0, _glob.default)(_this2.pattern, {}, _this2.onFilesFound);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.browser.close().then(function () {
        return process.exit(0);
      });
    }
  }]);
  return Runner;
}();

var _default = Runner;
exports.default = _default;