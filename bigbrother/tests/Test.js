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

var _PageWrapper = _interopRequireDefault(require("../PageWrapper"));

/*
* this represents a single it
* */
var Test =
/*#__PURE__*/
function () {
  function Test(name, cb) {
    (0, _classCallCheck2.default)(this, Test);
    // this requires a browser instance to get the pageBuilder
    // this also requires the block were it belongs
    this.name = name;
    this.cb = cb;
  }

  (0, _createClass2.default)(Test, [{
    key: "execute",
    value: function () {
      var _execute = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(browser) {
        var page, pageWrapper;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return browser.newPage();

              case 2:
                page = _context.sent;
                pageWrapper = new _PageWrapper.default(page);
                _context.next = 6;
                return this.cb(pageWrapper);

              case 6:
                // closing all pages when we're done.
                console.log(this.name); // we should close page
                // should return test output

                return _context.abrupt("return", {});

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function execute(_x) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }]);
  return Test;
}();

var _default = Test;
exports.default = _default;