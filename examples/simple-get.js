'use string';

var stats = require('../');
var start = new Date('2016-01-09');
var end = new Date('2016-01-10');

// get 2 days worth of downloads for micromatch
stats.get(start, end, 'micromatch')
  .on('error', console.error)
  .on('data', function(data) {
    console.log(data);
  })
  .on('end', function() {
    console.log('done.');
  });

// { day: '2016-01-09', downloads: 53331 }
// { day: '2016-01-10', downloads: 47341 }
