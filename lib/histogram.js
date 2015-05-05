Histogram = module.exports = function Histogram() {
  this.points = [];
}

Histogram.prototype.addPoints = function(newPoints) {
  this.points = this.points.concat(newPoints);
};

Histogram.prototype.build = function() {
  var sortedPoints = this.points.sort(function(a, b) {
    return a - b;
  });

  var percentiles = this._getPercentiles(sortedPoints, [25, 75]);
};

Histogram.prototype._getBinSize = function(sortedPoints, percentiles) {
  // uses Freedman–Diaconis rule: http://goo.gl/8K8mwB
  var p25 = this._getPercentile(sortedPoints, 25);
  var p75 = this._getPercentile(sortedPoints, 75);
  var iqr = p75 - p25;
  return Math.ceil(2 * iqr * Math.pow(sortedPoints.length,-1/3));
};

Histogram.prototype._getPercentile = function getPercentile(sortedPoints, p) {
  var nthValue = (sortedPoints.length / 100 * p);
  var beforeIndex = Math.floor(nthValue) - 1;
  // to getting negative indexes
  beforeIndex = beforeIndex < 0 ? 0 : beforeIndex;
  var afterIndex = Math.ceil(nthValue) - 1;

  var percentile = (sortedPoints[beforeIndex] + sortedPoints[afterIndex]) / 2;
  return percentile;
}