"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeTask = exports.onUserInterrupt = exports.killProcess = exports.spawnProcess = exports.handleChildProcessEvents = exports.getProcessCWD = exports.exitProcess = exports.getEnvFlag = exports.TASKS = exports.LOCAL_DEVELOPMENT_ENV_FLAG = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _printer = require("../printer");

var _child_process = require("child_process");

var _constants = require("../constants");

var _excluded = ["onClose", "onError"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SIGTERM = 'SIGTERM';
var SIGINT = 'SIGINT';
var LOCAL_DEVELOPMENT_ENV_FLAG = 'BIGBROTHER_LOCAL';
exports.LOCAL_DEVELOPMENT_ENV_FLAG = LOCAL_DEVELOPMENT_ENV_FLAG;
var CLOSE_EVENT = 'close';
var ERROR_EVENT = 'error';
var TASKS = {
  open: 'open'
};
exports.TASKS = TASKS;

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
  var onClose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (f) {
    return f;
  };
  return function (code, signal) {
    (0, _printer.printInfo)("ChildProcess with pid: ".concat(pid, " died because of ").concat(signal, ", code: ").concat(code));
    onClose(code);
  };
};

var handleChildProcessError = function handleChildProcessError(pid) {
  var onError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (f) {
    return f;
  };
  return function (err) {
    (0, _printer.printInfo)("ChildProcess with pid: ".concat(pid, " received error"), err);
    onError(err);
  };
};

var handleChildProcessEvents = function handleChildProcessEvents(childProcess) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      onError = _ref.onError,
      onClose = _ref.onClose;

  childProcess.on(CLOSE_EVENT, handleChildProcessDeath(childProcess.pid, onClose));
  childProcess.on(ERROR_EVENT, handleChildProcessError(childProcess.pid, onError));
};

exports.handleChildProcessEvents = handleChildProcessEvents;

var spawnProcess = function spawnProcess(cmd, args, _ref2) {
  var onClose = _ref2.onClose,
      onError = _ref2.onError,
      options = (0, _objectWithoutProperties2["default"])(_ref2, _excluded);
  var childProcess = (0, _child_process.spawn)(cmd, args, _objectSpread({
    detached: true
  }, options));
  handleChildProcessEvents(childProcess, {
    onClose: onClose,
    onError: onError
  });
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

var executeTask = function executeTask(task) {
  if (task in TASKS) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var command = "".concat(task, " ").concat(args.join(_constants.SPACE));
    (0, _child_process.exec)(command, function (error, stdout) {
      if (error) {
        (0, _printer.printError)("Error while executing task \"".concat(command, "\": ").concat(error));
        return;
      }

      (0, _printer.printInfo)("Received from task \"".concat(command, "\": ").concat(stdout));
    });
  } else {
    (0, _printer.printError)("The following task \"".concat(task, "\" is not available."));
  }
};

exports.executeTask = executeTask;