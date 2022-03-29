"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Config = _interopRequireDefault(require("./Config"));

var _Tab = _interopRequireDefault(require("./utils/Tab"));

var _CurrentRun = _interopRequireDefault(require("./CurrentRun"));

var _AllRun = _interopRequireDefault(require("./AllRun"));

var App = function App(_ref) {
  var data = _ref.data,
      config = _ref.config,
      current = _ref.current;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", {
    className: "title bottom-border"
  }, "Bigbrother Report"), /*#__PURE__*/_react.default.createElement(_Config.default, {
    config: config
  }), /*#__PURE__*/_react.default.createElement(_Tab.default, {
    tabs: [{
      title: 'Current',
      component: /*#__PURE__*/_react.default.createElement(_CurrentRun.default, {
        current: current
      })
    }, {
      title: 'All',
      component: /*#__PURE__*/_react.default.createElement(_AllRun.default, {
        data: data
      })
    }]
  }));
};

var _default = App;
exports.default = _default;