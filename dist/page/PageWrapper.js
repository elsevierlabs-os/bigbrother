"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _constants = require("../lib/constants");
var _PerformanceAnalyzer = _interopRequireDefault(require("../lib/PerformanceAnalyzer"));
var _object = require("../lib/utils/object");
var _AssetsHandler = _interopRequireDefault(require("./AssetsHandler"));
var _url = require("../lib/utils/url");
var _printer = require("../lib/printer");
var _excluded = ["requestId", "encodedDataLength", "dataLength"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var PageWrapper = /*#__PURE__*/function () {
  function PageWrapper(page, name) {
    var _this = this;
    (0, _classCallCheck2.default)(this, PageWrapper);
    (0, _defineProperty2.default)(this, "getCDPSessionClient", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.cdpSessionClient) {
                _context.next = 4;
                break;
              }
              _context.next = 3;
              return _this.page.target().createCDPSession();
            case 3:
              _this.cdpSessionClient = _context.sent;
            case 4:
              return _context.abrupt("return", _this.cdpSessionClient);
            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    (0, _defineProperty2.default)(this, "storeMeasurement", function (data) {
      (0, _object.deepSet)(data.key, data, _this.measurements);
      _this.storeMeasurementKey(data.key);
    });
    (0, _defineProperty2.default)(this, "storeMeasurementKey", function (key) {
      return _this.measurements.__keys.push(key);
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
        rest = (0, _objectWithoutProperties2.default)(_ref3, _excluded);
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
      _this.storeAsset(url, _objectSpread({
        mimeType: mimeType,
        encodedLength: (asset && asset.encodedLength || 0) + encodedDataLength / 1024,
        length: (asset && asset.length || 0) + dataLength / 1024
      }, rest));
    });
    (0, _defineProperty2.default)(this, "_load", function (url) {
      return /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
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
      }));
    });
    (0, _defineProperty2.default)(this, "_click", function (selector, options) {
      return /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
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
      }));
    });
    (0, _defineProperty2.default)(this, "_focus", function (selector) {
      return /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
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
      }));
    });
    (0, _defineProperty2.default)(this, "_setUserAgent", function (userAgent) {
      return /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this.page.setUserAgent(userAgent);
              case 2:
                return _context5.abrupt("return", _context5.sent);
              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
    });
    (0, _defineProperty2.default)(this, "_type", function (text) {
      return /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this.page.keyboard.type(text);
              case 2:
                return _context6.abrupt("return", _context6.sent);
              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));
    });
    this.options = {};
    this.page = page;
    this.name = name;
    this.measurements = {
      __keys: []
    };
    this.timings = {};
    this.responses = {};
    this.assetsHandler = new _AssetsHandler.default();
    this.pageSettings = {
      userAgent: '',
      cpu: _constants.CPU.DEFAULT,
      network: _constants.NETWORK.WIFI
    };
    if (!this.page) {
      throw new Error(_constants.PAGEWRAPPER_MISSING_PAGE_ERROR);
    }
  }
  (0, _createClass2.default)(PageWrapper, [{
    key: "getPageName",
    value: function getPageName() {
      return this.name;
    }
  }, {
    key: "getPageSettings",
    value: function getPageSettings() {
      return this.pageSettings;
    }
  }, {
    key: "close",
    value: function () {
      var _close = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var paint, navigation;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                if (!this.hasPage()) {
                  _context7.next = 11;
                  break;
                }
                _context7.next = 4;
                return this.getPaintInfo();
              case 4:
                paint = _context7.sent;
                _context7.next = 7;
                return this.getNavigationInfo();
              case 7:
                navigation = _context7.sent;
                this.storeTimings(paint, navigation);
                _context7.next = 11;
                return this.page.close();
              case 11:
                _context7.next = 16;
                break;
              case 13:
                _context7.prev = 13;
                _context7.t0 = _context7["catch"](0);
                (0, _printer.printException)(_context7.t0);
              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 13]]);
      }));
      function close() {
        return _close.apply(this, arguments);
      }
      return close;
    }()
  }, {
    key: "setNetworkSpeed",
    value: function () {
      var _setNetworkSpeed = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var network,
          client,
          _args8 = arguments;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                network = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : _constants.NETWORK.WIFI;
                _context8.prev = 1;
                _context8.next = 4;
                return this.getCDPSessionClient();
              case 4:
                client = _context8.sent;
                _context8.next = 7;
                return client.send(_constants.NETWORK_CONDITIONS_MESSAGE, network);
              case 7:
                this.storePageSetting({
                  network: network
                });
                _context8.next = 13;
                break;
              case 10:
                _context8.prev = 10;
                _context8.t0 = _context8["catch"](1);
                (0, _printer.printException)(_context8.t0);
              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[1, 10]]);
      }));
      function setNetworkSpeed() {
        return _setNetworkSpeed.apply(this, arguments);
      }
      return setNetworkSpeed;
    }()
  }, {
    key: "setCpuSpeed",
    value: function () {
      var _setCpuSpeed = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var cpu,
          client,
          _args9 = arguments;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                cpu = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : _constants.CPU.DEFAULT;
                _context9.prev = 1;
                _context9.next = 4;
                return this.getCDPSessionClient();
              case 4:
                client = _context9.sent;
                _context9.next = 7;
                return client.send(_constants.CPU_CONDITIONS_MESSAGE, cpu);
              case 7:
                this.storePageSetting({
                  cpu: cpu
                });
                _context9.next = 13;
                break;
              case 10:
                _context9.prev = 10;
                _context9.t0 = _context9["catch"](1);
                (0, _printer.printException)(_context9.t0);
              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[1, 10]]);
      }));
      function setCpuSpeed() {
        return _setCpuSpeed.apply(this, arguments);
      }
      return setCpuSpeed;
    }()
  }, {
    key: "storePageSetting",
    value: function storePageSetting(setting) {
      this.pageSettings = _objectSpread(_objectSpread({}, this.getPageSettings()), setting);
    }
  }, {
    key: "storeTimings",
    value: function storeTimings(paint, navigation) {
      this.timings = {
        paint: paint,
        navigation: navigation
      };
    }
  }, {
    key: "getTimings",
    value: function getTimings() {
      return this.timings;
    }
    //
    // cpu = () => this.options.cpu;
    // network = () => this.options.network;
  }, {
    key: "hasPage",
    value: function hasPage() {
      return Boolean(this.page);
    }
  }, {
    key: "getKey",
    value: function getKey(key) {
      return "".concat(this.getPageName(), ".").concat(key);
    }
  }, {
    key: "setupAssetsMetrics",
    value: function () {
      var _setupAssetsMetrics = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var client;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this.clearResponses();
                this.clearAssets();
                _context10.next = 4;
                return this.getCDPSessionClient();
              case 4:
                client = _context10.sent;
                _context10.next = 7;
                return client.send(_constants.NETWORK_ENABLE);
              case 7:
                client.on(_constants.NETWORK_RESPONSE_RECEIVED, this.handleNetworkResponseReceived);
                client.on(_constants.NETWORK_DATA_RECEIVED, this.handleNetworkDataReceived);
              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function setupAssetsMetrics() {
        return _setupAssetsMetrics.apply(this, arguments);
      }
      return setupAssetsMetrics;
    }()
  }, {
    key: "getInfo",
    value: function () {
      var _getInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(type) {
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!this.page) {
                  _context11.next = 6;
                  break;
                }
                _context11.next = 3;
                return this.page.evaluate(function (type) {
                  var entries = performance.getEntriesByType(type);
                  if (entries.length) {
                    return entries.map(function (e) {
                      return e.toJSON();
                    });
                  }
                }, type);
              case 3:
                return _context11.abrupt("return", _context11.sent);
              case 6:
                return _context11.abrupt("return", []);
              case 7:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function getInfo(_x) {
        return _getInfo.apply(this, arguments);
      }
      return getInfo;
    }()
  }, {
    key: "getPaintInfo",
    value: function () {
      var _getPaintInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.getInfo(_constants.PAINT_INFO_TYPE);
              case 2:
                return _context12.abrupt("return", _context12.sent);
              case 3:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function getPaintInfo() {
        return _getPaintInfo.apply(this, arguments);
      }
      return getPaintInfo;
    }()
  }, {
    key: "getNavigationInfo",
    value: function () {
      var _getNavigationInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this.getInfo(_constants.NAVIGATION_INFO_TYPE);
              case 2:
                return _context13.abrupt("return", _context13.sent);
              case 3:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
      function getNavigationInfo() {
        return _getNavigationInfo.apply(this, arguments);
      }
      return getNavigationInfo;
    }()
  }, {
    key: "getAssetsInfo",
    value: function () {
      var _getAssetsInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14() {
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                return _context14.abrupt("return", this.assetsHandler);
              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
      function getAssetsInfo() {
        return _getAssetsInfo.apply(this, arguments);
      }
      return getAssetsInfo;
    }()
  }, {
    key: "load",
    value: function () {
      var _load = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15(url) {
        var fullUrl, data;
        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!(this.hasPage() && url)) {
                  _context15.next = 12;
                  break;
                }
                _context15.next = 3;
                return this.setupAssetsMetrics();
              case 3:
                fullUrl = (0, _url.buildUrl)(url);
                _context15.next = 6;
                return _PerformanceAnalyzer.default.measure(this.getKey('load'), this._load(fullUrl));
              case 6:
                data = _context15.sent;
                this.options.url = fullUrl;
                this.storeMeasurement(data);
                return _context15.abrupt("return", Promise.resolve(data.duration));
              case 12:
                return _context15.abrupt("return", Promise.reject(_constants.PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR));
              case 13:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));
      function load(_x2) {
        return _load.apply(this, arguments);
      }
      return load;
    }()
  }, {
    key: "click",
    value: function () {
      var _click = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16(selector) {
        var options,
          data,
          _args16 = arguments;
        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                options = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : {};
                if (!this.hasPage()) {
                  _context16.next = 9;
                  break;
                }
                _context16.next = 4;
                return _PerformanceAnalyzer.default.measure(this.getKey('click'), this._click(selector, options));
              case 4:
                data = _context16.sent;
                this.storeMeasurement(data);
                return _context16.abrupt("return", Promise.resolve(data.duration));
              case 9:
                return _context16.abrupt("return", Promise.reject(_constants.PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR));
              case 10:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));
      function click(_x3) {
        return _click.apply(this, arguments);
      }
      return click;
    }()
  }, {
    key: "focus",
    value: function () {
      var _focus = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17(selector) {
        var data;
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (!this.hasPage()) {
                  _context17.next = 8;
                  break;
                }
                _context17.next = 3;
                return _PerformanceAnalyzer.default.measure(this.getKey('focus'), this._focus(selector));
              case 3:
                data = _context17.sent;
                this.storeMeasurement(data);
                return _context17.abrupt("return", Promise.resolve(data.duration));
              case 8:
                return _context17.abrupt("return", Promise.reject(_constants.PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR));
              case 9:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));
      function focus(_x4) {
        return _focus.apply(this, arguments);
      }
      return focus;
    }()
  }, {
    key: "tap",
    value: function () {
      var _tap = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18() {
        return _regenerator.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));
      function tap() {
        return _tap.apply(this, arguments);
      }
      return tap;
    }()
  }, {
    key: "setUserAgent",
    value: function () {
      var _setUserAgent = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee19(userAgent) {
        var data;
        return _regenerator.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                if (!this.hasPage()) {
                  _context19.next = 9;
                  break;
                }
                _context19.next = 3;
                return _PerformanceAnalyzer.default.measure(this.getKey('userAgent', this._setUserAgent(userAgent)));
              case 3:
                data = _context19.sent;
                this.storeMeasurement(data);
                this.storePageSetting({
                  userAgent: userAgent
                });
                return _context19.abrupt("return", Promise.resolve(data.duration));
              case 9:
                return _context19.abrupt("return", Promise.reject(_constants.PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR));
              case 10:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));
      function setUserAgent(_x5) {
        return _setUserAgent.apply(this, arguments);
      }
      return setUserAgent;
    }()
  }, {
    key: "type",
    value: function () {
      var _type = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee20(selector, text) {
        var data;
        return _regenerator.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                if (!this.hasPage()) {
                  _context20.next = 8;
                  break;
                }
                _context20.next = 3;
                return _PerformanceAnalyzer.default.measure(this.getKey('type'), this._type(selector, text));
              case 3:
                data = _context20.sent;
                this.storeMeasurement(data);
                return _context20.abrupt("return", Promise.resolve(data.duration));
              case 8:
                return _context20.abrupt("return", Promise.reject(_constants.PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR));
              case 9:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));
      function type(_x6, _x7) {
        return _type.apply(this, arguments);
      }
      return type;
    }()
  }, {
    key: "keyboard",
    value: function () {
      var _keyboard = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee21() {
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
      function keyboard() {
        return _keyboard.apply(this, arguments);
      }
      return keyboard;
    }()
  }, {
    key: "screenshot",
    value: function () {
      var _screenshot = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee22() {
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
      function screenshot() {
        return _screenshot.apply(this, arguments);
      }
      return screenshot;
    }()
  }, {
    key: "waitFor",
    value: function () {
      var _waitFor = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee23() {
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
      function waitFor() {
        return _waitFor.apply(this, arguments);
      }
      return waitFor;
    }()
  }, {
    key: "toJSON",
    value: function toJSON() {
      var spacing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
      var stringify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var json = _objectSpread(_objectSpread({}, this.measurements), {}, {
        assets: this.assetsHandler.toJSON(),
        timings: this.getTimings(),
        pageSettings: this.getPageSettings()
      });
      return stringify ? JSON.stringify(json, null, spacing) : json;
    }
  }]);
  return PageWrapper;
}();
var _default = PageWrapper;
exports.default = _default;