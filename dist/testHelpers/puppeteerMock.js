"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPuppeteerBrowserMock = exports.getPageMock = exports.default = void 0;

var _sinon = _interopRequireDefault(require("sinon"));

var getPageMock = function getPageMock() {
  return {
    setCacheEnabled: _sinon.default.stub(),
    reset: function reset() {
      this.setCacheEnabled.reset();
    }
  };
};

exports.getPageMock = getPageMock;

var getPuppeteerBrowserMock = function getPuppeteerBrowserMock() {
  var PageMock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getPageMock();
  return {
    newPage: _sinon.default.stub().resolves(PageMock),
    reset: function reset() {
      PageMock.reset();
      this.newPage.reset();
    }
  };
};

exports.getPuppeteerBrowserMock = getPuppeteerBrowserMock;

var getPuppeteerMock = function getPuppeteerMock() {
  var PageMock = getPageMock();
  var PuppeteerBrowserMock = getPuppeteerBrowserMock(PageMock);
  return {
    launch: _sinon.default.stub().resolves(PuppeteerBrowserMock),
    reset: function reset() {
      PuppeteerBrowserMock.reset();
      this.launch.reset();
    }
  };
};

var _default = getPuppeteerMock;
exports.default = _default;