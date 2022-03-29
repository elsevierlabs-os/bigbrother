"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var renderTitles = function renderTitles(tabs, current, onTabChange) {
  return tabs.map(function (_ref, index) {
    var title = _ref.title;
    var className = 'tab-title '.concat(current === index ? 'current' : '');
    return /*#__PURE__*/_react.default.createElement("li", {
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
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      tab = _useState2[0],
      setTab = _useState2[1];

  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'tab-container'
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: 'tab-titles'
  }, renderTitles(tabs, tab, setTab)), /*#__PURE__*/_react.default.createElement("div", {
    className: 'tab-content'
  }, tabs[tab].component));
};

var _default = Tab;
exports.default = _default;