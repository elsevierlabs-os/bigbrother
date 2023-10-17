"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepSet = exports.deepGet = exports.deepExist = void 0;
var deepGet = function deepGet(key, obj) {
  if (!obj) {
    throw new TypeError('Object must be specified');
  }
  var splitKey = typeof key === 'string' && key !== '' ? key.split('.') : [];
  if (splitKey.length === 1) {
    return obj[splitKey[0]];
  }
  var k = splitKey.shift();
  return obj[k] ? deepGet(splitKey.join('.'), obj[k]) : false;
};
exports.deepGet = deepGet;
var deepSet = function deepSet(key) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!key) {
    throw new TypeError('Key must be specified');
  }
  var splitKey = typeof key === 'string' && key !== '' ? key.split('.') : [];
  if (splitKey.length === 1) {
    obj[splitKey[0]] = value;
    return;
  }
  var k = splitKey.shift();
  obj[k] = obj[k] ? obj[k] : {};
  deepSet(splitKey.join('.'), value, obj[k]);
  return obj;
};
exports.deepSet = deepSet;
var deepExist = function deepExist(key, obj) {
  return Boolean(deepGet(key, obj));
};
exports.deepExist = deepExist;