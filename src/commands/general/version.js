export default {
  name: "version",
  aliases: ["v"],
  usage: "!version",
  description: "Current version of OJK Bot",
  execute: ({ msg }) => {
    msg.channel.send(
      `I'm the OJK Bot version **${process.env.npm_package_version}**`
    );
  },
};
