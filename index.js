/*!
 * download-stats <https://github.com/doowb/download-stats>
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';
var calc = require('./lib/calculate');
var utils = require('./lib/utils');
var get = require('./lib/get');
var stats = {};

stats.get = get;
stats.calc = calc;

module.exports = stats;
