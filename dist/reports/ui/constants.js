"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomColor = exports.WIDTH = exports.HEIGHT = exports.COLORS = void 0;
var HEIGHT = 400;
exports.HEIGHT = HEIGHT;
var WIDTH = 1500;
exports.WIDTH = WIDTH;
var COLORS = ['#1abc9c', '#16a085', '#f1c40f', '#f39c12', '#2ecc71', '#27ae60', '#e67e22', '#d35400', '#3498db', '#2980b9', '#e74c3c', '#c0392b', '#9b59b6', '#8e44ad', '#34495e', '#2c3e50', '#95a5a6', '#7f8c8d'];
exports.COLORS = COLORS;

var getRandomColor = function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

exports.getRandomColor = getRandomColor;