"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _FailureToTestRatioGraph = _interopRequireDefault(require("./graphs/FailureToTestRatioGraph"));

var _PayloadInspectGraph = _interopRequireDefault(require("./graphs/PayloadInspectGraph"));

var AllRun = function AllRun(_ref) {
  var data = _ref.data,
      current = _ref.current;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "bottom-border"
  }, /*#__PURE__*/_react["default"].createElement(_FailureToTestRatioGraph["default"], {
    data: data
  }), /*#__PURE__*/_react["default"].createElement(_PayloadInspectGraph["default"], {
    data: data
  }));
};

var _default = AllRun;
exports["default"] = _default;