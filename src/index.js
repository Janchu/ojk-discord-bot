import { Events } from 'discord.js'
import { readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createClient } from './client.js'
import { config } from './config.js'
import { logger } from './utils/logger.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function loadCommands(client) {
  const commandsPath = path.join(__dirname, 'commands')
  const entries = await readdir(commandsPath, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const dirPath = path.join(commandsPath, entry.name)
    const files = await readdir(dirPath)

    for (const file of files) {
      if (!file.endsWith('.js')) continue
      const mod = await import(path.join(dirPath, file))
      const command = mod.default
      if (command?.data?.name && command?.execute) {
        client.commands.set(command.data.name, command)
        logger.debug(`Loaded command: ${command.data.name}`)
      }
    }
  }
}

async function loadEvents(client) {
  const eventsPath = path.join(__dirname, 'events')
  const files = await readdir(eventsPath)

  for (const file of files) {
    if (!file.endsWith('.js')) continue
    const mod = await import(path.join(eventsPath, file))
    const event = mod.default
    if (!event?.name || !event?.execute) continue

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args))
    } else {
      client.on(event.name, (...args) => event.execute(...args))
    }
    logger.debug(`Loaded event: ${event.name}`)
  }
}

async function main() {
  const client = createClient()

  await loadCommands(client)
  await loadEvents(client)

  await client.login(config.token)
}

main().catch((err) => {
  logger.error('Fatal error during startup', err)
  process.exit(1)
})
