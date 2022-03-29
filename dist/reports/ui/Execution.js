"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var FailureReason = function FailureReason(_ref) {
  var message = _ref.message,
      received = _ref.received,
      _ref$expected = _ref.expected,
      expected = _ref$expected === void 0 ? 'to exist' : _ref$expected;
  return /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", {
    className: 'reason-detail'
  }, /*#__PURE__*/_react.default.createElement("label", null, "Message:"), message), /*#__PURE__*/_react.default.createElement("li", {
    className: 'reason-detail'
  }, /*#__PURE__*/_react.default.createElement("label", null, "received:"), received), /*#__PURE__*/_react.default.createElement("li", {
    className: 'reason-detail'
  }, /*#__PURE__*/_react.default.createElement("label", null, "expected:"), expected));
};

var Failure = function Failure(_ref2) {
  var name = _ref2.name,
      reason = _ref2.reason;
  return /*#__PURE__*/_react.default.createElement("li", {
    className: "execution failed"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: 'test-title'
  }, name), /*#__PURE__*/_react.default.createElement("span", {
    className: 'test-reason'
  }, /*#__PURE__*/_react.default.createElement(FailureReason, reason)));
};

var Test = function Test(_ref3) {
  var name = _ref3.name,
      reason = _ref3.reason,
      success = _ref3.success;
  var className = 'execution '.concat(success ? 'success' : 'failed');
  return /*#__PURE__*/_react.default.createElement("li", {
    className: className
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: 'test-title'
  }, name), /*#__PURE__*/_react.default.createElement("span", {
    className: 'test-reason'
  }, reason));
};

var renderFailures = function renderFailures() {
  var failures = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  if (!failures.length) return null;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, "Failures"), /*#__PURE__*/_react.default.createElement("ul", {
    className: 'execution-block failures'
  }, failures.map(function (failure) {
    return /*#__PURE__*/_react.default.createElement(Failure, failure);
  })));
};

var extractTitle = function extractTitle(_ref4) {
  var fullName = _ref4.fullName;
  return fullName.split('.')[0];
};

var renderSingleSuite = function renderSingleSuite() {
  var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  if (!tests.length) return null;
  var title = extractTitle(tests[0]);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, title), /*#__PURE__*/_react.default.createElement("ul", {
    className: 'execution-block suites'
  }, tests.map(function (test) {
    return /*#__PURE__*/_react.default.createElement(Test, test);
  })));
};

var renderSuitesBlocks = function renderSuitesBlocks() {
  var suites = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  if (!suites.length) return null;
  return /*#__PURE__*/_react.default.createElement("div", null, suites.map(renderSingleSuite));
};

var Execution = function Execution(_ref5) {
  var failures = _ref5.failures,
      suites = _ref5.suites;
  console.log(failures, suites);
  return /*#__PURE__*/_react.default.createElement("div", null, renderFailures(failures), renderSuitesBlocks(suites));
};

var _default = Execution;
exports.default = _default;