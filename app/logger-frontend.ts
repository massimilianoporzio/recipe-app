/*
 *   Copyright (c) 2025 Massimiliano Porzio
 *   All rights reserved.
 */
// logger-frontend.ts
// Logger frontend: colorato su VS Code (console terminale), normale su browser

const isVSCode = typeof window !== 'undefined' && window.navigator && window.navigator.userAgent.includes('VSCode')

const colors = {
  reset: '%c',
  gray: 'color: gray;',
  red: 'color: red;',
  green: 'color: green;',
  yellow: 'color: orange;',
  blue: 'color: blue;'
}

function colorize(msg: string, color: keyof typeof colors): [string, string] {
  if (isVSCode) {
    return [msg, colors[color]]
  }
  // Browser normale: nessun colore
  return [msg, '']
}

export const logger = {
  info(msg: string) {
    const [m, style] = colorize(`[INFO] ${msg}`, 'green')
    console.log(m, style)
  },
  warn(msg: string) {
    const [m, style] = colorize(`[WARN] ${msg}`, 'yellow')
    console.warn(m, style)
  },
  error(msg: string) {
    const [m, style] = colorize(`[ERROR] ${msg}`, 'red')
    console.error(m, style)
  },
  debug(msg: string) {
    const [m, style] = colorize(`[DEBUG] ${msg}`, 'blue')
    console.debug(m, style)
  },
  log(msg: string) {
    const [m, style] = colorize(`[LOG] ${msg}`, 'gray')
    console.log(m, style)
  }
}
