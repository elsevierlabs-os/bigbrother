"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var renderTitles = function renderTitles(tabs, current, onTabChange) {
  return tabs.map(function (_ref, index) {
    var title = _ref.title;
    var className = 'tab-title '.concat(current === index ? 'current' : '');
    return /*#__PURE__*/_react["default"].createElement("li", {
      className: className,
      onClick: function onClick() {
        return onTabChange(index);
      }
    }, title);
  });
};

var Tab = function Tab(_ref2) {
  var tabs = _ref2.tabs;

  var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      tab = _useState2[0],
      setTab = _useState2[1];

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: 'tab-container'
  }, /*#__PURE__*/_react["default"].createElement("ul", {
    className: 'tab-titles'
  }, renderTitles(tabs, tab, setTab)), /*#__PURE__*/_react["default"].createElement("div", {
    className: 'tab-content'
  }, tabs[tab].component));
};

var _default = Tab;
exports["default"] = _default;