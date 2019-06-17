"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var PerformanceAnalyzer =
/*#__PURE__*/
function () {
  function PerformanceAnalyzer() {// somewhere here we're going to store information about all scenario

    (0, _classCallCheck2.default)(this, PerformanceAnalyzer);
  }

  (0, _createClass2.default)(PerformanceAnalyzer, [{
    key: "store",
    value: function store() {// we should store information about this specific run
    }
  }]);
  return PerformanceAnalyzer;
}();

var _default = PerformanceAnalyzer;
exports.default = _default;