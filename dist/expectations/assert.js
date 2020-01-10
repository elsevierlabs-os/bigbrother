"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectInspect = _interopRequireDefault(require("object-inspect"));

var formatString = function formatString(string, args) {
  var index = 0;
  return string.replace(/%s/g, function () {
    return (0, _objectInspect["default"])(args[index++]);
  });
};

var assert = function assert(condition, createMessage) {
  if (condition) return;

  for (var _len = arguments.length, extraArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    extraArgs[_key - 2] = arguments[_key];
  }

  var message = typeof createMessage === 'string' ? formatString(createMessage, extraArgs) : createMessage(extraArgs);
  throw new Error(message);
};

var _default = assert;
exports["default"] = _default;