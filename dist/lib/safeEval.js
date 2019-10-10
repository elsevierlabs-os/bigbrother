"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var vm = require('vm');

var safeEval = function safeEval(code, context) {
  var script = new vm.Script(code);
  var fullContext = (0, _objectSpread2.default)({}, context, {
    require: require
  });
  script.runInNewContext(fullContext);
  return script;
};

var _default = safeEval;
exports.default = _default;