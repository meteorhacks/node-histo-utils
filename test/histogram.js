var HistoUtils = require('../lib/index');
var assert = require('assert');

suite('HistoUtils.create', function() {
  test('create a histogram');
  test('create and build histogram');
  test('automatically decide the bin size');
});

suite('HistoUtils.merge', function() {
  test('merge histograms with same bins', function() {
    var a = [[100, 200], [200, 400], [300, 500]];
    var b = [[100, 5500], [200, 300], [300, 100]];
    var expected = [[100, 5700], [200, 700], [300, 600]];

    var merged = HistoUtils.merge([a, b]);
    assert.deepEqual(merged, expected);
  }); 

  test('merge histograms with different bins', function() {
    var a = [[100, 200], [200, 400], [300, 500]];
    var b = [[100, 5500], [500, 344], [900, 844]];
    var expected = [[100, 5700], [200, 400], [300, 500], [500, 344], [900, 844]];

    var merged = HistoUtils.merge([a, b]);
    assert.deepEqual(merged, expected);
  }); 

  test("merge histograms with multiple bin sizes");
});

suite('HistoUtils.getPercentiles', function() {
  test('get one percentile', function() {
    var histogram = [[100, 200], [200, 400], [100, 200]];
    var percentiles = HistoUtils.getPercentiles(histogram, [50]);
    assert.deepEqual(percentiles, {"50": 200});
  });

  test('get multiple percentile', function() {
    var histogram = [[100, 10], [200, 80], [300, 8], [400, 2]];
    var percentiles = HistoUtils.getPercentiles(histogram, [50, 95, 99]);
    assert.deepEqual(percentiles, {
      "50": 200,
      "95": 300,
      "99": 400
    });
  });
});