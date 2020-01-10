"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _path = require("../lib/utils/path");

var _expect = _interopRequireDefault(require("../expectations/expect"));

var _PageWrapper = _interopRequireDefault(require("../page/PageWrapper"));

var _Spinner = _interopRequireDefault(require("../lib/Spinner"));

var _functions = require("../lib/functions");

var _constants = require("../lib/constants");

var _config = require("../config");

var _module = require("../lib/utils/module");

var Suite =
/*#__PURE__*/
function () {
  function Suite(filename, content, browser) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, Suite);
    (0, _defineProperty2["default"])(this, "formatName", function (n) {
      return n.replace(_constants.ALL_SPACES, _constants.UNDERSCORE);
    });
    (0, _defineProperty2["default"])(this, "getFullPageName", function (name) {
      return _this.names.map(_this.formatName).join(_constants.FULL_STOP).concat(_constants.FULL_STOP).concat(_this.formatName(name));
    });
    (0, _defineProperty2["default"])(this, "it", function (name, f) {
      var pageName = _this.getFullPageName(name);

      var asyncTest =
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee() {
          var success, reason, page, spinner;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  success = true, reason = '';

                  if (_this._beforeEach) {
                    _this._beforeEach();
                  }

                  _context.next = 4;
                  return _this.createPageWrapper(pageName);

                case 4:
                  page = _context.sent;
                  spinner = new _Spinner["default"](name);
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
                    name: name,
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
          return _ref.apply(this, arguments);
        };
      }();

      _this.tests.push(function () {
        return asyncTest();
      });
    });
    (0, _defineProperty2["default"])(this, "describe", function (name, f) {
      if (_this.root) {
        _this.rootname = name;
        _this.root = false;

        _this.names.push(name);

        if (_this._before) _this._before();
        f();
        if (_this._after) _this._after();
      } else {
        _this.names.push(name);

        f();

        _this.names.pop();
      }
    });
    (0, _defineProperty2["default"])(this, "before", function (f) {
      return _this._before = f;
    });
    (0, _defineProperty2["default"])(this, "after", function (f) {
      return _this._after = f;
    });
    (0, _defineProperty2["default"])(this, "beforeEach", function (f) {
      return _this._beforeEach = f;
    });
    (0, _defineProperty2["default"])(this, "afterEach", function (f) {
      return _this._afterEach = f;
    });
    this.content = content;
    this.filename = (0, _path.cleanFileName)(filename);
    this.browser = browser;
    this.tests = [];
    this.names = [];
    this.rootname = '';
    this.root = true;
  }

  (0, _createClass2["default"])(Suite, [{
    key: "createPageWrapper",
    value: function () {
      var _createPageWrapper = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(name) {
        var page;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.browser.newPage();

              case 2:
                page = _context2.sent;
                return _context2.abrupt("return", new _PageWrapper["default"](page, name));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createPageWrapper(_x) {
        return _createPageWrapper.apply(this, arguments);
      }

      return createPageWrapper;
    }()
  }, {
    key: "execute",
    value: function () {
      var _execute = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var _getConfig, cwd, args, executor;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _getConfig = (0, _config.getConfig)(), cwd = _getConfig.cwd;
                (0, _module.appendNodeModulesPathToModule)(module, cwd);
                args = {
                  'describe': this.describe,
                  'it': this.it,
                  'before': this.before,
                  'beforeEach': this.beforeEach,
                  'after': this.after,
                  'afterEach': this.afterEach,
                  'expect': _expect["default"],
                  'require': require,
                  'module': module
                };
                executor = (0, _construct2["default"])(Function, (0, _toConsumableArray2["default"])(Object.keys(args)).concat([this.content]));
                executor.call.apply(executor, [null].concat((0, _toConsumableArray2["default"])(Object.values(args))));
                _context3.next = 7;
                return (0, _functions.PromiseSerial)(this.tests);

              case 7:
                return _context3.abrupt("return", _context3.sent);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function execute() {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }]);
  return Suite;
}();

exports["default"] = Suite;