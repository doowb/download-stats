'use string';

var stats = require('../');

// get total downloads for the last-month for micromath
stats.get.point('last-month', 'micromatch')
  .on('error', console.error)
  .on('data', function(data) {
    console.log(data);
  })
  .on('end', function() {
    console.log('done.');
  });

// { downloads: 7750788, start: '2016-10-10', end: '2016-11-08', package: 'micromatch' }
