"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assert = _interopRequireDefault(require("./assert"));

var _PageRecorder = require("../page/PageRecorder");

var Expectation = /*#__PURE__*/function () {
  function Expectation(value) {
    (0, _classCallCheck2["default"])(this, Expectation);
    this.value = value;
    this.type = (0, _typeof2["default"])(value);
  }

  (0, _createClass2["default"])(Expectation, [{
    key: "toExist",
    value: function toExist(message) {
      return (0, _assert["default"])(this.value, message || 'Expected %s to exist', this.value);
    }
  }, {
    key: "toBeLessThan",
    value: function toBeLessThan(value) {
      return (0, _assert["default"])(this.value < value, 'Expected %s to be less than %s', this.value, value);
    }
  }, {
    key: "toBeEqual",
    value: function toBeEqual(value, message) {
      return (0, _assert["default"])(this.value === value, message || 'Expected %s to be equal to %s', this.value, value);
    }
  }, {
    key: "toMatchRecording",
    value: function toMatchRecording() {
      /*
       * we get the page
       * check inside .recordings if the page exists
       *   if the page exists, compare the json and return the diff
       *   if the page does not exist, save the json inside the recordings folder. and return OK
       * */
      var page = this.value;

      if ((0, _PageRecorder.recordingExists)(page)) {
        (0, _PageRecorder.compareWithStoredRecording)(page);
      } else {
        (0, _PageRecorder.recordPage)(page);
      }
    }
  }, {
    key: "toBeWithinRange",
    value: function toBeWithinRange(min, max, message) {
      return (0, _assert["default"])(min < this.value && this.value < max, message || 'Expected %s to be between %s and %s', this.value, min, max);
    }
  }, {
    key: "toBeMoreThan",
    value: function toBeMoreThan(value) {
      return (0, _assert["default"])(this.value > value, 'Expected %s to be more than %s', this.value, value);
    }
  }]);
  return Expectation;
}();

var _default = Expectation;
exports["default"] = _default;