"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getConfig = void 0;
var DEFAULT_CONFIGURATION = {
  headless: true,
  cacheEnabled: false,
  recordingsPath: './.recordings',
  threshold: 0.5
};
var config = DEFAULT_CONFIGURATION;

var storeConfiguration = function storeConfiguration(configuration) {
  config = configuration;
};

var getConfig = function getConfig() {
  return config;
};

exports.getConfig = getConfig;
var _default = {
  DEFAULT_CONFIGURATION: DEFAULT_CONFIGURATION,
  storeConfiguration: storeConfiguration
};
exports.default = _default;