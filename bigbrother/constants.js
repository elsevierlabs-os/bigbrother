"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PATTERN_DOESNT_MATCH_ERROR = exports.RESOURCE_INFO_TYPE = exports.PAINT_INFO_TYPE = exports.NAVIGATION_INFO_TYPE = exports.CPU_CONDITIONS_MESSAGE = exports.NETWORK_CONDITIONS_MESSAGE = exports.TARGET_CHANGED_EVENT = exports.CPU = exports.NETWORK = void 0;
var NETWORK = {
  WIFI: {
    offline: false,
    latency: 28,
    downloadThroughput: 5000000,
    uploadThroughput: 1000000
  },
  DSL: {
    offline: false,
    latency: 50,
    downloadThroughput: 1500000,
    uploadThroughput: 384000
  },
  SLOW3G: {
    offline: false,
    latency: 400,
    downloadThroughput: 400000,
    uploadThroughput: 400000
  },
  REG3G: {
    offline: false,
    latency: 300,
    downloadThroughput: 1600000,
    uploadThroughput: 768000
  },
  FAST3G: {
    offline: false,
    latency: 170,
    downloadThroughput: 1600000,
    uploadThroughput: 768000
  },
  REG4G: {
    offline: false,
    latency: 150,
    downloadThroughput: 9000000,
    uploadThroughput: 9000000
  },
  LTE: {
    offline: false,
    latency: 70,
    downloadThroughput: 12000000,
    uploadThroughput: 12000000
  },
  EDGE: {
    offline: false,
    latency: 840,
    downloadThroughput: 240000,
    uploadThroughput: 240000
  },
  REG2G: {
    offline: false,
    latency: 800,
    downloadThroughput: 280000,
    uploadThroughput: 256000
  },
  OFFLINE: {
    offline: false,
    latency: 10000,
    downloadThroughput: 0,
    uploadThroughput: 0
  }
};
exports.NETWORK = NETWORK;
var CPU = {
  DEFAULT: {
    rate: 1
  },
  SLOW_2: {
    rate: 2
  },
  SLOW_3: {
    rate: 3
  },
  SLOW_4: {
    rate: 4
  },
  SLOW_5: {
    rate: 5
  },
  SLOW_6: {
    rate: 6
  },
  SLOW_7: {
    rate: 7
  },
  SLOW_8: {
    rate: 8
  },
  SLOW_9: {
    rate: 9
  },
  SLOW_10: {
    rate: 10
  }
};
exports.CPU = CPU;
var ESPRIMA_OPTIONS = {
  range: true,
  loc: true,
  tokens: true,
  jsx: true
};
var PUPPETEER = {
  headless: true
};
var TARGET_CHANGED_EVENT = 'targetchanged';
exports.TARGET_CHANGED_EVENT = TARGET_CHANGED_EVENT;
var NETWORK_CONDITIONS_MESSAGE = 'Network.emulateNetworkConditions';
exports.NETWORK_CONDITIONS_MESSAGE = NETWORK_CONDITIONS_MESSAGE;
var CPU_CONDITIONS_MESSAGE = 'Emulation.setCPUThrottlingRate';
exports.CPU_CONDITIONS_MESSAGE = CPU_CONDITIONS_MESSAGE;
var NAVIGATION_INFO_TYPE = 'navigation';
exports.NAVIGATION_INFO_TYPE = NAVIGATION_INFO_TYPE;
var PAINT_INFO_TYPE = 'paint';
exports.PAINT_INFO_TYPE = PAINT_INFO_TYPE;
var RESOURCE_INFO_TYPE = 'resource';
exports.RESOURCE_INFO_TYPE = RESOURCE_INFO_TYPE;
var PATTERN_DOESNT_MATCH_ERROR = 'Provided pattern doesn\' match any file.';
exports.PATTERN_DOESNT_MATCH_ERROR = PATTERN_DOESNT_MATCH_ERROR;