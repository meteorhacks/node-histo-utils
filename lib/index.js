var _ = require('underscore');
var Histogram = require('./histogram');

var HistoUtils = module.exports = {};
HistoUtils.create = function create() {
  return new Histogram();
};

HistoUtils.merge = function merge(histograms) {
  var bins = {};
  histograms.forEach(function(histogram) {
    histogram.bins.forEach(function(item) {
      var bin = item[0];
      var val = item[1];

      if(!bins[bin]) {
        bins[bin] = val;
      } else {
        bins[bin] += val;
      }
    });
  });

  var newHistogram = {
    bins: [],
    binSize: 100
  };
  var binKeys = _.keys(bins).sort(function(a, b) {
    return a - b;
  });

  binKeys.forEach(function(key) {
    newHistogram.bins.push([parseInt(key), bins[key]])
  });

  return newHistogram;
};

HistoUtils.getPercentiles = function getPecentiles(histogram, percentiles) {
  var totalItems = 0;
  histogram.bins.forEach(function(item) {
    totalItems += item[1];
  });

  var percentileMapper = [];
  var donePercentiles = {};
  percentiles.forEach(function(percentile) {
    percentileMapper.push({
      p: percentile,
      i: Math.ceil((percentile/100) * totalItems)
    });
  });

  var itemsUpto = 0;
  histogram.bins.forEach(function(item) {
    var beginItems = itemsUpto;
    var endItems = itemsUpto = itemsUpto + item[1];

    checkForPercentile();
    function checkForPercentile() {
      var p = percentileMapper.shift();
      if(!p) {
        return;
      }

      if(p.i > beginItems && p.i <= endItems) {
        donePercentiles[p.p] = item[0];
        checkForPercentile();
      } else {
        percentileMapper.unshift(p);
      }
    }

  });

  return donePercentiles;
};