const bog = require('bog')
const ip = require('ip')

const AVAILABLE_LEVELS = [
  'debug',
  'info',
  'warn',
  'error'
]

const isValidLevel = level => AVAILABLE_LEVELS.indexOf(level) !== - 1
const typeError = message => {
  throw new TypeError(`[egg-bog] ${message}`)
}

const addEvent = (level, handler, conf) => {
  if (typeof handler !== 'function') {
    typeError(`event handler for "${level}" must be a function`)
  }

  const def = conf[level]
  const {
    out
  } = def

  def.out = (...args) => {
    handler(...args)
    return out(...args)
  }
}

const create = ({
  level = 'info',
  includeTimeDesignator = false,
  includeTimeZone = false,
  on = {},
  redirect = {}
}, app) => {
  const {
    debug,
    info,
    warn,
    error
  } = bog

  if (!isValidLevel(level)) {
    typeError(`invalid bog level: "${level}"`)
  }

  bog.level(level)

  const config = bog.config()

  Object.keys(redirect).forEach(type => {
    if (!isValidLevel(type)) {
      typeError(`invalid bog redirect level: "${type}"`)
    }

    const to = redirect[type]
    if (typeof to !== 'function') {
      typeError(`redirect.${type} must be a function`)
    }

    config[type].out = to
  })

  Object.keys(on).forEach(type => {
    if (!isValidLevel(type)) {
      throw new TypeError(`invalid bog event: "${type}"`)
    }

    addEvent(type, on[type], config)
  })

  if (includeTimeDesignator) {
    config.includeTimeDesignator = includeTimeDesignator
  }

  if (includeTimeZone) {
    config.includeTimeZone = includeTimeZone
  }

  return {
    debug,
    info,
    warn,
    error
  }
}

module.exports = {
  // For testing purpose
  AVAILABLE_LEVELS,
  create
}
