"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareWithStoredRecording = exports.getPageRecording = exports.recordPage = exports.checkAndCreateRecordingFolder = exports.recordingExists = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _config = require("../config");

var _constants = require("../lib/constants");

var _printer = require("../lib/printer");

var _objectutils = require("../lib/objectutils");

var _assert = _interopRequireDefault(require("../expectations/assert"));

var buildFileName = function buildFileName(name) {
  return name.concat(_constants.RECORDING_EXT);
};

var buildRecordingFullPath = function buildRecordingFullPath(name) {
  var _getConfig = (0, _config.getConfig)(),
      recordingsPath = _getConfig.recordingsPath;

  var filename = buildFileName(name);
  return _path.default.join(recordingsPath, filename);
};

var recordingExists = function recordingExists(page) {
  return _fs.default.existsSync(buildRecordingFullPath(page.name));
};

exports.recordingExists = recordingExists;

var checkAndCreateRecordingFolder = function checkAndCreateRecordingFolder() {
  var _getConfig2 = (0, _config.getConfig)(),
      recordingsPath = _getConfig2.recordingsPath;

  try {
    if (!_fs.default.existsSync(recordingsPath)) {
      _fs.default.mkdirSync(recordingsPath, {
        recursive: true
      });
    }

    return true;
  } catch (e) {
    (0, _printer.printException)(e);
    return false;
  }
};

exports.checkAndCreateRecordingFolder = checkAndCreateRecordingFolder;

var recordPage = function recordPage(page) {
  var fullPath = buildRecordingFullPath(page.name);
  var data = page.toJSON(0);

  if (checkAndCreateRecordingFolder()) {
    _fs.default.writeFileSync(fullPath, data);
  }
};

exports.recordPage = recordPage;

var getPageRecording = function getPageRecording(page) {
  var fullPath = buildRecordingFullPath(page.name);

  var raw = _fs.default.readFileSync(fullPath);

  return JSON.parse(raw);
};

exports.getPageRecording = getPageRecording;

var compareWithStoredRecording = function compareWithStoredRecording(page) {
  var baseRecording = getPageRecording(page);

  var _getConfig3 = (0, _config.getConfig)(),
      threshold = _getConfig3.threshold;

  var data = page.toJSON(0);
  var json = JSON.parse(data);

  json.__keys.forEach(function (k) {
    var baseMeasurement = (0, _objectutils.deepGet)(k, baseRecording);
    var measurement = (0, _objectutils.deepGet)(k, json);
    var condition = baseMeasurement.duration === 0 || measurement.duration <= baseMeasurement.duration * (1 + threshold);
    (0, _assert.default)(condition, "Expected %s to be less than %s for ".concat(k), measurement.duration, baseMeasurement.duration);
  });
};

exports.compareWithStoredRecording = compareWithStoredRecording;