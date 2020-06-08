"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var mapConfig = function mapConfig(key, value) {
  return /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("span", {
    className: "config-name"
  }, key), /*#__PURE__*/_react["default"].createElement("span", {
    className: "config-value"
  }, " ", JSON.stringify(value)));
};

var Config = function Config(_ref) {
  var config = _ref.config;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "bottom-border"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "title"
  }, "Current configuration:"), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "config-container"
  }, Object.keys(config).map(function (k) {
    return mapConfig(k, config[k]);
  })));
};

var _default = Config;
exports["default"] = _default;