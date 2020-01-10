"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onUserInterrupt = exports.killProcess = exports.spawnProcess = exports.logChildProcessEvents = exports.getProcessCWD = exports.exitProcess = exports.getEnvFlag = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _printer = require("../printer");

var _child_process = require("child_process");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SIGTERM = 'SIGTERM';
var SIGINT = 'SIGINT';
var CLOSE_EVENT = 'close';
var ERROR_EVENT = 'error';

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

var handleChildProcessDeath = function handleChildProcessDeath(pid) {
  return function (code, signal) {
    return (0, _printer.printInfo)("ChildProcess with pid: ".concat(pid, " died because of ").concat(signal, ", code: ").concat(code));
  };
};

var handleChildProcessError = function handleChildProcessError(pid) {
  return function (err) {
    return (0, _printer.printInfo)("ChildProcess with pid: ".concat(pid, " received error"), err);
  };
};

var logChildProcessEvents = function logChildProcessEvents(childProcess) {
  childProcess.on(CLOSE_EVENT, handleChildProcessDeath(childProcess.pid));
  childProcess.on(ERROR_EVENT, handleChildProcessError(childProcess.pid));
};

exports.logChildProcessEvents = logChildProcessEvents;

var spawnProcess = function spawnProcess(cmd, args, options) {
  var childProcess = (0, _child_process.spawn)(cmd, args, _objectSpread({
    detached: true
  }, options));
  logChildProcessEvents(childProcess);
  return childProcess;
};

exports.spawnProcess = spawnProcess;

var killProcess = function killProcess(childProcess) {
  var processGroupPid = -childProcess.pid;
  (0, _printer.printInfo)("Killing process withing group pid: ".concat(-processGroupPid));
  process.kill(processGroupPid);
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