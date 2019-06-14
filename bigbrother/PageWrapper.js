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

var _constants = require("./constants");

var PageWrapper =
/*#__PURE__*/
function () {
  function PageWrapper(page) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$url = _ref.url,
        url = _ref$url === void 0 ? '' : _ref$url,
        _ref$cpu = _ref.cpu,
        cpu = _ref$cpu === void 0 ? _constants.CPU.DEFAULT : _ref$cpu,
        _ref$network = _ref.network,
        network = _ref$network === void 0 ? _constants.NETWORK.WIFI : _ref$network;

    (0, _classCallCheck2.default)(this, PageWrapper);
    this.options = {
      cpu: cpu,
      network: network,
      url: url
    };
    this.page = page;

    if (!this.page) {
      throw new Error('PageWrapper requires a puppeteer Page');
    }
  }

  (0, _createClass2.default)(PageWrapper, [{
    key: "url",
    value: function url() {
      return this.options.url;
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
      _regenerator.default.mark(function _callee() {
        var url,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = _args.length > 0 && _args[0] !== undefined ? _args[0] : this.url();

                if (!this.hasPage()) {
                  _context.next = 5;
                  break;
                }

                console.log(this.page);
                _context.next = 5;
                return this.page.goto(url);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "click",
    value: function () {
      var _click = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(selector) {
        var _this = this;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  if (_this.hasPage()) {
                    var now = +new Date(); // now we click on the thing and we measure perf

                    var end = +new Date();
                    resolve(end - now);
                  } else {
                    reject('Page has not been initialised.');
                  }
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function click(_x) {
        return _click.apply(this, arguments);
      }

      return click;
    }()
  }]);
  return PageWrapper;
}();

var _default = PageWrapper;
exports.default = _default;