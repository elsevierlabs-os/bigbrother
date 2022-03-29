"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _printer = require("./printer");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _replaceInFile = _interopRequireDefault(require("replace-in-file"));

var FileWriter = /*#__PURE__*/function () {
  function FileWriter() {
    (0, _classCallCheck2.default)(this, FileWriter);
  }

  (0, _createClass2.default)(FileWriter, null, [{
    key: "writeJSONToFile",
    value: function writeJSONToFile(json, destinationPath) {
      var shouldStringify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var payload = json;

      if (shouldStringify) {
        payload = JSON.stringify(payload);
      }

      _fs.default.writeFileSync(destinationPath, payload);
    }
  }, {
    key: "copyFile",
    value: function copyFile(source, target) {
      var rd = _fs.default.createReadStream(source);

      var wr = _fs.default.createWriteStream(target);

      return new Promise(function (resolve, reject) {
        rd.on('error', reject);
        wr.on('error', reject);
        wr.on('finish', resolve);
        rd.pipe(wr);
      }).catch(function (error) {
        rd.destroy();
        wr.end();
        throw error;
      });
    }
  }, {
    key: "copyFiles",
    value: function copyFiles(filenames, source, target) {
      var fullFileNames = filenames.map(function (name) {
        return {
          source: _path.default.join(source, name),
          target: _path.default.join(target, name)
        };
      });
      var promises = fullFileNames.map(function (_ref) {
        var source = _ref.source,
            target = _ref.target;
        return FileWriter.copyFile(source, target);
      });
      return Promise.all(promises);
    }
  }, {
    key: "checkAndCreateFolder",
    value: function checkAndCreateFolder(folderPath) {
      try {
        if (!_fs.default.existsSync(folderPath)) {
          _fs.default.mkdirSync(folderPath, {
            recursive: true
          });
        }

        return true;
      } catch (e) {
        (0, _printer.printException)(e);
        return false;
      }
    }
  }, {
    key: "replaceStringInFile",
    value: function replaceStringInFile(file, sourceString, replacement) {
      var options = {
        files: file,
        from: sourceString,
        to: replacement
      };
      return (0, _replaceInFile.default)(options);
    }
  }]);
  return FileWriter;
}();

var _default = FileWriter;
exports.default = _default;