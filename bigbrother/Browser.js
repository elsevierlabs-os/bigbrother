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

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _path = _interopRequireDefault(require("path"));

var Browser =
/*#__PURE__*/
function () {
  // Browser is created by bigbrother, sending env flags
  function Browser() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$headless = _ref.headless,
        headless = _ref$headless === void 0 ? true : _ref$headless,
        _ref$cacheEnabled = _ref.cacheEnabled,
        cacheEnabled = _ref$cacheEnabled === void 0 ? false : _ref$cacheEnabled;

    (0, _classCallCheck2.default)(this, Browser);
    (0, _defineProperty2.default)(this, "onTargetChanged", function (target) {
      _this.target = target;
    });
    (0, _defineProperty2.default)(this, "hasTarget", function () {
      return !!_this.target;
    });
    (0, _defineProperty2.default)(this, "setConditions",
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(pageWrapper) {
        var page;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this.hasTarget()) {
                  _context.next = 9;
                  break;
                }

                _context.next = 3;
                return _this.target.page();

              case 3:
                page = _context.sent;

                if (!(page && page.target().url() === pageWrapper.url())) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return page.target().createCDPSession().then(function (client) {
                  _this.setNetworkConditions(client, pageWrapper.network());

                  _this.setCpuConditions(client, pageWrapper.cpu());
                }).catch(function (err) {
                  return console.error(err);
                });

              case 7:
                _context.next = 10;
                break;

              case 9:
                throw new Error('Browser need a target to set proper conditions');

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
    this.browser = null;
    this.puppeteerOptions = {
      headless: headless // executablePath: path.resolve('./node_modules/puppeteer/.local-chromium/mac-662092')

    };
    this.pageOptions = {
      cacheEnabled: cacheEnabled
    };
    this.pages = []; // constants

    this.TARGET_CHANGED_EVENT = 'targetchanged';
    this.NETWORK_CONDITIONS_MESSAGE = 'Network.emulateNetworkConditions';
    this.CPU_CONDITIONS_MESSAGE = 'Emulation.setCPUThrottlingRate';
    this.NAVIGATION_INFO_TYPE = 'navigation';
    this.PAINT_INFO_TYPE = 'paint';
  }

  (0, _createClass2.default)(Browser, [{
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
      var _newPage = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var page;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.browser.newPage();

              case 2:
                page = _context2.sent;
                page.setCacheEnabled(this.pageOptions.cacheEnabled);
                this.storePage('', page);
                return _context2.abrupt("return", page);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function newPage() {
        return _newPage.apply(this, arguments);
      }

      return newPage;
    }()
  }, {
    key: "setNetworkConditions",
    value: function setNetworkConditions(client, networkOptions) {
      if (client) {
        return client.send(this.NETWORK_CONDITIONS_MESSAGE, networkOptions);
      }
    }
  }, {
    key: "setCpuConditions",
    value: function setCpuConditions(client, cpuOptions) {
      if (client) {
        return client.send(this.CPU_CONDITIONS_MESSAGE, cpuOptions);
      }
    }
  }, {
    key: "launch",
    value: function () {
      var _launch = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _puppeteer.default.launch(this.puppeteerOptions);

              case 2:
                this.browser = _context3.sent;
                this.browser.on(this.TARGET_CHANGED_EVENT, this.onTargetChanged);
                return _context3.abrupt("return", this.browser);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function launch() {
        return _launch.apply(this, arguments);
      }

      return launch;
    }()
  }, {
    key: "close",
    value: function close() {
      if (this.browser) {
        this.browser.close();
        this.browser = null;
      }
    }
  }]);
  return Browser;
}();

var _default = Browser;
exports.default = _default;