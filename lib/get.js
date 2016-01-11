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
 */

module.exports = function (start, end, repo) {
	var url = 'https://api.npmjs.org/downloads/range/';
	url += utils.format(start);
	url += ':' + utils.format(end);
	url += (repo ? '/' + repo : '');

	return utils.request(url)
    .on('error', console.error)
		.pipe(utils.JSONStream.parse('downloads.*'));
}
