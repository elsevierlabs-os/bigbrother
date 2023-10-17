"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = require("chai");
var _sinon = _interopRequireDefault(require("sinon"));
var _proxyquire = _interopRequireDefault(require("proxyquire"));
var _expect2 = _interopRequireDefault(require("./expect"));
describe.only('Expectations', function () {
  describe('toExist', function () {
    it('should throw an exception if value does not exist', function () {
      var expectation = function expectation() {
        return (0, _expect2.default)(null).toExist();
      };
      (0, _chai.expect)(expectation).to.throw();
    });
    it('should return true if the value exists', function () {
      var expectation = function expectation() {
        return (0, _expect2.default)('something').toExist();
      };
      (0, _chai.expect)(expectation()).to.equal(true);
    });
  });
  describe('toBeLessThan', function () {
    it('should throw an exception if value is greater than target', function () {
      var expectation = function expectation() {
        return (0, _expect2.default)(100).toBeLessThan(10);
      };
      (0, _chai.expect)(expectation).to.throw();
    });
    it('should throw an exception if value is equal to target', function () {
      var expectation = function expectation() {
        return (0, _expect2.default)(10).toBeLessThan(10);
      };
      (0, _chai.expect)(expectation).to.throw();
    });
    it('should return true if value is less than target', function () {
      var expectation = function expectation() {
        return (0, _expect2.default)(10).toBeLessThan(100);
      };
      (0, _chai.expect)(expectation()).to.equal(true);
    });
  });
  describe('toBeEqual', function () {
    it('should throw an exception if value is not equal to target', function () {
      var expectation = function expectation() {
        return (0, _expect2.default)(100).toBeEqual(10);
      };
      (0, _chai.expect)(expectation).to.throw();
    });
    it('should return true if value is equal to target', function () {
      var expectation = function expectation() {
        return (0, _expect2.default)(100).toBeEqual(100);
      };
      (0, _chai.expect)(expectation()).to.equal(true);
    });
  });
  describe('toMatchRecording', function () {
    var MockExpectation, compareWithStoredRecording, recordingExists, recordPage;
    beforeEach(function () {
      compareWithStoredRecording = _sinon.default.stub();
      recordingExists = _sinon.default.stub();
      recordPage = _sinon.default.stub();
      MockExpectation = _proxyquire.default.noCallThru().load('./Expectation', {
        '../page/PageRecorder': {
          compareWithStoredRecording: compareWithStoredRecording,
          recordingExists: recordingExists,
          recordPage: recordPage
        }
      }).default;
    });
    it('should call record page if page recording doesnt exist', function () {
      recordingExists.returns(false);
      var mockPage = {};
      var expectation = new MockExpectation(mockPage);
      expectation.toMatchRecording();
      (0, _chai.expect)(recordPage.calledWith(mockPage)).to.equal(true);
    });
    it('should call compareWithStoredRecording if page recording exists', function () {
      recordingExists.returns(true);
      var mockPage = {};
      var expectation = new MockExpectation(mockPage);
      expectation.toMatchRecording();
      (0, _chai.expect)(compareWithStoredRecording.calledWith(mockPage)).to.equal(true);
    });
  });
  describe('toBeWithinRange', function () {
    it('should throw an exception if value is not between range', function () {
      var expectation = function expectation() {
        return (0, _expect2.default)(10).toBeWithinRange(30, 50);
      };
      (0, _chai.expect)(expectation).to.throw();
    });
    it('should return true if value is between range', function () {
      var expectation = function expectation() {
        return (0, _expect2.default)(20).toBeWithinRange(10, 30);
      };
      (0, _chai.expect)(expectation()).to.equal(true);
    });
  });
  describe('toBeMoreThan', function () {
    it('should throw an exception if the value is less than target', function () {
      var expectation = function expectation() {
        return (0, _expect2.default)(10).toBeMoreThan(30);
      };
      (0, _chai.expect)(expectation).to.throw();
    });
    it('should throw an exception if value is equal to target', function () {
      var expectation = function expectation() {
        return (0, _expect2.default)(10).toBeMoreThan(10);
      };
      (0, _chai.expect)(expectation).to.throw();
    });
    it('should return true if the value is more than the target', function () {
      var expectation = function expectation() {
        return (0, _expect2.default)(20).toBeMoreThan(10);
      };
      (0, _chai.expect)(expectation()).to.equal(true);
    });
  });
});