[![Build Status](https://travis-ci.org/kaelzhang/egg-bog.svg?branch=master)](https://travis-ci.org/kaelzhang/egg-bog)
[![Coverage](https://codecov.io/gh/kaelzhang/egg-bog/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/egg-bog)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/egg-bog?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/egg-bog)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/egg-bog.svg)](http://badge.fury.io/js/egg-bog)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/egg-bog.svg)](https://www.npmjs.org/package/egg-bog)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/egg-bog.svg)](https://david-dm.org/kaelzhang/egg-bog)
-->

# egg-bog

Egg plugin for [bog](https://www.npmjs.com/package/bog) logger

## Install

```bash
$ npm i egg-bog
```

## Usage

```js
// {app_root}/config/plugin.js
exports.bog = {
  enable: true,
  package: 'egg-bog',
}
```

## config `Object`

```js
// {app_root}/config/config.default.js
exports.bog = config
```

- **level** `BogLevel='info'` the log level. Defaults to `'info'`
- **includeTimeDesignator** `boolean=false` `bog.config().includeTimeDesignator`
- **includeTimeZone** `boolean=false` `bog.config().includeTimeZone`
- **on** `{[BogLevel]: Function}` event handler for a certain log level
- **redirect** `{[BogLevel]: Function}` override the default logger for a certain level

```js
exports.bog = {
  on: {
    // It will be triggered when `bog.error(...args)`
    error (datetime, level, args) {
      sendToSentry(datetime, level, args)
    }
  }
}
```

see [config/config.default.js](config/config.default.js) for more detail.

