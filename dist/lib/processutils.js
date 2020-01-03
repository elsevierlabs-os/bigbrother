"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exitProcess = exports.getEnvFlag = void 0;

var getEnvFlag = function getEnvFlag(flag) {
  return process && process.env && process.env[flag];
};

exports.getEnvFlag = getEnvFlag;

var exitProcess = function exitProcess() {
  var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return process && process.exit && process.exit(status);
};

exports.exitProcess = exitProcess;