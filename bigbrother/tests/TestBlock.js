"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Test = _interopRequireDefault(require("./Test"));

var _safeEval = _interopRequireDefault(require("safe-eval"));

/*
*  This represents a single Describe block
*
*  it and describe will be injected into the callback
*
* */
var TestBlock =
/*#__PURE__*/
function () {
  function TestBlock(_block, _cb) {
    var _this = this;

    (0, _classCallCheck2.default)(this, TestBlock);
    (0, _defineProperty2.default)(this, "createBlock", function (browser) {
      return function (key, cb) {
        var blockKey = "".concat(_this.block, ".").concat(key);
        var block = new TestBlock(blockKey, cb);

        _this.blocks.push(block);

        block.execute(browser);
      };
    });
    (0, _defineProperty2.default)(this, "createTest", function (key, cb) {
      // this is for it calls
      var testKey = "".concat(_this.block, ".").concat(key);
      var test = new _Test.default(testKey, cb, _this.block);

      _this.tests.push(test);
    });
    (0, _defineProperty2.default)(this, "beforeEach", function (cb) {
      _this._beforeEach = cb;
    });
    // this is the name of the block where we are
    this.block = _block;
    this.blocks = [];
    this.tests = [];
    this.cb = _cb; // storing before / after / afterEach / beforeEach callbacks

    this._before = function (f) {
      return f;
    };

    this._after = function (f) {
      return f;
    };

    this._beforeEach = function (f) {
      return f;
    };

    this._afterEach = function (f) {
      return f;
    };
  }

  (0, _createClass2.default)(TestBlock, [{
    key: "execute",
    value: function execute(browser) {
      var _this2 = this;

      // this should inject the right it inside the test
      // it should also create the test
      // executing callback
      var executor = new Function('it', 'describe', 'beforeEach', "(".concat(this.cb.toString(), ")()"));
      executor(this.createTest, this.createBlock(browser), this.beforeEach); // const block = safeEval(this.cb.toString(), {
      //     it: this.createTest,
      //     describe: this.createBlock(browser)
      // });
      // console.log('after saf eval', block);
      // when callback is done, it means we can call each test in our tests list

      this._before();

      this.tests.forEach(function (test) {
        _this2._beforeEach();

        test.execute(browser);

        _this2._afterEach();
      });

      this._after();
    }
  }]);
  return TestBlock;
}();

var _default = TestBlock;
exports.default = _default;