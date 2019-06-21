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
      return (
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
                    blockKey = "".concat(_this.block, ".").concat(key);
                    block = new TestBlock(blockKey, cb);

                    _this.blocks.push(block);

                    _context.next = 5;
                    return block.execute(browser);

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }()
      );
    });
    (0, _defineProperty2.default)(this, "createTest", function (key, cb) {
      // this is for it calls
      var testKey = "".concat(_this.block, ".").concat(key);
      var test = new _Test.default(testKey, cb, key);

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
    value: function () {
      var _execute = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(browser) {
        var _this2 = this;

        var executor, promises;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // this should inject the right it inside the test
                // it should also create the test
                // executing callback
                executor = new Function('it', 'describe', 'beforeEach', "(".concat(this.cb.toString(), ")()"));
                executor(this.createTest, this.createBlock(browser), this.beforeEach);
                promises = this.tests.map(
                /*#__PURE__*/
                function () {
                  var _ref2 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee2(test) {
                    var output;
                    return _regenerator.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _this2._beforeEach();

                            _context2.next = 3;
                            return test.execute(browser);

                          case 3:
                            output = _context2.sent;

                            _this2._afterEach();

                            return _context2.abrupt("return", output);

                          case 6:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x4) {
                    return _ref2.apply(this, arguments);
                  };
                }());

                this._before();

                _context3.next = 6;
                return Promise.all(promises);

              case 6:
                this._after();

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function execute(_x3) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }]);
  return TestBlock;
}();

var _default = TestBlock;
exports.default = _default;