/*
 *   Copyright (c) 2025 Massimiliano Porzio
 *   All rights reserved.
 */
// logger.ts
// Logger portabile e colorato per Node e Cloudflare

// Logger solo console, portabile ovunque

// Colori ANSI per la console
const colors = {
  reset: '\x1b[0m',
  gray: '\x1b[90m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
}

function colorize(msg: string, color: keyof typeof colors) {
  return colors[color] + msg + colors.reset
}

// Rimosso writeToFile: solo console

export const logger = {
  info(msg: string) {
    const message = colorize(`[INFO] ${msg}`, 'green')
    console.log(message)
  },
  warn(msg: string) {
    const message = colorize(`[WARN] ${msg}`, 'yellow')
    console.warn(message)
  },
  error(msg: string) {
    const message = colorize(`[ERROR] ${msg}`, 'red')
    console.error(message)
  },
  debug(msg: string) {
    const message = colorize(`[DEBUG] ${msg}`, 'blue')
    console.debug(message)
  },
  log(msg: string) {
    const message = colorize(`[LOG] ${msg}`, 'gray')
    console.log(message)
  }
}
