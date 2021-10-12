"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _objectInspect = _interopRequireDefault(require("object-inspect"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var formatString = function formatString(string, args) {
  var index = 0;
  return string.replace(/%s/g, function () {
    return (0, _objectInspect["default"])(args[index++]);
  });
};

var AssertionError = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(AssertionError, _Error);

  var _super = _createSuper(AssertionError);

  function AssertionError(message, received, expected) {
    var _this;

    (0, _classCallCheck2["default"])(this, AssertionError);
    _this = _super.call(this, message);
    _this.expected = expected;
    _this.received = received;
    return _this;
  }

  return AssertionError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

var assert = function assert(condition, createMessage) {
  if (condition) return true;

  for (var _len = arguments.length, extraArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    extraArgs[_key - 2] = arguments[_key];
  }

  var message = typeof createMessage === 'string' ? formatString(createMessage, extraArgs) : createMessage(extraArgs);
  throw (0, _construct2["default"])(AssertionError, [message].concat(extraArgs));
};

var _default = assert;
exports["default"] = _default;