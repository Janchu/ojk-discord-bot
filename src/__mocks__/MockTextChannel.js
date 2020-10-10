import Discord from 'discord.js';

// https://stackoverflow.com/a/60923170
class TextChannel extends Discord.TextChannel {
  constructor(guild) {
    super(guild, {
      id: Discord.SnowflakeUtil.generate(),
      type: 0,
    });
    this.client.channels.cache.set(this.id, this);
  }

  send(content) {
    return this.client.actions.MessageCreate.handle({
      id: Discord.SnowflakeUtil.generate(),
      type: 0,
      channel_id: this.id,
      content,
      author: {
        id: 'bot id',
        username: 'bot username',
        discriminator: '1234',
        bot: true,
      },
      pinned: false,
      tts: false,
      nonce: '',
      embeds: [],
      attachments: [],
      timestamp: Date.now(),
      edited_timestamp: null,
      mentions: [],
      mention_roles: [],
      mention_everyone: false,
    });
  }
}

export default TextChannel;
