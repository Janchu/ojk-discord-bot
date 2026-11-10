const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 }
const COLORS = {
  debug: '\x1b[36m',
  info: '\x1b[32m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
}
const RESET = '\x1b[0m'

const minLevel = LEVELS[process.env.LOG_LEVEL] ?? LEVELS.info

function format(level, args) {
  const timestamp = new Date().toISOString()
  return [`${COLORS[level]}${timestamp} ${level.toUpperCase()}${RESET}`, ...args]
}

export const logger = {
  debug(...args) {
    if (LEVELS.debug >= minLevel) console.debug(...format('debug', args))
  },
  info(...args) {
    if (LEVELS.info >= minLevel) console.log(...format('info', args))
  },
  warn(...args) {
    if (LEVELS.warn >= minLevel) console.warn(...format('warn', args))
  },
  error(...args) {
    if (LEVELS.error >= minLevel) console.error(...format('error', args))
  },
}
