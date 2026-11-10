import { ChannelType, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'
import { setOptInChannel } from '../../utils/optinStore.js'

export default {
  data: new SlashCommandBuilder()
    .setName('setup-channel')
    .setDescription('Make a text channel optional: hidden by default, members opt in to see it.')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('The text channel to make optional')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName('role')
        .setDescription('Use an existing role instead of creating a new one')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true })

    const channel = interaction.options.getChannel('channel')
    const guild = interaction.guild
    const me = await guild.members.fetchMe()
    const reason = `Optional channel setup by ${interaction.user.tag}`

    if (!me.permissions.has(PermissionFlagsBits.ManageRoles)) {
      await interaction.editReply('I need the **Manage Roles** permission to set up optional channels.')
      return
    }

    let role = interaction.options.getRole('role')
    let createdRole = false

    if (!role) {
      try {
        role = await guild.roles.create({
          name: `opt-in: ${channel.name}`.slice(0, 100),
          reason,
        })
        createdRole = true
      } catch (err) {
        await interaction.editReply(`Could not create a role for this channel: ${err.message}`)
        return
      }
    }

    if (me.roles.highest.comparePositionTo(role) <= 0) {
      if (createdRole) await role.delete('Cleanup after failed setup').catch(() => {})
      await interaction.editReply(
        `The role **${role.name}** must be placed below my highest role (Server Settings → Roles).`
      )
      return
    }

    try {
      await channel.permissionOverwrites.edit(guild.roles.everyone, { ViewChannel: false }, { reason })
      await channel.permissionOverwrites.edit(role, { ViewChannel: true }, { reason })
    } catch (err) {
      if (createdRole) await role.delete('Cleanup after failed setup').catch(() => {})
      await interaction.editReply(
        `Could not update the channel permissions: ${err.message}\n` +
          'If the channel is synced to a category, unsync it first, or apply the overwrite on the category instead.'
      )
      return
    }

    await setOptInChannel(channel.id, { roleId: role.id, name: channel.name })

    await interaction.editReply(
      `Optional channel set up: **#${channel.name}**\n` +
        '- Hidden from @everyone (View Channel denied)\n' +
        `- Visible with the role **${role.name}**\n` +
        'Members can now opt in or out themselves with `/channels`.'
    )
  },
}
