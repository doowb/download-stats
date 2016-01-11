'use strict';

var utils = require('./utils');

var calculate = module.exports = {};

calculate.total = function (arr) {
  var len = arr.length, i = 0;
  var total = 0;
  while (len--) total += arr[i++].downloads || 0;
  return total;
};

calculate.before = function(day, arr) {
  var end = utils.format(new Date(day));
  var group = [];
  var len = arr.length, i = 0;
  while (len--) {
    var download = arr[i++];
    if (download.day <= end) {
      group.push(download);
    }
  }
  return calculate.total(group);
};

calculate.last = function (days, arr, init) {
  var today = init ? new Date(init) : new Date();
  var start = new Date(today);
  start.setUTCDate(start.getUTCDate() - days);
  today = utils.format(today);
  start = utils.format(start);

  var group = [];
  var len = arr.length, i = 0;
  while (len--) {
    var download = arr[i++];
    if (download.day >= start && download.day <= today) {
      group.push(download);
    }
  }
  return calculate.total(group);
};

calculate.prev = function (days, arr, init) {
  var today = init ? new Date(init) : new Date();
  var end = new Date(today);
  end.setUTCDate(end.getUTCDate() - days);
  var start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days);
  end = utils.format(end);
  start = utils.format(start);

  var group = [];
  var len = arr.length, i = 0;
  while (len--) {
    var download = arr[i++];
    if (download.day >= start && download.day < end) {
      group.push(download);
    }
  }
  return calculate.total(group);
};

calculate.group = function (arr, fn) {
  var groups = {};
  var len = arr.length, i = 0;
  while (len--) {
    var download = arr[i++];
    var group = fn(download);
    groups[group] = groups[group] || [];
    groups[group].push(download);
  }
  return groups;
};

calculate.groupTotals = function (groups) {
  var res = {};
  var keys = Object.keys(groups);
  var len = keys.length, i = 0;
  while (len--) {
    var key = keys[i++];
    res[key] = calculate.total(groups[key]);
  }
  return res;
};

calculate.monthly = function (arr) {
  var months = calculate.group(arr, function (download) {
    return download.day.substr(0, 7);
  });
  return calculate.groupTotals(months);
};

calculate.yearly = function (arr) {
  var years = calculate.group(arr, function (download) {
    return download.day.substr(0, 4);
  });
  return calculate.groupTotals(years);
};
