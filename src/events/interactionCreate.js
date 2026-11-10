import { Events } from 'discord.js'
import { logger } from '../utils/logger.js'

export default {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
      logger.warn(`Unknown command: ${interaction.commandName}`)
      return
    }

    try {
      await command.execute(interaction)
    } catch (err) {
      logger.error(`Error executing command ${interaction.commandName}`, err)

      const reply = {
        content: 'Something went wrong while executing this command.',
        ephemeral: true,
      }

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(reply)
      } else {
        await interaction.reply(reply)
      }
    }
  },
}
