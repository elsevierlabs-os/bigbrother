"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodeModulesPathFromModule = exports.appendNodeModulesPathToModule = void 0;
var _path = _interopRequireDefault(require("path"));
var NODE_MODULES = 'node_modules';
var appendNodeModulesPathToModule = function appendNodeModulesPathToModule(mod, directory) {
  var modulesPath = _path.default.join(directory, NODE_MODULES);
  mod.paths.push(modulesPath);
};
exports.appendNodeModulesPathToModule = appendNodeModulesPathToModule;
var removeNodeModulesPathFromModule = function removeNodeModulesPathFromModule(directory) {
  var modulesPath = _path.default.join(directory, NODE_MODULES);
  module.paths = module.paths.filter(function (p) {
    return p !== modulesPath;
  });
};
exports.removeNodeModulesPathFromModule = removeNodeModulesPathFromModule;