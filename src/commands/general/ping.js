import { SlashCommandBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong and latency info.'),

  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true })
    const latency = sent.createdTimestamp - interaction.createdTimestamp
    await interaction.editReply(
      `Pong! Round-trip latency: ${latency}ms | API latency: ${Math.round(interaction.client.ws.ping)}ms`
    )
  },
}
