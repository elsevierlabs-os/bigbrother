"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildUrl = exports.isAbsoluteUrl = void 0;

var _config = require("../../config");

var ABSOLUTE_REGEX = /(http(s)?:\/\/[a-z]+[.]+[a-z]+\/?)/g;

var isAbsoluteUrl = function isAbsoluteUrl(url) {
  return url.match(ABSOLUTE_REGEX);
};

exports.isAbsoluteUrl = isAbsoluteUrl;

var buildUrl = function buildUrl(url) {
  if (isAbsoluteUrl(url)) return url;

  var _getConfig = (0, _config.getConfig)(),
      baseUrl = _getConfig.baseUrl;

  return new URL(url, baseUrl).toString();
};

exports.buildUrl = buildUrl;