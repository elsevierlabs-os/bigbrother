"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _TestBlock = _interopRequireDefault(require("./TestBlock"));

var _safeEval = _interopRequireDefault(require("safe-eval"));

/*
*   this represents an entire file
*
*   a single suite contains multiple blocks
* */
var TestSuite =
/*#__PURE__*/
function () {
  function TestSuite(filename, content, _browser) {
    var _this = this;

    (0, _classCallCheck2.default)(this, TestSuite);
    (0, _defineProperty2.default)(this, "createBlock", function (browser) {
      return function (key, cb) {
        var blockKey = "".concat(_this.filename, ".").concat(key);
        var block = new _TestBlock.default(blockKey, cb);

        _this.blocks.push(block);

        block.execute(browser);
      };
    });
    // this holds the content of the file
    this.content = content;
    this.filename = filename;
    this.browser = _browser;
    this.blocks = [];
  }

  (0, _createClass2.default)(TestSuite, [{
    key: "execute",
    value: function execute() {
      // safe eval content
      (0, _safeEval.default)(this.content, {
        describe: this.createBlock(this.browser)
      });
    }
  }]);
  return TestSuite;
}();

var _default = TestSuite;
exports.default = _default;