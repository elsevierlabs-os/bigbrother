"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _PageBuilder = _interopRequireDefault(require("../PageBuilder"));

/*
* this represents a single it
* */
var Test =
/*#__PURE__*/
function () {
  function Test(name, cb) {
    (0, _classCallCheck2.default)(this, Test);
    // this requires a browser instance to get the pageBuilder
    // this also requires the block were it belongs
    this.name = name;
    this.cb = cb;
  }

  (0, _createClass2.default)(Test, [{
    key: "execute",
    value: function execute(browser) {
      // callback will receive a PageBuilder
      var pageBuilder = new _PageBuilder.default(browser);
      console.log(this.name);
      this.cb(pageBuilder);
    }
  }]);
  return Test;
}();

var _default = Test;
exports.default = _default;