"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _path = _interopRequireDefault(require("path"));

var Browser =
/*#__PURE__*/
function () {
  function Browser() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$headless = _ref.headless,
        headless = _ref$headless === void 0 ? true : _ref$headless,
        _ref$cacheEnabled = _ref.cacheEnabled,
        cacheEnabled = _ref$cacheEnabled === void 0 ? false : _ref$cacheEnabled;

    (0, _classCallCheck2["default"])(this, Browser);
    this.browser = null;
    this.puppeteerOptions = {
      headless: headless
    };
    this.pageOptions = {
      cacheEnabled: cacheEnabled
    };
    this.pages = [];
  }

  (0, _createClass2["default"])(Browser, [{
    key: "storePage",
    value: function storePage(key, page) {
      // we should use a key value map
      // to store pages.
      // key should be the name of the single scenario.
      this.pages.push(page);
    }
  }, {
    key: "closePage",
    value: function closePage(key) {// we get the page using the key
      // we remove the page from the list
      // after closing it.
    }
  }, {
    key: "newPage",
    value: function () {
      var _newPage = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var page;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.browser.newPage();

              case 2:
                page = _context.sent;
                page.setCacheEnabled(this.pageOptions.cacheEnabled);
                this.storePage('', page);
                return _context.abrupt("return", page);

              case 6:
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
      var _launch = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _puppeteer["default"].launch(this.puppeteerOptions);

              case 2:
                this.browser = _context2.sent;
                return _context2.abrupt("return", this.browser);

              case 4:
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
      var _close = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.browser) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 3;
                return this.browser.close();

              case 3:
                this.browser = null;

              case 4:
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
exports["default"] = _default;