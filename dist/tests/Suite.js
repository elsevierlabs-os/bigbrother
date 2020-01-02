"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _pathutils = require("../lib/pathutils");

var _expect = _interopRequireDefault(require("../expectations/expect"));

var _PageWrapper = _interopRequireDefault(require("../page/PageWrapper"));

var _Spinner = _interopRequireDefault(require("../lib/Spinner"));

var _functions = require("../lib/functions");

var Suite =
/*#__PURE__*/
function () {
  function Suite(filename, content, browser) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Suite);
    (0, _defineProperty2.default)(this, "it",
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(title, f) {
        var asyncTest;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                asyncTest =
                /*#__PURE__*/
                function () {
                  var _ref2 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee() {
                    var success, reason, page, spinner;
                    return _regenerator.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            success = true, reason = '';

                            if (_this._beforeEach) {
                              _this._beforeEach();
                            }

                            _context.next = 4;
                            return _this.createPageWrapper(title, _this.browser);

                          case 4:
                            page = _context.sent;
                            spinner = new _Spinner.default(title);
                            _context.prev = 6;
                            _context.next = 9;
                            return f(page);

                          case 9:
                            _context.next = 11;
                            return page.close();

                          case 11:
                            spinner.complete();
                            _context.next = 19;
                            break;

                          case 14:
                            _context.prev = 14;
                            _context.t0 = _context["catch"](6);
                            success = false;
                            reason = _context.t0;
                            spinner.exception(_context.t0);

                          case 19:
                            if (_this._afterEach) {
                              _this._afterEach();
                            }

                            return _context.abrupt("return", {
                              title: title,
                              success: success,
                              reason: reason
                            });

                          case 21:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[6, 14]]);
                  }));

                  return function asyncTest() {
                    return _ref2.apply(this, arguments);
                  };
                }();

                _this.tests.push(function () {
                  return asyncTest();
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "describe", function (title, f) {
      f();

      if (_this._after && _this.root) {
        _this.root = false;

        _this._after();
      }
    });
    (0, _defineProperty2.default)(this, "before", function (f) {
      f();
    });
    (0, _defineProperty2.default)(this, "after", function (f) {
      _this._after = f;
    });
    (0, _defineProperty2.default)(this, "beforeEach", function (f) {
      _this._beforeEach = f;
    });
    (0, _defineProperty2.default)(this, "afterEach", function (f) {
      _this._afterEach = f;
    });
    this.content = content;
    this.filename = (0, _pathutils.cleanFileName)(filename);
    this.browser = browser;
    this.tests = [];
    this.root = true;
  }

  (0, _createClass2.default)(Suite, [{
    key: "createPageWrapper",
    value: function () {
      var _createPageWrapper = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(name) {
        var page;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.browser.newPage();

              case 2:
                page = _context3.sent;
                return _context3.abrupt("return", new _PageWrapper.default(page, name));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createPageWrapper(_x3) {
        return _createPageWrapper.apply(this, arguments);
      }

      return createPageWrapper;
    }()
  }, {
    key: "execute",
    value: function () {
      var _execute = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4() {
        var args, executor;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                args = {
                  'describe': this.describe,
                  'it': this.it,
                  'before': this.before,
                  'beforeEach': this.beforeEach,
                  'after': this.after,
                  'afterEach': this.afterEach,
                  'expect': _expect.default,
                  'require': require,
                  'module': module
                };
                executor = (0, _construct2.default)(Function, (0, _toConsumableArray2.default)(Object.keys(args)).concat([this.content]));
                executor.call.apply(executor, [null].concat((0, _toConsumableArray2.default)(Object.values(args))));
                _context4.next = 5;
                return (0, _functions.PromiseSerial)(this.tests);

              case 5:
                return _context4.abrupt("return", _context4.sent);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function execute() {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }]);
  return Suite;
}();

exports.default = Suite;