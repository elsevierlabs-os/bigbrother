"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Expectation = _interopRequireDefault(require("./Expectation"));
var expect = function expect(something) {
  return new _Expectation.default(something);
};
var _default = expect;
exports.default = _default;