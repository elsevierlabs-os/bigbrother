"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ora = _interopRequireDefault(require("ora"));

var Spinner =
/*#__PURE__*/
function () {
  function Spinner(text) {
    (0, _classCallCheck2.default)(this, Spinner);
    this.text = text;
    this.instance = (0, _ora.default)({
      text: text,
      spinner: 'dots12'
    }).start();
  }

  (0, _createClass2.default)(Spinner, [{
    key: "complete",
    value: function complete() {
      this.instance.succeed("".concat(this.text, " completed!"));
    } // fail(e) {
    //     this.instance.fail(text);
    // }

  }, {
    key: "exception",
    value: function exception(e) {
      this.instance.fail('Exception! ' + e.toString().red);
    }
  }, {
    key: "warn",
    value: function warn(text) {
      this.instance.warn(text);
    }
  }]);
  return Spinner;
}();

var _default = Spinner;
exports.default = _default;