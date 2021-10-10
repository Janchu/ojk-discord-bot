import { getApiVersion } from "../../utils/lol";

export default {
  name: "api-version",
  aliases: ["api"],
  usage: "!lol api-version",
  description: "Current LoL api version",
  execute: async ({ msg }) => {
    const apiVersion = await getApiVersion();
    msg.channel.send(`I'm currently using api version ${apiVersion}`);
  },
};
