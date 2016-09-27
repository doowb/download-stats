'use strict';

require('mocha');
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
  });
});
