const test = require('ava')
const {
  create,
  AVAILABLE_LEVELS
} = require('../create')

const ERRORS = [
  [{
    level: 'haha'
  }, 'invalid bog level: "haha"'],
  [{
    on: {
      error: null
    }
  }, 'event handler for "error" must be a function'],
  [{
    on: {
      haha () {}
    }
  }, 'invalid bog event: "haha"'],
  [{
    redirect: {
      error: null
    }
  }, 'redirect.error must be a function'],
  [{
    redirect: {
      haha () {

      }
    }
  }, 'invalid bog redirect level: "haha"']
]

ERRORS.forEach(([config, message], i) => {
  test(`error ${i}`, t => {
    t.throws(() => create(config))
  }, message)
})

test('integrated', t => {
  const counter = {}
  const redirect = {}
  const on = {}

  AVAILABLE_LEVELS.forEach(type => {
    counter[type] = {
      log: 0,
      event: 0
    }

    redirect[type] = (d, level, amount) => {
      counter[type].log += amount
      t.is(level, type.toUpperCase())
    }

    on[type] = (d, level, amount) => {
      counter[type].event += amount
      t.is(level, type.toUpperCase())
    }
  })

  const bog = create({
    level: 'error',
    redirect,
    on,
    includeTimeDesignator: true,
    includeTimeZone: true
  })

  bog.info(1)
  t.is(counter.info.log, 0, 'log level info not enabled')
  t.is(counter.info.event, 0, 'log level info not enabled')

  bog.error(2)
  t.is(counter.error.log, 2, 'log level error enabled')
  t.is(counter.error.event, 2, 'log level error enabled')

  create({
    level: 'warn'
  })

  bog.warn(3)
  t.is(counter.warn.log, 3, 'log level warn enabled')
  t.is(counter.warn.event, 3, 'log level warn enabled')

  create({
    level: 'info'
  })

  bog.info(4)
  t.is(counter.info.log, 4, 'log level info enabled')
  t.is(counter.info.event, 4, 'log level info enabled')

  create({
    level: 'debug'
  })

  bog.debug(5)
  t.is(counter.debug.log, 5, 'log level debug enabled')
  t.is(counter.debug.event, 5, 'log level debug enabled')
})
