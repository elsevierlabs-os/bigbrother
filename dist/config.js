"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = exports.storeConfiguration = exports.DEFAULT_CONFIGURATION = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _printer = require("./lib/printer");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DEFAULT_CONFIGURATION = {
  baseUrl: 'https://www.sciencedirect.com',
  maxRetries: 10,
  retryTimeout: 1500,
  headless: true,
  cacheEnabled: false,
  recordingsPath: '.recordings',
  reportPath: '.report',
  openReport: false,
  cwd: './',
  threshold: 0.5,
  puppeteerArgs: [],
  before: false,
  main: false,
  after: false,
  verbose: false
};
exports.DEFAULT_CONFIGURATION = DEFAULT_CONFIGURATION;
var config = DEFAULT_CONFIGURATION;

var storeConfiguration = function storeConfiguration(configuration) {
  config = _objectSpread(_objectSpread({}, DEFAULT_CONFIGURATION), configuration);
  (0, _printer.printInfo)('current configuration:', config);
};

exports.storeConfiguration = storeConfiguration;

var getConfig = function getConfig() {
  return config;
};

exports.getConfig = getConfig;