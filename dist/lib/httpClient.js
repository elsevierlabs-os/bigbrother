"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pingEndpoint = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _printer = require("./printer");

var pingEndpoint = function pingEndpoint(endpoint) {
  var maxRetries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  if (count > maxRetries) return Promise.reject({
    message: "Provided URL (".concat(endpoint, ") was unavailable after ").concat(maxRetries, " retries.")
  });

  var ping = function ping() {
    return new Promise(function (resolve, reject) {
      (0, _printer.printInfo)("ping ".concat(endpoint));
      setTimeout(function () {
        (0, _nodeFetch["default"])(endpoint).then(function () {
          (0, _printer.printInfo)("".concat(endpoint, " is available"));
          resolve();
        })["catch"](reject);
      }, timeout);
    });
  };

  return ping().then(function () {
    return Promise.resolve();
  })["catch"](function () {
    return pingEndpoint(endpoint, maxRetries, timeout, count + 1);
  });
};

exports.pingEndpoint = pingEndpoint;