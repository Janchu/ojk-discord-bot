import { REST, Routes } from 'discord.js'
import { readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { config } from './config.js'
import { logger } from './utils/logger.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function loadCommandData() {
  const commands = []
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
      if (command?.data) {
        commands.push(command.data.toJSON())
      }
    }
  }

  return commands
}

async function main() {
  const commands = await loadCommandData()
  const rest = new REST().setToken(config.token)

  logger.info(`Deploying ${commands.length} slash commands...`)

  if (config.guildId) {
    await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
      body: commands,
    })
    logger.info(`Deployed to guild ${config.guildId}`)
  } else {
    await rest.put(Routes.applicationCommands(config.clientId), { body: commands })
    logger.info('Deployed globally (may take up to 1 hour to propagate)')
  }
}

main().catch((err) => {
  logger.error('Failed to deploy commands', err)
  process.exit(1)
})
