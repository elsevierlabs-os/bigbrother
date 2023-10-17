"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Execution = _interopRequireDefault(require("./Execution"));
var CurrentRun = function CurrentRun(_ref) {
  var current = _ref.current;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "bottom-border"
  }, /*#__PURE__*/_react.default.createElement(_Execution.default, {
    failures: current.failures,
    suites: current.suites
  }));
};
var _default = CurrentRun;
exports.default = _default;