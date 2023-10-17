"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recordingExists = exports.recordPage = exports.getPageRecording = exports.compareWithStoredRecording = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _config = require("../config");
var _constants = require("../lib/constants");
var _object = require("../lib/utils/object");
var _assert = _interopRequireDefault(require("../expectations/assert"));
var _FileWriter = _interopRequireDefault(require("../lib/FileWriter"));
var buildFileName = function buildFileName(name) {
  return name.concat(_constants.RECORDING_EXT);
};
var buildRecordingsFolderPath = function buildRecordingsFolderPath() {
  var _getConfig = (0, _config.getConfig)(),
    cwd = _getConfig.cwd,
    recordingsPath = _getConfig.recordingsPath;
  return _path.default.join(cwd, recordingsPath);
};
var buildRecordingFullPath = function buildRecordingFullPath(name) {
  var filename = buildFileName(name);
  return _path.default.join(buildRecordingsFolderPath(), filename);
};
var recordingExists = function recordingExists(page) {
  return _fs.default.existsSync(buildRecordingFullPath(page.name));
};
exports.recordingExists = recordingExists;
var recordPage = function recordPage(page) {
  var fullPath = buildRecordingFullPath(page.name);
  var data = page.toJSON(0);
  var recordingFolderPath = buildRecordingsFolderPath();
  if (_FileWriter.default.checkAndCreateFolder(recordingFolderPath)) {
    _FileWriter.default.writeJSONToFile(data, fullPath);
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
  var _getConfig2 = (0, _config.getConfig)(),
    threshold = _getConfig2.threshold;
  var data = page.toJSON(0);
  var json = JSON.parse(data);
  json.__keys.forEach(function (k) {
    var baseMeasurement = (0, _object.deepGet)(k, baseRecording);
    var measurement = (0, _object.deepGet)(k, json);
    var condition = baseMeasurement.duration === 0 || measurement.duration <= baseMeasurement.duration * (1 + threshold);
    (0, _assert.default)(condition, "Expected %s to be less than %s for ".concat(k), measurement.duration, baseMeasurement.duration);
  });
};
exports.compareWithStoredRecording = compareWithStoredRecording;