"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _proxyquire = _interopRequireDefault(require("proxyquire"));

var _Browser = _interopRequireDefault(require("./Browser"));

var _puppeteerMock = _interopRequireDefault(require("../testHelpers/puppeteerMock"));

describe('Browser', function () {
  describe('contructor', function () {
    it('default should set right options', function () {
      var browser = new _Browser.default();
      (0, _chai.expect)(browser.puppeteerOptions.headless).to.equal(true);
      (0, _chai.expect)(browser.pageOptions.cacheEnabled).to.equal(false);
    });
    it('should set headless option correctly when provided', function () {
      var browser = new _Browser.default({
        headless: false
      });
      (0, _chai.expect)(browser.puppeteerOptions.headless).to.equal(false);
    });
    it('should set the cacheEnabledOption correctly when provided', function () {
      var browser = new _Browser.default({
        cacheEnabled: true
      });
      (0, _chai.expect)(browser.pageOptions.cacheEnabled).to.equal(true);
    });
  });
  describe.only('newPage', function () {
    var BrowserMock, printWarning, printInfo;
    beforeEach(function () {
      printWarning = _sinon.default.stub();
      printInfo = _sinon.default.stub();
      BrowserMock = _proxyquire.default.noCallThru().load('./Browser', {
        puppeteer: (0, _puppeteerMock.default)(),
        '../lib/printer': {
          printWarning: printWarning,
          printInfo: printInfo
        }
      }).default;
    });
    it('creating a new page without launching will print a warning', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var browser;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              browser = new BrowserMock();
              _context.next = 3;
              return browser.newPage();

            case 3:
              (0, _chai.expect)(printWarning.called).to.equal(true);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should create a new page after launching browser', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var browser, page;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              browser = new BrowserMock();
              _context2.next = 3;
              return browser.launch();

            case 3:
              _context2.next = 5;
              return browser.newPage();

            case 5:
              page = _context2.sent;
              (0, _chai.expect)(page).to.not.equal(undefined);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should set cache options for new page', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
      var browser, page;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              browser = new BrowserMock();
              _context3.next = 3;
              return browser.launch();

            case 3:
              _context3.next = 5;
              return browser.newPage();

            case 5:
              page = _context3.sent;
              (0, _chai.expect)(page.setCacheEnabled.called).to.equal(true);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
});