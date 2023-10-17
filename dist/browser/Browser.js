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
var _puppeteer = _interopRequireDefault(require("puppeteer"));
var _printer = require("../lib/printer");
var _constants = require("../lib/constants");
var _config = require("../config");
var Browser = /*#__PURE__*/function () {
  function Browser() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$headless = _ref.headless,
      headless = _ref$headless === void 0 ? true : _ref$headless,
      _ref$cacheEnabled = _ref.cacheEnabled,
      cacheEnabled = _ref$cacheEnabled === void 0 ? false : _ref$cacheEnabled;
    (0, _classCallCheck2.default)(this, Browser);
    this.browser = null;
    this.puppeteerOptions = {
      headless: headless,
      args: (0, _config.getConfig)().puppeteerArgs
    };
    this.pageOptions = {
      cacheEnabled: cacheEnabled
    };
    this.hasLaunched = false;
    this.pages = [];
  }
  (0, _createClass2.default)(Browser, [{
    key: "newPage",
    value: function () {
      var _newPage = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var page;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.hasLaunched) {
                  _context.next = 8;
                  break;
                }
                _context.next = 3;
                return this.browser.newPage();
              case 3:
                page = _context.sent;
                page.setCacheEnabled(this.pageOptions.cacheEnabled);
                return _context.abrupt("return", page);
              case 8:
                (0, _printer.printWarning)(_constants.BROWSER_CANT_OPEN_PAGE_MESSAGE);
              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function newPage() {
        return _newPage.apply(this, arguments);
      }
      return newPage;
    }()
  }, {
    key: "launch",
    value: function () {
      var _launch = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _printer.printInfo)('Current PuppeterOptions: ', this.puppeteerOptions);
                _context2.next = 3;
                return _puppeteer.default.launch(this.puppeteerOptions);
              case 3:
                this.browser = _context2.sent;
                this.hasLaunched = true;
                return _context2.abrupt("return", this.browser);
              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function launch() {
        return _launch.apply(this, arguments);
      }
      return launch;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.hasLaunched) {
                  _context3.next = 6;
                  break;
                }
                _context3.next = 3;
                return this.browser.close();
              case 3:
                this.browser = null;
                _context3.next = 7;
                break;
              case 6:
                (0, _printer.printWarning)(_constants.BROWSER_CANT_CLOSE_MESSAGE);
              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function close() {
        return _close.apply(this, arguments);
      }
      return close;
    }()
  }]);
  return Browser;
}();
var _default = Browser;
exports.default = _default;