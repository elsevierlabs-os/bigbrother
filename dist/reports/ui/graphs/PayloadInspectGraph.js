"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getGraphData = exports.parseData = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _recharts = require("recharts");

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var parseData = function parseData(data) {
  var tests = [];
  data.forEach(function (_ref) {
    var pages = _ref.pages;
    var keys = {};
    pages.forEach(function (_ref2) {
      var assets = _ref2.assets;
      Object.keys(assets).forEach(function (k) {
        var parsed = k.split('/').pop();

        if (parsed in keys) {
          keys[parsed].push(assets[k]);
        } else {
          keys[parsed] = [];
          keys[parsed].push(assets[k]);
        }
      });
    });
    tests.push(keys);
  });
  return tests;
};

exports.parseData = parseData;

var getGraphData = function getGraphData(tests) {
  var data = [];
  tests.forEach(function (test, i) {
    var assets = Object.keys(test).reduce(function (acc, asset) {
      var amount = 1;
      acc[asset] = test[asset].reduce(function (tot, _ref3) {
        var length = _ref3.length;
        amount++;
        tot += length;
        return tot;
      }, 0) / amount;
      return acc;
    }, {});
    data.push(_objectSpread({
      name: "".concat(i),
      total: Object.keys(assets).reduce(function (tot, asset) {
        return tot + assets[asset];
      }, 0)
    }, assets));
  });
  return data;
};

exports.getGraphData = getGraphData;

var mapAssetsToBars = function mapAssetsToBars(tests, stacked) {
  return Object.keys(tests[0]).map(function (asset) {
    var extraProps = stacked ? {
      stackId: 'a'
    } : {};
    return /*#__PURE__*/_react["default"].createElement(_recharts.Bar, (0, _extends2["default"])({
      dataKey: asset
    }, extraProps, {
      barSize: 20,
      fill: (0, _constants.getRandomColor)()
    }));
  });
};

var PayloadInspectGraph = function PayloadInspectGraph(_ref4) {
  var data = _ref4.data;
  var tests = parseData(data);
  var graphData = getGraphData(tests);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      stacked = _useState2[0],
      setStacked = _useState2[1];

  var onInputChange = function onInputChange(e) {
    setStacked(e.target.checked);
  };

  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "graph-title"
  }, "Payload composition"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "graph-actions"
  }, /*#__PURE__*/_react["default"].createElement("label", null, "Stacked"), /*#__PURE__*/_react["default"].createElement("input", {
    type: 'checkbox',
    onChange: onInputChange
  })), /*#__PURE__*/_react["default"].createElement(_recharts.ComposedChart, {
    width: _constants.WIDTH,
    height: _constants.HEIGHT,
    data: graphData
  }, /*#__PURE__*/_react["default"].createElement(_recharts.XAxis, {
    dataKey: "name"
  }), /*#__PURE__*/_react["default"].createElement(_recharts.YAxis, {
    dataKey: "total"
  }), /*#__PURE__*/_react["default"].createElement(_recharts.Tooltip, null), /*#__PURE__*/_react["default"].createElement(_recharts.Legend, null), /*#__PURE__*/_react["default"].createElement(_recharts.CartesianGrid, {
    stroke: "#f5f5f5"
  }), mapAssetsToBars(tests, stacked), /*#__PURE__*/_react["default"].createElement(_recharts.Line, {
    type: "monotone",
    dataKey: "total",
    stroke: "#ff7300"
  })));
};

var _default = PayloadInspectGraph;
exports["default"] = _default;