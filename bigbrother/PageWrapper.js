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

var _objectutils = require("./lib/objectutils");

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
          _args = arguments;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref2$cpu = _ref2.cpu, cpu = _ref2$cpu === void 0 ? _constants.CPU.DEFAULT : _ref2$cpu, _ref2$network = _ref2.network, network = _ref2$network === void 0 ? _constants.NETWORK.WIFI : _ref2$network;
              _context.next = 3;
              return _this.page.target().createCDPSession();

            case 3:
              _this.client = _context.sent;
              _this.options.cpu = cpu;
              _this.options.network = network;

              _this.setNetworkConditions();

              _this.setCpuConditions();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    (0, _defineProperty2.default)(this, "storeMeasurement", function (data) {
      (0, _objectutils.deepSet)(data.key, data, _this.measurements);
    });
    (0, _defineProperty2.default)(this, "_load", function (url) {
      return (
        /*#__PURE__*/
        (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee2() {
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this.page.goto(url);

                case 2:
                  return _context2.abrupt("return", _context2.sent);

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))
      );
    });
    (0, _defineProperty2.default)(this, "_click", function (selector, options) {
      return (
        /*#__PURE__*/
        (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee3() {
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _this.page.click(selector, options);

                case 2:
                  return _context3.abrupt("return", _context3.sent);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }))
      );
    });
    (0, _defineProperty2.default)(this, "_focus", function (selector) {
      return (
        /*#__PURE__*/
        (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee4() {
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _this.page.focus(selector);

                case 2:
                  return _context4.abrupt("return", _context4.sent);

                case 3:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }))
      );
    });
    this.options = {};
    this.page = page;
    this.testKey = testKey;
    this.measurements = {};

    if (!this.page) {
      throw new Error('PageWrapper requires a puppeteer Page');
    }
  }

  (0, _createClass2.default)(PageWrapper, [{
    key: "close",
    value: function () {
      var _close = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.hasPage()) {
                  _context5.next = 3;
                  break;
                }

                _context5.next = 3;
                return this.page.close();

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function close() {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: "setNetworkConditions",
    value: function setNetworkConditions() {
      if (this.client) {
        return this.client.send(_constants.NETWORK_CONDITIONS_MESSAGE, this.network());
      }
    }
  }, {
    key: "setCpuConditions",
    value: function setCpuConditions() {
      if (this.client) {
        return this.client.send(_constants.CPU_CONDITIONS_MESSAGE, this.cpu());
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
    key: "getKey",
    value: function getKey(key) {
      return "".concat(this.testKey, ".").concat(key);
    }
  }, {
    key: "load",
    value: function () {
      var _load = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7(url) {
        var _this2 = this;

        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref6 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee6(resolve, reject) {
                    var data;
                    return _regenerator.default.wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            if (!(_this2.hasPage() && url)) {
                              _context6.next = 9;
                              break;
                            }

                            _this2.options.url = url;
                            _context6.next = 4;
                            return _PerformanceAnalyzer.default.measure(_this2.getKey('load'), _this2._load(url));

                          case 4:
                            data = _context6.sent;

                            _this2.storeMeasurement(data);

                            resolve(data.duration);
                            _context6.next = 10;
                            break;

                          case 9:
                            reject('Page has not been initialised.');

                          case 10:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));

                  return function (_x2, _x3) {
                    return _ref6.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
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
      _regenerator.default.mark(function _callee9(selector) {
        var _this3 = this;

        var options,
            _args9 = arguments;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
                return _context9.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref7 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee8(resolve, reject) {
                    var data;
                    return _regenerator.default.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            if (!_this3.hasPage()) {
                              _context8.next = 8;
                              break;
                            }

                            _context8.next = 3;
                            return _PerformanceAnalyzer.default.measure(_this3.getKey('click'), _this3._click(selector, options));

                          case 3:
                            data = _context8.sent;

                            _this3.storeMeasurement(data);

                            resolve(data.duration);
                            _context8.next = 9;
                            break;

                          case 8:
                            reject('Page has not been initialised.');

                          case 9:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8);
                  }));

                  return function (_x5, _x6) {
                    return _ref7.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function click(_x4) {
        return _click.apply(this, arguments);
      }

      return click;
    }()
  }, {
    key: "focus",
    value: function () {
      var _focus = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee11(selector) {
        var _this4 = this;

        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref8 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee10(resolve, reject) {
                    var data;
                    return _regenerator.default.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            if (!_this4.hasPage()) {
                              _context10.next = 8;
                              break;
                            }

                            _context10.next = 3;
                            return _PerformanceAnalyzer.default.measure(_this4.getKey('focus'), _this4._focus(selector));

                          case 3:
                            data = _context10.sent;

                            _this4.storeMeasurement(data);

                            resolve(data.duration);
                            _context10.next = 9;
                            break;

                          case 8:
                            reject('Page has not been initialised.');

                          case 9:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10);
                  }));

                  return function (_x8, _x9) {
                    return _ref8.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function focus(_x7) {
        return _focus.apply(this, arguments);
      }

      return focus;
    }()
  }, {
    key: "tap",
    value: function () {
      var _tap = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee12(select) {
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function tap(_x10) {
        return _tap.apply(this, arguments);
      }

      return tap;
    }()
  }, {
    key: "setUserAgent",
    value: function () {
      var _setUserAgent = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee13(userAgent) {
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function setUserAgent(_x11) {
        return _setUserAgent.apply(this, arguments);
      }

      return setUserAgent;
    }()
  }, {
    key: "type",
    value: function () {
      var _type = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee14(selector, text) {
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function type(_x12, _x13) {
        return _type.apply(this, arguments);
      }

      return type;
    }()
  }, {
    key: "keyboard",
    value: function () {
      var _keyboard = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee15(event) {
        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      function keyboard(_x14) {
        return _keyboard.apply(this, arguments);
      }

      return keyboard;
    }()
  }, {
    key: "screenshot",
    value: function () {
      var _screenshot = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee16() {
        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
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
      _regenerator.default.mark(function _callee17(selector) {
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }));

      function waitFor(_x15) {
        return _waitFor.apply(this, arguments);
      }

      return waitFor;
    }()
  }, {
    key: "toJSON",
    value: function toJSON() {
      return JSON.stringify(this.measurements, null, 4);
    }
  }]);
  return PageWrapper;
}();

var _default = PageWrapper;
exports.default = _default;