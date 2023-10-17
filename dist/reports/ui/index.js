"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _App = _interopRequireDefault(require("./App"));
var createDashboard = function createDashboard() {
  var currentReport = window.currentReport;
  var data = window.fullReport.data;
  var config = currentReport.config;
  console.log(currentReport.testRunner, data);
  var container = document.getElementById('container');
  _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_App.default, {
    current: currentReport.testRunner,
    data: data,
    config: config
  }), container);
};
window.addEventListener('load', createDashboard);