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

var ProcessRunner = /*#__PURE__*/function () {
  function ProcessRunner() {
    (0, _classCallCheck2["default"])(this, ProcessRunner);
    this.processes = {};
  }

  (0, _createClass2["default"])(ProcessRunner, [{
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

          var _ProcessRunner$parseC = ProcessRunner.parseCommand(command),
              cmd = _ProcessRunner$parseC.cmd,
              args = _ProcessRunner$parseC.args;

          (0, _printer.printInfo)("Executing NPM command on ".concat(cwd, ", command: ").concat(command));

          if (ProcessRunner.isNpmCommand(cmd)) {
            _this.processes[name] = (0, _process.spawnProcess)(NPM, args, {
              cwd: cwd
            });
          } else {
            _this.processes[name] = (0, _process.spawnProcess)(cmd, args, {
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
        var childProcess = _this2.processes[taskId];

        try {
          if (childProcess && !childProcess.killed) {
            (0, _process.killProcess)(childProcess);
            (0, _printer.printInfo)("".concat(taskId, " process has been killed"));
          } else {
            var message = "The required process ".concat(taskId) + (!childProcess ? ' does not exist' : ' is already dead.');
            (0, _printer.printInfo)(message);
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

      return Promise.all(Object.keys(this.processes).map(function (t) {
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
  return ProcessRunner;
}();

var _default = new ProcessRunner();

exports["default"] = _default;