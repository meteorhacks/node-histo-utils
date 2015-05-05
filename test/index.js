var HistoUtils = require('../lib/index');
var assert = require('assert');

suite('HistoUtils.create', function() {
  test('create and build', function() {
    var h = new HistoUtils.create();
    var points = [1, 2, 3, 4, 5, 6, 7,8, 9, 10];
    h.addPoints(points);
    var builtHistogram = h.build();
    assert.deepEqual(builtHistogram, {
      bins: [[1, 5], [6, 5]],
      binSize: 5
    });
  }); 
});

suite('HistoUtils.merge', function() {
  test('merge histograms with same bins', function() {
    var a = {
      bins: [[100, 200], [200, 400], [300, 500]],
      binSize: 100
    };
    var b = {
      bins: [[100, 5500], [200, 300], [300, 100]],
      binSize: 100
    };
    var expected = {
      bins: [[100, 5700], [200, 700], [300, 600]],
      binSize: 100
    };

    var merged = HistoUtils.merge([a, b]);
    assert.deepEqual(merged, expected);
  }); 

  test('merge histograms with different bins', function() {
    var a = {
      bins: [[100, 200], [200, 400], [300, 500]],
      binSize: 100
    };
    var b = {
      bins: [[100, 5500], [500, 344], [900, 844]],
      binSize: 100
    };
    var expected = {
      bins: [[100, 5700], [200, 400], [300, 500], [500, 344], [900, 844]],
      binSize: 100
    };

    var merged = HistoUtils.merge([a, b]);
    assert.deepEqual(merged, expected);
  }); 

  test("merge histograms with multiple bin sizes");
});

suite('HistoUtils.getPercentiles', function() {
  test('get one percentile', function() {
    var histogram = {
      bins: [[100, 200], [200, 400], [400, 200]],
      binSize: 100
    };
    var percentiles = HistoUtils.getPercentiles(histogram, [50]);
    assert.deepEqual(percentiles, {"50": 200});
  });

  test('get multiple percentile', function() {
    var histogram = {
      bins: [[100, 10], [200, 80], [300, 8], [400, 2]],
      binSize: 100
    };
    var percentiles = HistoUtils.getPercentiles(histogram, [50, 95, 99]);
    assert.deepEqual(percentiles, {
      "50": 200,
      "95": 300,
      "99": 400
    });
  });

  test('duplicated bins', function() {
    var histogram = {
      bins: [[100, 10], [100, 45], [200, 45]],
      binSize: 100
    };
    var percentiles = HistoUtils.getPercentiles(histogram, [50, 60]);
    assert.deepEqual(percentiles, {"50": 100, "60": 200});
  });
});