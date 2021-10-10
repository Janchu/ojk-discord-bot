import Discord from "discord.js";
import MockGuild from "./MockGuild";
import MockTextChannel from "./MockTextChannel";

// https://stackoverflow.com/a/60923170
class Message extends Discord.Message {
  constructor(content, channel, author) {
    super(
      channel.client,
      {
        id: Discord.SnowflakeUtil.generate(),
        type: 0,
        channel_id: channel.id,
        content,
        author,
        pinned: false,
        tts: false,
        nonce: "",
        embeds: [],
        attachments: [],
        timestamp: Date.now(),
        edited_timestamp: null,
        mentions: [],
        mention_roles: [],
        mention_everyone: false,
      },
      channel
    );
  }
}

export const mockMessage = (txt) => {
  const user = {
    id: Discord.SnowflakeUtil.generate(),
    username: "username",
    discriminator: "1234",
  };
  const client = new Discord.Client();
  const guild = new MockGuild(client);
  const channel = new MockTextChannel(guild);
  return new Message(txt, channel, user);
};

export default Message;
