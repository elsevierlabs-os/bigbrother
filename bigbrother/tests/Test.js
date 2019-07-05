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

var _Spinner = _interopRequireDefault(require("../Spinner"));

var Test =
/*#__PURE__*/
function () {
  function Test(name, cb, displayName) {
    (0, _classCallCheck2.default)(this, Test);
    // this requires a browser instance to get the pageBuilder
    // this also requires the block were it belongs
    this.name = name;
    this.cb = cb;
    this.displayName = displayName || name;
  }

  (0, _createClass2.default)(Test, [{
    key: "createPageWrapper",
    value: function () {
      var _createPageWrapper = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(browser) {
        var page;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return browser.newPage();

              case 2:
                page = _context.sent;
                return _context.abrupt("return", new _PageWrapper.default(page, this.name));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createPageWrapper(_x) {
        return _createPageWrapper.apply(this, arguments);
      }

      return createPageWrapper;
    }()
  }, {
    key: "execute",
    value: function () {
      var _execute = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(browser) {
        var spinner, pageWrapper;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // callback will receive a PageBuilder
                spinner = new _Spinner.default(this.displayName);
                _context2.next = 3;
                return this.createPageWrapper(browser);

              case 3:
                pageWrapper = _context2.sent;
                _context2.prev = 4;
                _context2.next = 7;
                return this.cb(pageWrapper);

              case 7:
                _context2.next = 9;
                return pageWrapper.close();

              case 9:
                spinner.complete();
                _context2.next = 17;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](4);
                spinner.exception(_context2.t0);
                _context2.next = 17;
                return pageWrapper.close();

              case 17:
                return _context2.abrupt("return", pageWrapper.toJSON());

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 12]]);
      }));

      function execute(_x2) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }]);
  return Test;
}();

var _default = Test;
exports.default = _default;