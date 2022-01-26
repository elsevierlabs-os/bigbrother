"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _object = require("./utils/object");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var PerformanceAnalyzer = /*#__PURE__*/function () {
  function PerformanceAnalyzer() {
    (0, _classCallCheck2["default"])(this, PerformanceAnalyzer);
    // somewhere here we're going to store information about all scenario
    this.data = {};
  }

  (0, _createClass2["default"])(PerformanceAnalyzer, [{
    key: "getUniqueKey",
    value: function getUniqueKey(key) {
      var inc = 1;
      var _key = key;

      if (!(0, _object.deepExist)(_key, this.data)) {
        return _key;
      }

      _key = "".concat(key, "_").concat(inc);

      while ((0, _object.deepExist)(_key, this.data)) {
        inc++;
        _key = "".concat(key, "_").concat(inc);
      }

      return _key;
    }
  }, {
    key: "startTracking",
    value: function startTracking(key) {
      var timestamp = +new Date();
      var uniqueKey = this.getUniqueKey(key);
      (0, _object.deepSet)("".concat(uniqueKey, ".start"), timestamp, this.data);
      return uniqueKey;
    }
  }, {
    key: "stopTracking",
    value: function stopTracking(key) {
      var action = (0, _object.deepGet)("".concat(key), this.data);
      var end = +new Date();
      var duration = end - action.start;

      var value = _objectSpread(_objectSpread({}, action), {}, {
        end: end,
        duration: duration,
        key: key
      });

      (0, _object.deepSet)("".concat(key), value, this.data);
      return value;
    }
  }, {
    key: "measure",
    value: function () {
      var _measure = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(key, targetFunction) {
        var uniqueKey;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                uniqueKey = this.startTracking(key);
                _context.prev = 1;
                _context.next = 4;
                return targetFunction();

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](1);
                this.stopTracking(key);

              case 9:
                return _context.abrupt("return", this.stopTracking(uniqueKey));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 6]]);
      }));

      function measure(_x, _x2) {
        return _measure.apply(this, arguments);
      }

      return measure;
    }()
  }, {
    key: "toJSON",
    value: function toJSON() {
      return JSON.stringify(this.data, null, 4);
    }
  }]);
  return PerformanceAnalyzer;
}();

var _default = new PerformanceAnalyzer();

exports["default"] = _default;