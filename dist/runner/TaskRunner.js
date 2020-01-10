"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AFTER = exports.BEFORE = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _config = require("../config");

var _constants = require("../lib/constants");

var _printer = require("../lib/printer");

var _process = require("../lib/utils/process");

var NPM = 'npm';
var BEFORE = 'before';
exports.BEFORE = BEFORE;
var AFTER = 'after';
exports.AFTER = AFTER;

var TaskRunner =
/*#__PURE__*/
function () {
  function TaskRunner() {
    (0, _classCallCheck2["default"])(this, TaskRunner);
    this.tasks = {};
  }

  (0, _createClass2["default"])(TaskRunner, [{
    key: "executePreCommand",
    value: function executePreCommand() {
      var _getConfig = (0, _config.getConfig)(),
          before = _getConfig.before;

      if (before) {
        (0, _printer.printInfo)('Executing BEFORE');
        return this.start(BEFORE, before);
      }

      return Promise.resolve();
    }
  }, {
    key: "executePostCommand",
    value: function executePostCommand() {
      var _getConfig2 = (0, _config.getConfig)(),
          after = _getConfig2.after;

      if (after) {
        (0, _printer.printInfo)('Executing AFTER');
        return this.start(AFTER, after);
      }

      return Promise.resolve();
    }
  }, {
    key: "start",
    value: function start(name, command) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        try {
          var _getConfig3 = (0, _config.getConfig)(),
              cwd = _getConfig3.cwd;

          var _TaskRunner$parseComm = TaskRunner.parseCommand(command),
              cmd = _TaskRunner$parseComm.cmd,
              args = _TaskRunner$parseComm.args;

          (0, _printer.printInfo)("Executing NPM command on ".concat(cwd, ", command: ").concat(command));

          if (TaskRunner.isNpmCommand(cmd)) {
            _this.tasks[name] = (0, _process.spawnProcess)(NPM, args, {
              cwd: cwd
            });
          } else {
            _this.tasks[name] = (0, _process.spawnProcess)(cmd, args, {
              cwd: cwd
            });
          }

          resolve(name);
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
        var childProcess = _this2.tasks[taskId];

        try {
          if (childProcess) {
            (0, _process.killProcess)(childProcess);
          } else {
            (0, _printer.printInfo)("The required task ".concat(taskId, " does not exist."));
          }

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
      return command === NPM;
    }
  }, {
    key: "parseCommand",
    value: function parseCommand(command) {
      var split = command.split(_constants.SPACE);
      return {
        cmd: split[0],
        args: split.splice(1, split.length)
      };
    }
  }]);
  return TaskRunner;
}();

var _default = new TaskRunner();

exports["default"] = _default;