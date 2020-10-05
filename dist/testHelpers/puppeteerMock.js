"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sinon = _interopRequireDefault(require("sinon"));

var getPuppeteerMock = function getPuppeteerMock() {
  var PageMock = {
    setCacheEnabled: _sinon["default"].stub(),
    reset: function reset() {
      PageMock.setCacheEnabled.reset();
    }
  };
  var PuppeteerBrowserMock = {
    newPage: _sinon["default"].stub().resolves(PageMock),
    reset: function reset() {
      PageMock.reset();
      PuppeteerBrowserMock.newPage.reset();
    }
  };
  var PuppeteerMock = {
    launch: _sinon["default"].stub().resolves(PuppeteerBrowserMock),
    reset: function reset() {
      PuppeteerBrowserMock.reset();
      PuppeteerMock.launch.reset();
    }
  };
  return PuppeteerMock;
};

var _default = getPuppeteerMock;
exports["default"] = _default;