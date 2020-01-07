"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onUserInterrupt = exports.killProcess = exports.getProcessCWD = exports.exitProcess = exports.getEnvFlag = void 0;

var _printer = require("../printer");

var _treeKill = _interopRequireDefault(require("tree-kill"));

var SIGTERM = 'SIGTERM';
var SIGINT = 'SIGINT';

var getEnvFlag = function getEnvFlag(flag) {
  return process && process.env && process.env[flag];
};

exports.getEnvFlag = getEnvFlag;

var exitProcess = function exitProcess() {
  var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return process && process.exit && process.exit(status);
};

exports.exitProcess = exitProcess;

var getProcessCWD = function getProcessCWD() {
  return process && process.cwd && process.cwd();
};

exports.getProcessCWD = getProcessCWD;

var killProcess = function killProcess(pid) {
  (0, _printer.printInfo)("Killing process ".concat(pid));
  (0, _treeKill.default)(pid);
};

exports.killProcess = killProcess;

var onUserInterrupt = function onUserInterrupt(action) {
  var signalHandler = function signalHandler(signal) {
    return function () {
      (0, _printer.printInfo)("Received ".concat(signal, ", executing action"));
      action();
    };
  };

  process.on(SIGTERM, signalHandler(SIGTERM));
  process.on(SIGINT, signalHandler(SIGINT));
};

exports.onUserInterrupt = onUserInterrupt;