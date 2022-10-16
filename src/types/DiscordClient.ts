import { Client, Collection } from "discord.js";
import { Command } from "./Command";

export interface DiscordClient extends Client {
  commands: Collection<string, Command>;
}
