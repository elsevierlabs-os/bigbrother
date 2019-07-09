"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assert = _interopRequireDefault(require("./assert"));

var Expectation =
/*#__PURE__*/
function () {
  function Expectation(value) {
    (0, _classCallCheck2.default)(this, Expectation);
    this.value = value;
    this.type = (0, _typeof2.default)(value);
  }

  (0, _createClass2.default)(Expectation, [{
    key: "toExist",
    value: function toExist(message) {
      (0, _assert.default)(this.value, message || 'Expected %s to exist', this.value);
      return this;
    }
  }, {
    key: "toBeLessThan",
    value: function toBeLessThan(value) {
      (0, _assert.default)(this.value < value, 'Expected %s to take less than %s', this.value, value);
      return this;
    }
  }]);
  return Expectation;
}();

var _default = Expectation;
exports.default = _default;