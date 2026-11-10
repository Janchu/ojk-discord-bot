import { ActionRowBuilder, SlashCommandBuilder, StringSelectMenuBuilder } from 'discord.js'
import { loadOptInChannels, saveOptInChannels } from '../../utils/optinStore.js'

const MENU_ID = 'optin-channels'
const MAX_OPTIONS = 25

// Builds select-menu options from the store, pruning entries whose channel
// was deleted. Option defaults reflect the member's current roles.
async function buildOptions(interaction) {
  const stored = await loadOptInChannels()
  const stale = []
  const options = []

  for (const [channelId, info] of Object.entries(stored)) {
    const channel = interaction.guild.channels.cache.get(channelId)
    if (!channel) {
      stale.push(channelId)
      continue
    }

    const role = interaction.guild.roles.cache.get(info.roleId)
    const selected = role ? interaction.member.roles.cache.has(role.id) : false

    options.push({
      label: `#${channel.name}`.slice(0, 100),
      value: channelId,
      description: (selected ? 'Visible — deselect to hide' : 'Hidden — select to show').slice(0, 100),
      default: selected,
    })
  }

  if (stale.length > 0) {
    for (const id of stale) delete stored[id]
    await saveOptInChannels(stored)
  }

  return options.slice(0, MAX_OPTIONS)
}

function buildMenu(options) {
  const menu = new StringSelectMenuBuilder()
    .setCustomId(MENU_ID)
    .setPlaceholder('Select the channels you want to see')
    .setMinValues(0)
    .setMaxValues(Math.max(options.length, 1))

  if (options.length > 0) {
    menu.addOptions(options)
  } else {
    menu.addOptions({ label: 'No optional channels configured', value: 'none', default: true })
  }

  return new ActionRowBuilder().addComponents(menu)
}

export default {
  data: new SlashCommandBuilder()
    .setName('channels')
    .setDescription('Choose which optional channels you want to see.'),

  async execute(interaction) {
    const options = await buildOptions(interaction)

    if (options.length === 0) {
      await interaction.reply({ content: 'No optional channels are configured yet.', ephemeral: true })
      return
    }

    await interaction.reply({
      content:
        'Select the optional channels you want to see — anything you deselect will be hidden from you.',
      components: [buildMenu(options)],
      ephemeral: true,
    })
  },

  components: {
    [MENU_ID]: async (interaction) => {
      const stored = await loadOptInChannels()
      const selected = new Set(interaction.values)
      const shown = []
      const hidden = []
      const failed = []

      for (const [channelId, info] of Object.entries(stored)) {
        const channel = interaction.guild.channels.cache.get(channelId)
        const role = interaction.guild.roles.cache.get(info.roleId)
        if (!channel || !role) {
          failed.push(`#${info.name ?? channelId} (missing channel or role — ask an admin to re-run \`/setup-channel\`)`)
          continue
        }

        const has = interaction.member.roles.cache.has(role.id)
        const wants = selected.has(channelId)

        if (wants && !has) {
          try {
            await interaction.member.roles.add(role.id, 'Opted in via /channels')
            shown.push(`#${channel.name}`)
          } catch {
            failed.push(`#${channel.name}`)
          }
        } else if (!wants && has) {
          try {
            await interaction.member.roles.remove(role.id, 'Opted out via /channels')
            hidden.push(`#${channel.name}`)
          } catch {
            failed.push(`#${channel.name}`)
          }
        }
      }

      const lines = []
      if (shown.length > 0) lines.push(`Now visible: ${shown.join(', ')}`)
      if (hidden.length > 0) lines.push(`Now hidden: ${hidden.join(', ')}`)
      if (failed.length > 0) lines.push(`Could not update: ${failed.join(', ')}`)
      if (lines.length === 0) lines.push('No changes.')

      await interaction.update({
        content: lines.join('\n'),
        components: [buildMenu(await buildOptions(interaction))],
      })
    },
  },
}
