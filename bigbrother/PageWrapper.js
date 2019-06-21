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

var _constants = require("./constants");

var _PerformanceAnalyzer = _interopRequireDefault(require("./PerformanceAnalyzer"));

var PageWrapper =
/*#__PURE__*/
function () {
  function PageWrapper(page, testKey) {
    var _this = this;

    (0, _classCallCheck2.default)(this, PageWrapper);
    (0, _defineProperty2.default)(this, "setConditions",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var _ref2,
          _ref2$cpu,
          cpu,
          _ref2$network,
          network,
          client,
          _args = arguments;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref2$cpu = _ref2.cpu, cpu = _ref2$cpu === void 0 ? _constants.CPU.DEFAULT : _ref2$cpu, _ref2$network = _ref2.network, network = _ref2$network === void 0 ? _constants.NETWORK.WIFI : _ref2$network;
              _context.next = 3;
              return _this.page.target().createCDPSession();

            case 3:
              client = _context.sent;
              _this.options.cpu = cpu;
              _this.options.network = network;

              _this.setNetworkConditions(client, _this.network());

              _this.setCpuConditions(client, _this.cpu());

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    this.options = {};
    this.page = page;
    this.testKey = testKey;

    if (!this.page) {
      throw new Error('PageWrapper requires a puppeteer Page');
    }
  }

  (0, _createClass2.default)(PageWrapper, [{
    key: "close",
    value: function () {
      var _close = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.hasPage()) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.page.close();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function close() {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: "setNetworkConditions",
    value: function setNetworkConditions(client, networkOptions) {
      if (client) {
        return client.send(_constants.NETWORK_CONDITIONS_MESSAGE, networkOptions);
      }
    }
  }, {
    key: "setCpuConditions",
    value: function setCpuConditions(client, cpuOptions) {
      if (client) {
        return client.send(_constants.CPU_CONDITIONS_MESSAGE, cpuOptions);
      }
    }
  }, {
    key: "cpu",
    value: function cpu() {
      return this.options.cpu;
    }
  }, {
    key: "network",
    value: function network() {
      return this.options.network;
    }
  }, {
    key: "hasPage",
    value: function hasPage() {
      return Boolean(this.page);
    }
  }, {
    key: "load",
    value: function () {
      var _load = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(url) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.hasPage() && url)) {
                  _context3.next = 6;
                  break;
                }

                this.options.url = url;
                _context3.next = 4;
                return this.page.goto(url);

              case 4:
                _context3.next = 7;
                break;

              case 6:
                throw new Error('PageWrapper.load(): url is missing');

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function load(_x) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "click",
    value: function () {
      var _click = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(selector) {
        var _this2 = this;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", new Promise(function (resolve, reject) {
                  if (_this2.hasPage()) {
                    var key = _PerformanceAnalyzer.default.startTracking(_this2.testKey, 'click'); // now we click on the thing and we measure perf


                    var duration = _PerformanceAnalyzer.default.stopTracking(key);

                    resolve(duration);
                  } else {
                    reject('Page has not been initialised.');
                  }
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function click(_x2) {
        return _click.apply(this, arguments);
      }

      return click;
    }()
  }, {
    key: "tap",
    value: function () {
      var _tap = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(select) {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function tap(_x3) {
        return _tap.apply(this, arguments);
      }

      return tap;
    }()
  }, {
    key: "setUserAgent",
    value: function () {
      var _setUserAgent = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(userAgent) {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function setUserAgent(_x4) {
        return _setUserAgent.apply(this, arguments);
      }

      return setUserAgent;
    }()
  }, {
    key: "type",
    value: function () {
      var _type = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7(selector, text) {
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function type(_x5, _x6) {
        return _type.apply(this, arguments);
      }

      return type;
    }()
  }, {
    key: "keyboard",
    value: function () {
      var _keyboard = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee8(event) {
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function keyboard(_x7) {
        return _keyboard.apply(this, arguments);
      }

      return keyboard;
    }()
  }, {
    key: "screenshot",
    value: function () {
      var _screenshot = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee9() {
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function screenshot() {
        return _screenshot.apply(this, arguments);
      }

      return screenshot;
    }()
  }, {
    key: "waitFor",
    value: function () {
      var _waitFor = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee10(selector) {
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function waitFor(_x8) {
        return _waitFor.apply(this, arguments);
      }

      return waitFor;
    }()
  }]);
  return PageWrapper;
}();

var _default = PageWrapper;
exports.default = _default;