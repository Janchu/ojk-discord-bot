import Discord from "discord.js";

// https://stackoverflow.com/a/60923170
class Guild extends Discord.Guild {
  constructor(client) {
    super(client, {
      id: Discord.SnowflakeUtil.generate(),
      name: "",
      icon: null,
      splash: null,
      owner_id: "",
      region: "",
      afk_channel_id: null,
      afk_timeout: 0,
      verification_level: 0,
      default_message_notifications: 0,
      explicit_content_filter: 0,
      roles: [],
      emojis: [],
      features: [],
      mfa_level: 0,
      application_id: null,
      system_channel_id: null,
    });
    this.client.guilds.cache.set(this.id, this);
  }
}

export default Guild;
