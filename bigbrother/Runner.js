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

var _safeEval = _interopRequireDefault(require("safe-eval"));

var _constants = require("./constants");

var _TestSuite = _interopRequireDefault(require("./tests/TestSuite"));

var _Browser = _interopRequireDefault(require("./Browser"));

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
    (0, _defineProperty2.default)(this, "executeTestSuites", function (_ref) {
      var filename = _ref.filename,
          content = _ref.content;
      var suite = new _TestSuite.default(filename, content, _this.browser);

      _this.suites.push(suite);

      suite.execute();
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

      files.map(_this.readFile).map(_this.executeTestSuites);
    });
    this.pattern = pattern;
    this.browser = null;
    this.suites = [];
  }

  (0, _createClass2.default)(Runner, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.browser = new _Browser.default({
        headless: false
      });
      this.browser.launch().then(function () {
        return (0, _glob.default)(_this2.pattern, {}, _this2.onFilesFound);
      });
    }
  }]);
  return Runner;
}();

var _default = Runner;
exports.default = _default;