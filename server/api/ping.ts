/*
 *   Copyright (c) 2025 Massimiliano Porzio
 *   All rights reserved.
 */
import { logger } from '../logger'

export default defineEventHandler(() => {
  logger.info('Ping chiamato dal backend!')
  logger.error('Errore di esempio backend')
  return { pong: true }
})
// comment for testing husky
