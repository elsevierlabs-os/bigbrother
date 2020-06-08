"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _glob = _interopRequireDefault(require("glob"));

var _fs = _interopRequireDefault(require("fs"));

var _config = require("../config");

var _printer = require("./printer");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var NODE_MODULES_IGNORE_PATTERN = 'node_modules/**/*.*';

var FileReader = /*#__PURE__*/function () {
  function FileReader() {
    (0, _classCallCheck2["default"])(this, FileReader);
  }

  (0, _createClass2["default"])(FileReader, null, [{
    key: "getIgnoredFiles",
    value: function getIgnoredFiles() {
      var _getConfig = (0, _config.getConfig)(),
          ignore = _getConfig.ignore;

      return [NODE_MODULES_IGNORE_PATTERN].concat((0, _toConsumableArray2["default"])(ignore));
    }
  }, {
    key: "validateFileNames",
    value: function validateFileNames(filenames) {
      return filenames.length > 0;
    }
  }, {
    key: "readFolderContent",
    value: function readFolderContent(folderPath, pattern) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var globOptions = _objectSpread({
        cwd: folderPath
      }, options);

      if (!pattern) {
        (0, _printer.printInfo)(folderPath, pattern, options);
        (0, _printer.printFilePatternError)(pattern);
        return Promise.reject();
      }

      return FileReader.getFiles(pattern, globOptions);
    }
  }, {
    key: "readTestFiles",
    value: function readTestFiles() {
      var globOptions = {
        ignore: FileReader.getIgnoredFiles()
      };

      var _getConfig2 = (0, _config.getConfig)(),
          pattern = _getConfig2.pattern;

      if (!pattern) {
        (0, _printer.printFilePatternError)(pattern);
        return Promise.reject();
      }

      return FileReader.getFiles(pattern, globOptions).then(FileReader.onFilesFound);
    }
  }, {
    key: "getFiles",
    value: function getFiles(pattern, globOptions) {
      return new Promise(function (resolve, reject) {
        (0, _glob["default"])(pattern, globOptions, function (err, filenames) {
          if (err) {
            (0, _printer.printError)(err);
            reject(err);
          } else {
            if (FileReader.validateFileNames(filenames)) {
              resolve(filenames);
            } else {
              (0, _printer.printFilePatternError)(pattern);
              resolve([]);
            }
          }
        });
      });
    }
  }, {
    key: "readSingleFile",
    value: function readSingleFile(filename) {
      return new Promise(function (resolve, reject) {
        _fs["default"].readFile(filename, 'utf8', function (err, content) {
          if (err) {
            reject(err);
          } else {
            resolve({
              filename: filename,
              content: content
            });
          }
        });
      });
    }
  }, {
    key: "readFilesList",
    value: function readFilesList(filenames) {
      return Promise.all(filenames.map(FileReader.readSingleFile));
    }
  }, {
    key: "onFilesFound",
    value: function onFilesFound(filenames) {
      var suitesLabel = filenames.length > 1 ? 'suites' : 'suite';
      (0, _printer.printInfo)("Found ".concat(filenames.length, " ").concat(suitesLabel));
      return FileReader.readFilesList(filenames);
    }
  }]);
  return FileReader;
}();

var _default = FileReader;
exports["default"] = _default;