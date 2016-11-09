'use strict';

require('mocha');
var moment = require('moment');
var assert = require('assert');
var stats = require('./');

describe('download-stats', function() {
  describe('get', function() {
    this.timeout(10000);

    it('should get downloads', function(cb) {
      var downloads = [];
      stats.get('1900-01-01', '3000-01-01', 'download-stats')
        .on('data', function(data) {
          downloads.push(data);
        })
        .once('error', cb)
        .once('end', function() {
          try {
            assert(downloads.length > 0, 'expected download data');
            cb();
          } catch (err) {
            cb(err);
          }
        });
    });
  });

  describe('calculate', function() {
    it('should calculate total downloads', function() {
      var downloads = [
        { downloads: 1 },
        { downloads: 2 },
        { downloads: 3 }
      ];
      assert.equal(stats.calc.total(downloads), 6);
    });

    describe('group', function() {
      it('should return last X days in an array', function() {
        var today = moment.utc();
        var start = today.clone().subtract(50, 'days');
        var arr = [];
        while (start.isSameOrBefore(today)) {
          arr.push({day: start.format('YYYY-MM-DD'), downloads: 5});
          start.add(1, 'days');
        }

        var expected = arr.slice(-30);
        var actual = stats.calc.group.last(30, arr);
        assert.deepEqual(actual, expected);
      });

      it('should return last X days before specified date in an array', function() {
        var arr = [
          { day: '2016-11-02', downloads: 5},
          { day: '2016-11-01', downloads: 5},
          { day: '2016-10-31', downloads: 5},
          { day: '2016-10-30', downloads: 5},
          { day: '2016-10-29', downloads: 5},
          { day: '2016-10-28', downloads: 5},
          { day: '2016-10-27', downloads: 5},
          { day: '2016-10-26', downloads: 5},
          { day: '2016-10-25', downloads: 5},
        ];
        var expected = [
          { day: '2016-10-30', downloads: 5},
          { day: '2016-10-29', downloads: 5},
          { day: '2016-10-28', downloads: 5},
          { day: '2016-10-27', downloads: 5},
          { day: '2016-10-26', downloads: 5},
        ]
        assert.deepEqual(stats.calc.group.last(5, arr, '2016-10-30'), expected);
      });

      it('should return prev X days in an array', function() {
        var today = moment.utc();
        var start = today.clone().subtract(50, 'days');
        var arr = [];
        while (start.isSameOrBefore(today)) {
          arr.push({day: start.format('YYYY-MM-DD'), downloads: 5});
          start.add(1, 'days');
        }

        var expected = arr.slice(arr.length - 10, arr.length - 5);
        // console.log(arr, expected);
        assert.deepEqual(stats.calc.group.prev(5, arr), expected);
      });

      it('should return prev X days before specified date in an array', function() {
        var arr = [
          { day: '2016-11-02', downloads: 5},
          { day: '2016-11-01', downloads: 5},
          { day: '2016-10-31', downloads: 5},
          { day: '2016-10-30', downloads: 5},
          { day: '2016-10-29', downloads: 5},
          { day: '2016-10-28', downloads: 5},
          { day: '2016-10-27', downloads: 5},
          { day: '2016-10-26', downloads: 5},
          { day: '2016-10-25', downloads: 5},
          { day: '2016-10-24', downloads: 5},
          { day: '2016-10-23', downloads: 5},
          { day: '2016-10-22', downloads: 5},
          { day: '2016-10-21', downloads: 5},
          { day: '2016-10-20', downloads: 5},
          { day: '2016-10-19', downloads: 5},
        ];
        var expected = [
          { day: '2016-10-25', downloads: 5},
          { day: '2016-10-24', downloads: 5},
          { day: '2016-10-23', downloads: 5},
          { day: '2016-10-22', downloads: 5},
          { day: '2016-10-21', downloads: 5},
        ]
        assert.deepEqual(stats.calc.group.prev(5, arr, '2016-10-30'), expected);
      });
    });
  });
});
