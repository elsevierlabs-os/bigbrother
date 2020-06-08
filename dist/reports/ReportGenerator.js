"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _path = _interopRequireDefault(require("path"));

var _TestRunner = _interopRequireDefault(require("../runner/TestRunner"));

var _config = require("../config");

var _FileWriter = _interopRequireDefault(require("../lib/FileWriter"));

var _FileReader = _interopRequireDefault(require("../lib/FileReader"));

var _printer = require("../lib/printer");

var _constants = require("../lib/constants");

var _process = require("../lib/utils/process");

var ReportGenerator = /*#__PURE__*/function () {
  function ReportGenerator() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, ReportGenerator);
    (0, _defineProperty2["default"])(this, "getReportFileName", function () {
      var timestamp = ReportGenerator.buildTimeStamp();
      return _constants.REPORT_FILENAME_ROOT.concat(timestamp).concat(_constants.REPORT_FILENAME_EXTENSION);
    });
    (0, _defineProperty2["default"])(this, "getReportFolderPath", function () {
      var _getConfig = (0, _config.getConfig)(),
          cwd = _getConfig.cwd,
          reportPath = _getConfig.reportPath;

      return _path["default"].join(cwd, reportPath);
    });
    (0, _defineProperty2["default"])(this, "getStaticFolderPath", function (staticFolder) {
      var _getConfig2 = (0, _config.getConfig)(),
          cwd = _getConfig2.cwd;

      return _path["default"].join(cwd, (0, _process.getEnvFlag)(_process.LOCAL_DEVELOPMENT_ENV_FLAG) === 'true' ? _constants.EMPTY : _constants.REPORT_STATIC_FILES_NODE_MODULES, staticFolder);
    });
    (0, _defineProperty2["default"])(this, "getFullReportPathFromFilename", function (name) {
      return _path["default"].join(_this.getReportFolderPath(), name);
    });
    (0, _defineProperty2["default"])(this, "addFolderPathToReportFilenames", function (files) {
      return Promise.resolve(files.map(_this.getFullReportPathFromFilename));
    });
    (0, _defineProperty2["default"])(this, "getAllReports", function () {
      var reportPath = _this.getReportFolderPath();

      var options = {
        ignore: [_constants.FULL_REPORT_FILENAME]
      };
      return _FileReader["default"].readFolderContent(reportPath, _constants.REPORT_FILE_PATTERN, options).then(_this.addFolderPathToReportFilenames).then(_FileReader["default"].readFilesList);
    });
    (0, _defineProperty2["default"])(this, "generateCurrentReport", function () {
      return new Promise(function (resolve, reject) {
        try {
          var payload = {
            testRunner: _TestRunner["default"].toJSON(),
            pages: _this.pages,
            config: (0, _config.getConfig)()
          };

          _this.storeCurrentReport(payload);

          var filename = _this.getReportFileName();

          var fullPath = _this.getFullReportPathFromFilename(filename);

          _FileWriter["default"].writeJSONToFile(payload, fullPath, true);

          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
    (0, _defineProperty2["default"])(this, "handleReportStaticFilesCopy", function (filenames) {
      var source = _this.getStaticFolderPath(_constants.REPORT_STATIC_FILES_FOLDER);

      var target = _this.getReportFolderPath();

      return _FileWriter["default"].copyFiles(filenames, source, target);
    });
    (0, _defineProperty2["default"])(this, "replaceReportInIndexHtml", function (json) {
      return _FileWriter["default"].replaceStringInFile(_this.getFullReportPathFromFilename(_constants.REPORT_INDEX_HTML), _constants.REPORT_TARGET_STRING, JSON.stringify(json));
    });
    (0, _defineProperty2["default"])(this, "replaceCurrentReportInIndexHtml", function () {
      return _FileWriter["default"].replaceStringInFile(_this.getFullReportPathFromFilename(_constants.REPORT_INDEX_HTML), _constants.REPORT_CURRENT_REPORT_TARGET_STRING, JSON.stringify(_this.getCurrentReport()));
    });
    (0, _defineProperty2["default"])(this, "mapReportToJson", function (_ref) {
      var content = _ref.content;
      return JSON.parse(content);
    });
    (0, _defineProperty2["default"])(this, "generateFullReport", function (reports) {
      return new Promise(function (resolve, reject) {
        try {
          var json = {
            data: reports.map(_this.mapReportToJson)
          };
          (0, _printer.printInfo)(_constants.REPORT_ABOUT_TO_GENERATE);

          _FileWriter["default"].writeJSONToFile(json, _this.getFullReportPathFromFilename(_constants.FULL_REPORT_FILENAME), true);

          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    });
    (0, _defineProperty2["default"])(this, "generateReport", function () {
      (0, _printer.printInfo)(_constants.REPORT_GENERATION_STARTED);
      return _this.copyReportIndexHtmlToDestination().then(_this.generateCurrentReport).then(_this.getAllReports).then(_this.generateFullReport).then(_this.replaceReportInIndexHtml).then(_this.replaceCurrentReportInIndexHtml);
    });
    (0, _defineProperty2["default"])(this, "openReport", function () {
      var _getConfig3 = (0, _config.getConfig)(),
          openReport = _getConfig3.openReport;

      if (openReport) {
        (0, _printer.printInfo)(_constants.REPORT_ABOUT_TO_OPEN);
        (0, _process.executeTask)(_process.TASKS.open, _this.getFullReportPathFromFilename(_constants.REPORT_INDEX_HTML));
      } else {
        (0, _printer.printInfo)(_constants.REPORT_OPEN_DISABLED);
      }
    });
    this.pages = [];
    this.currentReport = {};
  }

  (0, _createClass2["default"])(ReportGenerator, [{
    key: "storePage",
    value: function storePage(page) {
      var shouldStringify = false;
      var spacing = 0;
      var json = page.toJSON(spacing, shouldStringify);
      this.pages.push(json);
    }
  }, {
    key: "storeCurrentReport",
    value: function storeCurrentReport(report) {
      this.currentReport = report;
    }
  }, {
    key: "getCurrentReport",
    value: function getCurrentReport() {
      return this.currentReport || {};
    }
  }, {
    key: "copyReportIndexHtmlToDestination",
    value: function copyReportIndexHtmlToDestination() {
      if (_FileWriter["default"].checkAndCreateFolder(this.getReportFolderPath())) {
        (0, _printer.printInfo)(_constants.REPORT_FOLDER_CREATED);
        var staticFilesFolder = this.getStaticFolderPath(_constants.REPORT_STATIC_FILES_FOLDER);
        return _FileReader["default"].readFolderContent(staticFilesFolder, _constants.REPORT_STATIC_FILES_ALL_PATTERN).then(this.handleReportStaticFilesCopy);
      }

      (0, _printer.printInfo)(_constants.REPORT_FOLDER_ALREADY_EXISTS);
      return Promise.resolve();
    }
  }], [{
    key: "buildTimeStamp",
    value: function buildTimeStamp() {
      var date = new Date();
      return "".concat(date.getDate(), "_").concat(date.getMonth() + 1, "_").concat(date.getFullYear());
    }
  }]);
  return ReportGenerator;
}();

var _default = new ReportGenerator();

exports["default"] = _default;