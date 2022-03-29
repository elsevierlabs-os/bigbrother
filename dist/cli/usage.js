"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("colors");

var _commandLineUsage = _interopRequireDefault(require("command-line-usage"));

var _package = _interopRequireDefault(require("../../package"));

var usage = (0, _commandLineUsage.default)([{
  header: 'BigBrother'.bold.green,
  content: 'BigBrother is a test runner built on top of Puppeteer, that allows you to ' + 'evaluate and measure the performance of your application, under specific CPU and Network configurations.' + '\n' + '\n' + 'BigBrother provides also a small assertion library, and the chance to record/evaluate snapshots of' + "the page you're evaluating."
}, {
  header: 'Synopsis'.yellow,
  content: ["$ bigbrother {bold --config}={underline configfile} '**/*.perf.js'", '$ bigbrother {bold --help}']
}, {
  header: 'Options'.yellow,
  optionList: [{
    name: 'help',
    description: 'Display this usage guide.'.bold.grey,
    alias: 'h',
    type: Boolean
  }, {
    name: 'config',
    alias: 'c',
    description: 'The configuration file that will be used by bigbrother. Please note that the path has to be relative (e.g. "--config=./bigbrother.config.js".'.bold.grey,
    type: String,
    typeLabel: '{underline file}'
  }, {
    name: 'verbose',
    description: 'Run bigbrother in verbose mode.'.bold.grey,
    alias: 'v',
    type: Boolean
  }]
}, {
  header: 'Info'.yellow,
  content: "Project home: {underline ".concat(_package.default.homepage, " }")
}, {
  content: "Bugs: ".concat(_package.default.bugs.url)
}, {
  content: "Author: ".concat(_package.default.author)
}]);
var _default = usage;
exports.default = _default;