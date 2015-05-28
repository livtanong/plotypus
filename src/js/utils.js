var utils = {
  processNumberString: function(n){
    return parseFloat(n) || n;
  },
  sanify: function(n, places){
    var places = places || 5;
    var placeValue = Math.pow(10, places);
    if (isFinite(n)) {
      return parseFloat(Math.round(n * placeValue)/placeValue)
    } else {
      return n;
    }
  },
  formatDecimals: function(n, places){
    var placeValue = Math.pow(10, places);
    if (isFinite(n)) {
      return parseFloat(Math.round(n * placeValue)/placeValue).toFixed(places);
    } else {
      return n;
    }
  },
  toPercent: function (n){
    return n * 100 + "%";
  }
}

module.exports = utils;