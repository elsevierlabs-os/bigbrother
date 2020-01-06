"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanFileName = void 0;

var cleanFileName = function cleanFileName(filename) {
  return filename.replace(/\//g, '-').replace(/\./g, '_');
};

exports.cleanFileName = cleanFileName;