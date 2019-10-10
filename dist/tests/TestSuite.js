"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _TestBlock = _interopRequireDefault(require("./TestBlock"));

var _safeEval = _interopRequireDefault(require("../lib/safeEval"));

var _path = _interopRequireDefault(require("path"));

var _pathutils = require("../lib/pathutils");

var _functions = require("../lib/functions");

/*
*   this represents an entire file
*
*   a single suite contains multiple blocks
*
*   one single testsuite instead of test, testsuite and testblock
*
*   wrap everything in a function, inject describe, it, afterEach, after, before, beforeEach
*
*   after this evaluate the function.
*
* */
var TestSuite =
/*#__PURE__*/
function () {
  function TestSuite(filename, content, browser) {
    var _this = this;

    (0, _classCallCheck2.default)(this, TestSuite);
    (0, _defineProperty2.default)(this, "createBlock",
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(key, cb) {
        var blockKey, block;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                blockKey = "".concat(_this.filename, ".").concat(key);
                block = new _TestBlock.default(blockKey, cb);

                _this.blocks.push(block);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    // this holds the content of the file
    this.content = content;
    this.filename = (0, _pathutils.cleanFileName)(filename);
    this.browser = browser;
    this.blocks = [];
  }

  (0, _createClass2.default)(TestSuite, [{
    key: "execute",
    value: function () {
      var _execute = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var _this2 = this;

        var executor;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // safe eval content
                // if (!process.browser) {
                //     const cwd = process.cwd();
                //     console.log(cwd);
                //     module.paths.push(cwd);
                //     module.paths.push(path.resolve('./'));
                //     console.log(module.paths);
                //     console.log(require.cache);
                // }
                // safeEval(this.content, {
                //     describe: this.createBlock,
                //     require,
                //     module
                // });
                executor = new Function('describe', 'require', 'module', this.content);
                console.log(executor.toString());
                executor.call(null, this.createBlock, require, module);
                _context2.next = 5;
                return (0, _functions.PromiseSerial)(this.blocks.map(function (b) {
                  return function () {
                    return b.execute(_this2.browser);
                  };
                }));

              case 5:
                return _context2.abrupt("return", this.blocks);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function execute() {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }]);
  return TestSuite;
}();

var _default = TestSuite;
exports.default = _default;