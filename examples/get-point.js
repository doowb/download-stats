'use string';

var stats = require('../');

// get total downloads for the last-month for micromath
stats.get.point('last-month', 'micromatch', function(err, results) {
  if (err) return console.error(err);
  console.log('last-month', results);
});
// last-month { downloads: 7750788, start: '2016-10-10', end: '2016-11-08', package: 'micromatch' }

stats.get.allTime('micromatch', function(err, results) {
  if (err) return console.error(err);
  console.log('all-time', results);
});

stats.get.lastMonth('micromatch', function(err, results) {
  if (err) return console.error(err);
  console.log('last-month', results);
});
// last-month { downloads: 7750788, start: '2016-10-10', end: '2016-11-08', package: 'micromatch' }

stats.get.lastWeek('micromatch', function(err, results) {
  if (err) return console.error(err);
  console.log('last-week', results);
});
// last-week { downloads: 1777065, start: '2016-11-02', end: '2016-11-08', package: 'micromatch' }

stats.get.lastDay('micromatch', function(err, results) {
  if (err) return console.error(err);
  console.log('last-day', results);
});
// last-day { downloads: 316004, start: '2016-11-08', end: '2016-11-08', package: 'micromatch' }
