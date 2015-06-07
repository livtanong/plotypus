"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var DataManager = function DataManager(datasets) {
	_classCallCheck(this, DataManager);
};

exports["default"] = DataManager;
module.exports = exports["default"];

// datasets is an array of datasets

// job is to take the datasets, and return a sensible minimum, maximum, and interval for all plotypus components using these datasets.