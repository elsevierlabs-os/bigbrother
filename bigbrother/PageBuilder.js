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

var _PageWrapper = _interopRequireDefault(require("./PageWrapper"));

var _constants = require("./constants");

var DEFAULT_OPTIONS = {
  cpu: _constants.CPU.DEFAULT,
  network: _constants.NETWORK.WIFI,
  url: ''
};

var PageBuilder =
/*#__PURE__*/
function () {
  function PageBuilder(browser) {
    (0, _classCallCheck2.default)(this, PageBuilder);

    if (browser) {
      this.options = DEFAULT_OPTIONS;
      this.browser = browser;
    } else {
      return new Error('PageBuilder needs a valid browser instance');
    }
  }

  (0, _createClass2.default)(PageBuilder, [{
    key: "reset",
    value: function reset() {
      this.options = DEFAULT_OPTIONS;
    }
  }, {
    key: "withCpu",
    value: function withCpu(cpu) {
      this.options.cpu = cpu;
      return this;
    }
  }, {
    key: "withNetwork",
    value: function withNetwork(network) {
      this.options.network = network;
      return this;
    }
  }, {
    key: "withUrl",
    value: function withUrl(url) {
      this.options.url = url;
      return this;
    }
  }, {
    key: "build",
    value: function () {
      var _build = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var page, pageWrapper;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.options.url) {
                  _context.next = 13;
                  break;
                }

                _context.next = 3;
                return this.browser.newPage();

              case 3:
                page = _context.sent;
                pageWrapper = new _PageWrapper.default(page, this.options);
                _context.next = 7;
                return pageWrapper.load();

              case 7:
                _context.next = 9;
                return this.browser.setConditions(pageWrapper);

              case 9:
                // we should probably restore options to original values
                this.reset();
                return _context.abrupt("return", page);

              case 13:
                throw new Error('cannnot create new page with url');

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function build() {
        return _build.apply(this, arguments);
      }

      return build;
    }()
  }]);
  return PageBuilder;
}();

var _default = PageBuilder;
exports.default = _default;