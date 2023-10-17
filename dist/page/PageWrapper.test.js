"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = require("chai");
var _puppeteerMock = require("../testHelpers/puppeteerMock");
var _PageWrapper = _interopRequireDefault(require("./PageWrapper"));
var _constants = require("../lib/constants");
describe.only('PageWrapper', function () {
  var pageMock;
  beforeEach(function () {
    pageMock = (0, _puppeteerMock.getPageMock)();
  });
  afterEach(function () {
    pageMock.reset();
  });
  describe('contructor', function () {
    it('should set the page name', function () {
      var wrapper = new _PageWrapper.default(pageMock, 'title');
      (0, _chai.expect)(wrapper.getPageName()).to.equal('title');
    });
    it('should set the default page Settings', function () {
      var wrapper = new _PageWrapper.default(pageMock);
      var pageSettings = wrapper.getPageSettings();
      (0, _chai.expect)(pageSettings.userAgent).to.equal('');
      (0, _chai.expect)(pageSettings.cpu).to.deep.equal(_constants.CPU.DEFAULT);
      (0, _chai.expect)(pageSettings.network).to.deep.equal(_constants.NETWORK.WIFI);
    });
    it('should throw an error if page is missing', function () {
      var createWrapper = function createWrapper() {
        return new _PageWrapper.default(null, 'title');
      };
      (0, _chai.expect)(createWrapper).to.throw();
    });
  });
  describe('setNetworkSpeed', function () {
    it('should send settings to the CDPSessionClient');
    it('should store the new network settings');
  });
  describe('setCPUSpeed', function () {});
});