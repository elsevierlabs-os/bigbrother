"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var AssetsHandler = /*#__PURE__*/function () {
  function AssetsHandler() {
    (0, _classCallCheck2.default)(this, AssetsHandler);
    this.assets = {};
  }

  (0, _createClass2.default)(AssetsHandler, [{
    key: "reset",
    value: function reset() {
      this.assets = {};
    }
  }, {
    key: "store",
    value: function store(id, asset) {
      this.assets[id] = asset;
    }
  }, {
    key: "has",
    value: function has(key) {
      return Boolean(this._filterKeys(key).length);
    }
  }, {
    key: "_filterKeys",
    value: function _filterKeys(key) {
      var regex = new RegExp(key);
      return Object.keys(this.assets).filter(regex.test.bind(regex));
    }
  }, {
    key: "get",
    value: function get(key) {
      var _this = this;

      return this._filterKeys(key).map(function (k) {
        return _this.assets[k];
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.assets;
    }
  }]);
  return AssetsHandler;
}();

var _default = AssetsHandler;
exports.default = _default;