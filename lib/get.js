'use strict';
var utils = require('./utils');

/**
 * Get a range of download counts for the specified repository.
 * This method returns a stream of raw data
 * in the form of `{ day: '2016-01-10', downloads: 123456 }`.
 *
 * ```js
 * var start = new Date('2016-01-09');
 * var end = new Date('2016-01-10');
 * stats.get(start, end, 'micromatch')
 *   .on('error', console.error)
 *   .on('data', function(data) {
 *     console.log(data);
 *   })
 *   .on('end', function() {
 *     console.log('done.');
 *   });
 * // { day: '2016-01-09', downloads: 53331 }
 * // { day: '2016-01-10', downloads: 47341 }
 * ```
 *
 * @param  {Date} `start` Start date of stream.
 * @param  {Date} `end`   End date of stream.
 * @param  {String} `repo`  Repository to get downloads for. If `repo` is not passed, then all npm downloads for the day will be returned.
 * @return {Stream} Stream of download data.
 * @api public
 */

module.exports = function get(start, end, repo) {
  var stream = new utils.stream.Stream();
  var url = 'https://api.npmjs.org/downloads/range/';
  url += utils.format(start);
  url += ':' + utils.format(end);
  url += (repo ? '/' + repo : '');

  var bulk = false;
  if (repo && repo.indexOf(',') > -1) {
    bulk = true;
  }

  process.nextTick(function() {
    var req = utils.https.get(url, function(res) {
      res.on('error', console.error)
        .pipe(utils.JSONStream.parse(bulk ? '*' : 'downloads.*'))
        .on('error', stream.emit.bind(stream, 'error'))
        .on('data', function(data) {
          stream.emit('data', data);
        })
        .on('end', stream.emit.bind(stream, 'end'));
    });

    req.on('error', stream.emit.bind(stream, 'error'));
  });

  return stream;
};

/**
 * Get a specific point (all-time, last-month, last-week, last-day)
 *
 * ```js
 * stats.get.period('last-day', 'micromatch')
 *   .on('error', console.error)
 *   .on('data', function(data) {
 *     console.log(data);
 *   })
 *   .on('end', function() {
 *     console.log('done.');
 *   });
 * // { day: '2016-01-10', downloads: 47341 }
 * ```
 * @param  {String} `period` Period to retrieve downloads for.
 * @param  {String} `repo` Repository to retrieve downloads for.
 * @return {Stream} Stream of download data.
 * @api public
 */

module.exports.point = function(period, repo) {
  var stream = new utils.stream.Stream();
  var url = 'https://api.npmjs.org/downloads/point/';
  url += period;
  url += (repo ? '/' + repo : '');

  process.nextTick(function() {
    var req = utils.https.get(url, function(res) {
      res.on('error', console.error)
        .pipe(utils.JSONStream.parse())
        .on('error', stream.emit.bind(stream, 'error'))
        .on('data', stream.emit.bind(stream, 'data'))
        .on('end', stream.emit.bind(stream, 'end'))
    });

    req.on('error', stream.emit.bind(stream, 'error'));
  });

  return stream;
};
