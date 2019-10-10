"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _constants = require("./constants");

var _PerformanceAnalyzer = _interopRequireDefault(require("./PerformanceAnalyzer"));

var _objectutils = require("./lib/objectutils");

var _AssetsHandler = _interopRequireDefault(require("./AssetsHandler"));

var PageWrapper =
/*#__PURE__*/
function () {
  function PageWrapper(page, testKey) {
    var _this = this;

    (0, _classCallCheck2.default)(this, PageWrapper);
    (0, _defineProperty2.default)(this, "createCDPSession",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.page.target().createCDPSession();

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    (0, _defineProperty2.default)(this, "cpu", function () {
      return _this.options.cpu;
    });
    (0, _defineProperty2.default)(this, "network", function () {
      return _this.options.network;
    });
    (0, _defineProperty2.default)(this, "storeMeasurement", function (data) {
      (0, _objectutils.deepSet)(data.key, data, _this.measurements);
    });
    (0, _defineProperty2.default)(this, "clearAssets", function () {
      return _this.assetsHandler.reset();
    });
    (0, _defineProperty2.default)(this, "clearResponses", function () {
      return _this.responses = {};
    });
    (0, _defineProperty2.default)(this, "storeAsset", function (url, asset) {
      return _this.assetsHandler.store(url, asset);
    });
    (0, _defineProperty2.default)(this, "storeResponse", function (id, response) {
      return _this.responses[id] = response;
    });
    (0, _defineProperty2.default)(this, "handleNetworkResponseReceived", function (_ref2) {
      var response = _ref2.response,
          requestId = _ref2.requestId;
      return _this.storeResponse(requestId, response);
    });
    (0, _defineProperty2.default)(this, "handleNetworkDataReceived", function (_ref3) {
      var requestId = _ref3.requestId,
          encodedDataLength = _ref3.encodedDataLength,
          dataLength = _ref3.dataLength,
          rest = (0, _objectWithoutProperties2.default)(_ref3, ["requestId", "encodedDataLength", "dataLength"]);
      var _this$responses$reque = _this.responses[requestId],
          url = _this$responses$reque.url,
          mimeType = _this$responses$reque.mimeType;

      var isAssetData = _constants.NETWORK_ASSETS_MIMETYPES.map(function (type) {
        return new RegExp(type).test(mimeType);
      }).some(Boolean);

      if (!url || url.startsWith('data:') || !isAssetData) {
        return;
      }

      var asset = _this.assetsHandler.get(url)[0];

      _this.storeAsset(url, (0, _objectSpread2.default)({
        mimeType: mimeType,
        encodedLength: (asset && asset.encodedLength || 0) + encodedDataLength / 1024,
        length: (asset && asset.length || 0) + dataLength / 1024
      }, rest));
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
                  return _this.page.goto(url, _constants.PAGE_LOAD_OPTIONS);

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
    this.responses = {};
    this.assetsHandler = new _AssetsHandler.default();

    if (!this.page) {
      throw new Error(_constants.PAGEWRAPPER_MISSING_PAGE_ERROR);
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
    key: "setNetworkSpeed",
    value: function () {
      var _setNetworkSpeed = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6() {
        var network,
            client,
            _args6 = arguments;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                network = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : _constants.NETWORK.WIFI;
                _context6.next = 3;
                return this.createCDPSession();

              case 3:
                client = _context6.sent;
                _context6.next = 6;
                return client.send(_constants.NETWORK_CONDITIONS_MESSAGE, network);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function setNetworkSpeed() {
        return _setNetworkSpeed.apply(this, arguments);
      }

      return setNetworkSpeed;
    }()
  }, {
    key: "setCpuSpeed",
    value: function () {
      var _setCpuSpeed = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7() {
        var cpu,
            client,
            _args7 = arguments;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                cpu = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : _constants.CPU.DEFAULT;
                _context7.next = 3;
                return this.createCDPSession();

              case 3:
                client = _context7.sent;
                _context7.next = 6;
                return client.send(_constants.CPU_CONDITIONS_MESSAGE, cpu);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function setCpuSpeed() {
        return _setCpuSpeed.apply(this, arguments);
      }

      return setCpuSpeed;
    }()
  }, {
    key: "setSpeed",
    value: function () {
      var _setSpeed = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee8() {
        var _ref7,
            _ref7$cpu,
            cpu,
            _ref7$network,
            network,
            _args8 = arguments;

        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _ref7 = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {}, _ref7$cpu = _ref7.cpu, cpu = _ref7$cpu === void 0 ? _constants.CPU.DEFAULT : _ref7$cpu, _ref7$network = _ref7.network, network = _ref7$network === void 0 ? _constants.NETWORK.WIFI : _ref7$network;
                this.options.cpu = cpu;
                this.options.network = network;
                _context8.next = 5;
                return this.setNetworkSpeed(network);

              case 5:
                _context8.next = 7;
                return this.setCpuSpeed(cpu);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function setSpeed() {
        return _setSpeed.apply(this, arguments);
      }

      return setSpeed;
    }()
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
    key: "setupAssetsMetrics",
    value: function () {
      var _setupAssetsMetrics = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee9() {
        var client;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.clearResponses();
                this.clearAssets();
                _context9.next = 4;
                return this.createCDPSession();

              case 4:
                client = _context9.sent;
                _context9.next = 7;
                return client.send(_constants.NETWORK_ENABLE);

              case 7:
                client.on(_constants.NETWORK_RESPONSE_RECEIVED, this.handleNetworkResponseReceived);
                client.on(_constants.NETWORK_DATA_RECEIVED, this.handleNetworkDataReceived);

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function setupAssetsMetrics() {
        return _setupAssetsMetrics.apply(this, arguments);
      }

      return setupAssetsMetrics;
    }()
  }, {
    key: "getInfo",
    value: function () {
      var _getInfo = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee10(type) {
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!this.page) {
                  _context10.next = 6;
                  break;
                }

                _context10.next = 3;
                return this.page.evaluate(function (type) {
                  var entries = performance.getEntriesByType(type);

                  if (entries.length) {
                    return entries.map(function (e) {
                      return e.toJSON();
                    });
                  }
                }, type);

              case 3:
                return _context10.abrupt("return", _context10.sent);

              case 6:
                return _context10.abrupt("return", []);

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getInfo(_x) {
        return _getInfo.apply(this, arguments);
      }

      return getInfo;
    }()
  }, {
    key: "getPaintInfo",
    value: function () {
      var _getPaintInfo = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee11() {
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.getInfo(_constants.PAINT_INFO_TYPE);

              case 2:
                return _context11.abrupt("return", _context11.sent);

              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function getPaintInfo() {
        return _getPaintInfo.apply(this, arguments);
      }

      return getPaintInfo;
    }()
  }, {
    key: "getNavigationInfo",
    value: function () {
      var _getNavigationInfo = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee12() {
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.getInfo(_constants.NAVIGATION_INFO_TYPE);

              case 2:
                return _context12.abrupt("return", _context12.sent);

              case 3:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getNavigationInfo() {
        return _getNavigationInfo.apply(this, arguments);
      }

      return getNavigationInfo;
    }()
  }, {
    key: "getAssetsInfo",
    value: function () {
      var _getAssetsInfo = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee13() {
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                return _context13.abrupt("return", this.assetsHandler);

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getAssetsInfo() {
        return _getAssetsInfo.apply(this, arguments);
      }

      return getAssetsInfo;
    }()
  }, {
    key: "load",
    value: function () {
      var _load = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee15(url) {
        var _this2 = this;

        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                return _context15.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref8 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee14(resolve, reject) {
                    var data;
                    return _regenerator.default.wrap(function _callee14$(_context14) {
                      while (1) {
                        switch (_context14.prev = _context14.next) {
                          case 0:
                            if (!(_this2.hasPage() && url)) {
                              _context14.next = 11;
                              break;
                            }

                            _context14.next = 3;
                            return _this2.setupAssetsMetrics();

                          case 3:
                            _context14.next = 5;
                            return _PerformanceAnalyzer.default.measure(_this2.getKey('load'), _this2._load(url));

                          case 5:
                            data = _context14.sent;
                            _this2.options.url = url;

                            _this2.storeMeasurement(data);

                            resolve(data.duration);
                            _context14.next = 12;
                            break;

                          case 11:
                            reject(_constants.PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR);

                          case 12:
                          case "end":
                            return _context14.stop();
                        }
                      }
                    }, _callee14);
                  }));

                  return function (_x3, _x4) {
                    return _ref8.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      function load(_x2) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "click",
    value: function () {
      var _click = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee17(selector) {
        var _this3 = this;

        var options,
            _args17 = arguments;
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                options = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : {};
                return _context17.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref9 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee16(resolve, reject) {
                    var data;
                    return _regenerator.default.wrap(function _callee16$(_context16) {
                      while (1) {
                        switch (_context16.prev = _context16.next) {
                          case 0:
                            if (!_this3.hasPage()) {
                              _context16.next = 8;
                              break;
                            }

                            _context16.next = 3;
                            return _PerformanceAnalyzer.default.measure(_this3.getKey('click'), _this3._click(selector, options));

                          case 3:
                            data = _context16.sent;

                            _this3.storeMeasurement(data);

                            resolve(data.duration);
                            _context16.next = 9;
                            break;

                          case 8:
                            reject(_constants.PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR);

                          case 9:
                          case "end":
                            return _context16.stop();
                        }
                      }
                    }, _callee16);
                  }));

                  return function (_x6, _x7) {
                    return _ref9.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }));

      function click(_x5) {
        return _click.apply(this, arguments);
      }

      return click;
    }()
  }, {
    key: "focus",
    value: function () {
      var _focus = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee19(selector) {
        var _this4 = this;

        return _regenerator.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                return _context19.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref10 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee18(resolve, reject) {
                    var data;
                    return _regenerator.default.wrap(function _callee18$(_context18) {
                      while (1) {
                        switch (_context18.prev = _context18.next) {
                          case 0:
                            if (!_this4.hasPage()) {
                              _context18.next = 8;
                              break;
                            }

                            _context18.next = 3;
                            return _PerformanceAnalyzer.default.measure(_this4.getKey('focus'), _this4._focus(selector));

                          case 3:
                            data = _context18.sent;

                            _this4.storeMeasurement(data);

                            resolve(data.duration);
                            _context18.next = 9;
                            break;

                          case 8:
                            reject(_constants.PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR);

                          case 9:
                          case "end":
                            return _context18.stop();
                        }
                      }
                    }, _callee18);
                  }));

                  return function (_x9, _x10) {
                    return _ref10.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      }));

      function focus(_x8) {
        return _focus.apply(this, arguments);
      }

      return focus;
    }()
  }, {
    key: "tap",
    value: function () {
      var _tap = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee20(select) {
        return _regenerator.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      }));

      function tap(_x11) {
        return _tap.apply(this, arguments);
      }

      return tap;
    }()
  }, {
    key: "setUserAgent",
    value: function () {
      var _setUserAgent = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee21(userAgent) {
        return _regenerator.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      }));

      function setUserAgent(_x12) {
        return _setUserAgent.apply(this, arguments);
      }

      return setUserAgent;
    }()
  }, {
    key: "type",
    value: function () {
      var _type = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee22(selector, text) {
        return _regenerator.default.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22);
      }));

      function type(_x13, _x14) {
        return _type.apply(this, arguments);
      }

      return type;
    }()
  }, {
    key: "keyboard",
    value: function () {
      var _keyboard = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee23(event) {
        return _regenerator.default.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23);
      }));

      function keyboard(_x15) {
        return _keyboard.apply(this, arguments);
      }

      return keyboard;
    }()
  }, {
    key: "screenshot",
    value: function () {
      var _screenshot = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee24() {
        return _regenerator.default.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24);
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
      _regenerator.default.mark(function _callee25(selector) {
        return _regenerator.default.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25);
      }));

      function waitFor(_x16) {
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