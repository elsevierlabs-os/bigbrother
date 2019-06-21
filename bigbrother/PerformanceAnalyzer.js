"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _objectutils = require("./lib/objectutils");

var PerformanceAnalyzer =
/*#__PURE__*/
function () {
  function PerformanceAnalyzer() {
    (0, _classCallCheck2.default)(this, PerformanceAnalyzer);
    // somewhere here we're going to store information about all scenario
    this.data = {};
  }

  (0, _createClass2.default)(PerformanceAnalyzer, [{
    key: "store",
    value: function store() {// we should store information about this specific run
    }
  }, {
    key: "getKey",
    value: function getKey(key) {
      var inc = 1;
      var _key = key;

      if (!(0, _objectutils.deepExist)(_key, this.data)) {
        return _key;
      }

      _key = "".concat(key, "_").concat(inc);

      while ((0, _objectutils.deepExist)(_key, this.data)) {
        inc++;
        _key = "".concat(key, "_").concat(inc);
      }

      return _key;
    }
  }, {
    key: "startTracking",
    value: function startTracking(key, action) {
      var timestamp = +new Date();
      var uniqueKey = this.getKey("".concat(key, ".").concat(action));
      (0, _objectutils.deepSet)("".concat(uniqueKey, ".start"), timestamp, this.data);
      return uniqueKey;
    }
  }, {
    key: "stopTracking",
    value: function stopTracking(key) {
      var action = (0, _objectutils.deepGet)("".concat(key), this.data);
      var end = +new Date();
      var duration = end - action.start;
      (0, _objectutils.deepSet)("".concat(key), (0, _objectSpread2.default)({}, action, {
        end: end,
        duration: duration
      }), this.data);
      return duration;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return JSON.stringify(this.data);
    }
  }]);
  return PerformanceAnalyzer;
}();

var _default = new PerformanceAnalyzer();

exports.default = _default;