"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash.flattendeep"));
var _recharts = require("recharts");
var _constants = require("../constants");
var parseData = function parseData(data) {
  return data.reduce(function (acc, _ref, i) {
    var testRunner = _ref.testRunner;
    var _testRunner$suites = testRunner.suites,
      suites = _testRunner$suites === void 0 ? [] : _testRunner$suites;
    var flat = (0, _lodash.default)(suites);
    var item = {
      number: "".concat(i),
      failures: flat.filter(function (s) {
        return !s.success;
      }).length,
      success: flat.filter(function (s) {
        return s.success;
      }).length
    };
    acc.push(item);
    return acc;
  }, []);
};
var FailureToTestRationGraph = function FailureToTestRationGraph(_ref2) {
  var data = _ref2.data;
  var chartData = parseData(data);
  console.log(chartData);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, "Failures to Tests ratio"), /*#__PURE__*/_react.default.createElement(_recharts.BarChart, {
    width: _constants.WIDTH,
    height: _constants.HEIGHT,
    data: chartData,
    margin: {
      top: 20,
      right: 30,
      left: 20,
      bottom: 5
    }
  }, /*#__PURE__*/_react.default.createElement(_recharts.CartesianGrid, {
    strokeDasharray: "3 3"
  }), /*#__PURE__*/_react.default.createElement(_recharts.XAxis, {
    dataKey: "number"
  }), /*#__PURE__*/_react.default.createElement(_recharts.YAxis, null), /*#__PURE__*/_react.default.createElement(_recharts.Tooltip, null), /*#__PURE__*/_react.default.createElement(_recharts.Legend, null), /*#__PURE__*/_react.default.createElement(_recharts.Bar, {
    dataKey: "failures",
    stackId: "a",
    fill: "#c0392b"
  }), /*#__PURE__*/_react.default.createElement(_recharts.Bar, {
    dataKey: "success",
    stackId: "a",
    fill: "#27ae60"
  })));
};
var _default = FailureToTestRationGraph;
exports.default = _default;