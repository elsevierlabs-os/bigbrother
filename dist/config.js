"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = exports.storeConfiguration = exports.DEFAULT_CONFIGURATION = void 0;

var _printer = require("./lib/printer");

var DEFAULT_CONFIGURATION = {
  baseUrl: 'https://www.sciencedirect.com',
  maxRetries: 10,
  retryTimeout: 1500,
  headless: true,
  cacheEnabled: false,
  recordingsPath: './.recordings',
  cwd: './',
  threshold: 0.5
};
exports.DEFAULT_CONFIGURATION = DEFAULT_CONFIGURATION;
var config = DEFAULT_CONFIGURATION;

var storeConfiguration = function storeConfiguration(configuration) {
  config = configuration;
  (0, _printer.printInfo)('current configuration:', configuration);
};

exports.storeConfiguration = storeConfiguration;

var getConfig = function getConfig() {
  return config;
};

exports.getConfig = getConfig;