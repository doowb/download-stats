'use strict';
var utils = require('./utils');

module.exports = function (start, end, repo) {
	var url = 'https://api.npmjs.org/downloads/range/';
	url += utils.format(start);
	url += ':' + utils.format(end);
	url += (repo ? '/' + repo : '');

	return utils.request(url)
    .on('error', console.error)
		.pipe(utils.JSONStream.parse('downloads.*'));
}
