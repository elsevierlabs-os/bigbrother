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

var PageWrapper =
/*#__PURE__*/
function () {
  function PageWrapper(page) {
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
    this.NETWORK_CONDITIONS_MESSAGE = 'Network.emulateNetworkConditions';
    this.CPU_CONDITIONS_MESSAGE = 'Emulation.setCPUThrottlingRate';

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
                    var now = +new Date(); // now we click on the thing and we measure perf

                    var end = +new Date();
                    resolve(end - now);
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
  }]);
  return PageWrapper;
}();

var _default = PageWrapper;
exports.default = _default;