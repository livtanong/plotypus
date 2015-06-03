"use strict";

var utils = {
  processNumberString: function processNumberString(n) {
    return parseFloat(n) || n;
  },
  sanify: function sanify(n, places) {
    var places = places || 5;
    var placeValue = Math.pow(10, places);
    if (isFinite(n)) {
      return parseFloat(Math.round(n * placeValue) / placeValue);
    } else {
      return n;
    }
  },
  formatDecimals: function formatDecimals(n, places) {
    var placeValue = Math.pow(10, places);
    if (isFinite(n)) {
      return parseFloat(Math.round(n * placeValue) / placeValue).toFixed(places);
    } else {
      return n;
    }
  },
  toPercent: function toPercent(n) {
    return n * 100 + "%";
  }
};

module.exports = utils;