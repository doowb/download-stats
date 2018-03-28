# download-stats [![NPM version](https://img.shields.io/npm/v/download-stats.svg?style=flat)](https://www.npmjs.com/package/download-stats) [![NPM downloads](https://img.shields.io/npm/dm/download-stats.svg?style=flat)](https://npmjs.org/package/download-stats) [![Linux Build Status](https://img.shields.io/travis/doowb/download-stats.svg?style=flat&label=Travis)](https://travis-ci.org/doowb/download-stats)

> Get and calculate npm download stats for npm modules.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Get downloads](#get-downloads)
- [Calculate](#calculate)
- [About](#about)
  * [Related projects](#related-projects)
  * [Contributing](#contributing)
  * [Contributors](#contributors)
  * [Release history](#release-history)
  * [Building docs](#building-docs)
  * [Running tests](#running-tests)
  * [Author](#author)
  * [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save download-stats
```

## Usage

```js
var stats = require('download-stats');
```

## API

### [.get](index.js#L42)

Get a range of download counts for the specified repository. This method returns a stream of raw data in the form of `{ day: '2016-01-10', downloads: 123456 }`.

**Example**

```js
var start = new Date('2016-01-09');
var end = new Date('2016-01-10');
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
```

**Params**

* `start` **{Date}**: Start date of stream.
* `end` **{Date}**: End date of stream.
* `repo` **{String}**: Repository to get downloads for. If `repo` is not passed, then all npm downloads for the day will be returned.
* `returns` **{Stream}**: Stream of download data.

### [.calc](index.js#L52)

Calculate object containing methods to calculate stats on arrays of download counts.
See [calculate][#calculate] api docs for more information.

## Get downloads

### [get](lib/get.js#L31)

Get a range of download counts for the specified repository. This method returns a stream of raw data in the form of `{ day: '2016-01-10', downloads: 123456 }`.

**Example**

```js
var start = new Date('2016-01-09');
var end = new Date('2016-01-10');
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
```

**Params**

* `start` **{Date}**: Start date of stream.
* `end` **{Date}**: End date of stream.
* `repo` **{String}**: Repository to get downloads for. If `repo` is not passed, then all npm downloads for the day will be returned.
* `returns` **{Stream}**: Stream of download data.

### [.point](lib/get.js#L76)

Get a specific point (all-time, last-month, last-week, last-day)

**Example**

```js
stats.get.point('last-day', 'micromatch', function(err, results) {
  if (err) return console.error(err);
  console.log(results);
});
// { day: '2016-01-10', downloads: 47341 }
```

**Params**

* `period` **{String}**: Period to retrieve downloads for.
* `repo` **{String}**: Repository to retrieve downloads for.
* `cb` **{Function}**: Callback function to get results

### [.allTime](lib/get.js#L112)

Get the all time total downloads for a repository.

**Example**

```js
stats.get.allTime('micromatch', function(err, results) {
  if (err) return console.error(err);
  console.log(results);
});
// { day: '2016-01-10', downloads: 47341 }
```

**Params**

* `repo` **{String}**: Repository to retrieve downloads for.
* `cb` **{Function}**: Callback function to get results

### [.lastMonth](lib/get.js#L131)

Get the last month's total downloads for a repository.

**Example**

```js
stats.get.lastMonth('micromatch', function(err, results) {
  if (err) return console.error(err);
  console.log(results);
});
// { downloads: 7750788, start: '2016-10-10', end: '2016-11-08', package: 'micromatch' }
```

**Params**

* `repo` **{String}**: Repository to retrieve downloads for.
* `cb` **{Function}**: Callback function to get results

### [.lastWeek](lib/get.js#L150)

Get the last week's total downloads for a repository.

**Example**

```js
stats.get.lastWeek('micromatch', function(err, results) {
  if (err) return console.error(err);
  console.log(results);
});
// { downloads: 1777065, start: '2016-11-02', end: '2016-11-08', package: 'micromatch' }
```

**Params**

* `repo` **{String}**: Repository to retrieve downloads for.
* `cb` **{Function}**: Callback function to get results

### [.lastDay](lib/get.js#L169)

Get the last day's total downloads for a repository.

**Example**

```js
stats.get.lastDay('micromatch', function(err, results) {
  if (err) return console.error(err);
  console.log(results);
});
// { downloads: 316004, start: '2016-11-08', end: '2016-11-08', package: 'micromatch' }
```

**Params**

* `repo` **{String}**: Repository to retrieve downloads for.
* `cb` **{Function}**: Callback function to get results

## Calculate

### [.group](lib/calculate.js#L24)

Group array into object where keys are groups and values are arrays. Groups determined by provided `fn`.

**Example**

```js
var groups = calculate.group(downloads, function(download) {
  // day is formatted as '2010-12-25'
  // add this download to the '2010-12' group
  return download.day.substr(0, 7);
});
```

**Params**

* `arr` **{Array}**: Array of download objects
* `fn` **{Function}**: Function to determine group the download belongs in.
* `returns` **{String}**: Key to use for the group

### [.group.total](lib/calculate.js#L52)

Calculate the total for each group (key) in the object.

**Params**

* `groups` **{Object}**: Object created by a `group` function.
* `returns` **{Object}**: Object with calculated totals

### [.total](lib/calculate.js#L76)

Calculate the total downloads for an array of download objects.

**Params**

* `arr` **{Array}**: Array of download objects (must have a `.downloads` property)
* `returns` **{Number}**: Total of all downloads in the array.

### [.group.avg](lib/calculate.js#L93)

Calculate the average for each group (key) in the object.

**Params**

* `groups` **{Object}**: Object created by a `group` function.
* `returns` **{Object}**: Object with calculated average

### [.avg](lib/calculate.js#L112)

Calculate the average downloads for an array of download objects.

**Params**

* `arr` **{Array}**: Array of download objects (must have a `.downloads` property)
* `returns` **{Number}**: Average of all downloads in the array.

### [.group.before](lib/calculate.js#L136)

Create an array of downloads before specified day.

**Params**

* `day` **{String}**: Day specifying last day to use in group.
* `arr` **{Array}**: Array of downloads to check.
* `returns` **{Array}**: Array of downloads happened before or on specified day.

### [.before](lib/calculate.js#L158)

Calculate the total downloads happening before the specified day.

**Params**

* `day` **{String}**: Day specifying last day to use in group.
* `arr` **{Array}**: Array of downloads to check.
* `returns` **{Number}**: Total downloads happening before or on specified day.

### [.group.last](lib/calculate.js#L174)

Create an array of downloads for the last `X` days.

**Params**

* `days` **{Number}**: Number of days to go back.
* `arr` **{Array}**: Array of downloads to check.
* `init` **{String}**: Optional day to use as the last day to include. (Days from `init || today` - `days` to `init || today`)
* `returns` **{Array}**: Array of downloads for last `X` days.

### [.last](lib/calculate.js#L203)

Calculate total downloads for the last `X` days.

**Params**

* `days` **{Number}**: Number of days to go back.
* `arr` **{Array}**: Array of downloads to check.
* `init` **{String}**: Optional day to use as the last day to include. (Days from `init || today` - `days` to `init || today`)
* `returns` **{Array}**: Array of downloads for last `X` days.

### [.group.prev](lib/calculate.js#L219)

Create an array of downloads for the previous `X` days.

**Params**

* `days` **{Number}**: Number of days to go back.
* `arr` **{Array}**: Array of downloads to check.
* `init` **{String}**: Optional day to use as the prev day to include. (Days from `init || today` - `days` - `days` to `init || today` - `days`)
* `returns` **{Array}**: Array of downloads for prev `X` days.

### [.prev](lib/calculate.js#L237)

Calculate total downloads for the previous `X` days.

**Params**

* `days` **{Number}**: Number of days to go back.
* `arr` **{Array}**: Array of downloads to check.
* `init` **{String}**: Optional day to use as the prev day to include. (Days from `init || today` - `days` - `days` to `init || today` - `days`)
* `returns` **{Array}**: Array of downloads for prev `X` days.

### [.monthly](lib/calculate.js#L250)

Create an object of download groups by month.

**Params**

* `arr` **{Array}**: Array of downloads to group and total.
* `returns` **{Object}**: Groups with arrays of download objects

### [.monthly](lib/calculate.js#L287)

Calculate total downloads grouped by month.

**Params**

* `arr` **{Array}**: Array of downloads to group and total.
* `returns` **{Object}**: Groups with total downloads calculated

### [.yearly](lib/calculate.js#L300)

Create an object of download groups by month.

**Params**

* `arr` **{Array}**: Array of downloads to group and total.
* `returns` **{Object}**: Groups with arrays of download objects

### [.yearly](lib/calculate.js#L313)

Calculate total downloads grouped by year.

**Params**

* `arr` **{Array}**: Array of downloads to group and total.
* `returns` **{Object}**: Groups with total downloads calculated

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](http://twitter.com/doowb)

### License

Copyright © 2016, [Brian Woodward](https://github.com/doowb).
Released under the [MIT license](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.2.0, on November 09, 2016._
