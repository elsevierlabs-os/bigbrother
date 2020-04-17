"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PromiseSerial = exports.AsyncFunction = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var AsyncFunction = Object.getPrototypeOf( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))).constructor;
exports.AsyncFunction = AsyncFunction;

var PromiseSerial = function PromiseSerial() {
  var promises = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return promises.reduce(function (promiseChain, currentTask) {
    return promiseChain.then(function (chainResults) {
      return currentTask().then(function (currentResult) {
        return [].concat((0, _toConsumableArray2["default"])(chainResults), [currentResult]);
      });
    });
  }, Promise.resolve([]));
};

exports.PromiseSerial = PromiseSerial;