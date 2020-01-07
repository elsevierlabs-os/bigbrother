"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _config = require("../config");

var _child_process = require("child_process");

var _constants = require("../lib/constants");

var _printer = require("../lib/printer");

var _process = require("../lib/utils/process");

var NPM = 'npm';
var PRECOMMAND = 'precommand';
var POSTCOMMAND = 'postcommand';

var TaskRunner =
/*#__PURE__*/
function () {
  function TaskRunner() {
    (0, _classCallCheck2.default)(this, TaskRunner);
    this.tasks = {};
  }

  (0, _createClass2.default)(TaskRunner, [{
    key: "executePreCommand",
    value: function executePreCommand() {
      var _getConfig = (0, _config.getConfig)(),
          precommand = _getConfig.precommand;

      if (precommand) {
        (0, _printer.printInfo)('Executing PRECOMMAND');
        return this.start(PRECOMMAND, precommand);
      }

      return Promise.resolve();
    }
  }, {
    key: "executePostCommand",
    value: function executePostCommand() {
      var _getConfig2 = (0, _config.getConfig)(),
          postcommand = _getConfig2.postcommand;

      if (postcommand) {
        (0, _printer.printInfo)('Executing POSTCOMMAND');
        return this.start(POSTCOMMAND, postcommand);
      }

      return Promise.resolve();
    }
  }, {
    key: "start",
    value: function start(name, command) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        try {
          if (TaskRunner.isNpmCommand(command)) {
            var _getConfig3 = (0, _config.getConfig)(),
                cwd = _getConfig3.cwd;

            var args = TaskRunner.getCommandArguments(command);
            (0, _printer.printInfo)("Executing NPM command on ".concat(cwd, ", command: ").concat(command));
            _this.tasks[name] = (0, _child_process.spawn)(NPM, args, {
              cwd: cwd
            });
            resolve(name);
          }

          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }
  }, {
    key: "stop",
    value: function stop(taskId) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var pid = _this2.tasks[taskId].pid;

        try {
          (0, _printer.printInfo)("About to terminate process ".concat(pid));
          (0, _process.killProcess)(pid);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }
  }, {
    key: "stopAll",
    value: function stopAll() {
      var _this3 = this;

      return Promise.all(Object.keys(this.tasks).map(function (t) {
        return _this3.stop(t);
      }));
    }
  }], [{
    key: "isNpmCommand",
    value: function isNpmCommand(command) {
      return command.split(_constants.SPACE)[0] === NPM;
    }
  }, {
    key: "getCommandArguments",
    value: function getCommandArguments(command) {
      var split = command.split(_constants.SPACE);
      return split.slice(1, split.length);
    }
  }]);
  return TaskRunner;
}();

var _default = new TaskRunner();

exports.default = _default;