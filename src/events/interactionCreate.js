import { Events } from 'discord.js'
import { logger } from '../utils/logger.js'

async function replyError(interaction, err, context) {
  logger.error(`Error executing ${context}`, err)

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

export default {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName)

      if (!command) {
        logger.warn(`Unknown command: ${interaction.commandName}`)
        return
      }

      try {
        await command.execute(interaction)
      } catch (err) {
        await replyError(interaction, err, `command ${interaction.commandName}`)
      }
      return
    }

    if (interaction.isStringSelectMenu() || interaction.isButton()) {
      for (const command of interaction.client.commands.values()) {
        const handler = command.components?.[interaction.customId]
        if (!handler) continue

        try {
          await handler(interaction)
        } catch (err) {
          await replyError(interaction, err, `component ${interaction.customId}`)
        }
        return
      }
    }
  },
}
