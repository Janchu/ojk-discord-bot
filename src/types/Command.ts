import { SlashCommandBuilder } from "@discordjs/builders";
import {
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";

interface CommandInteractionWithOptions extends CommandInteraction {
  options: CommandInteractionOptionResolver;
}

export interface Command {
  data: Partial<SlashCommandBuilder>;
  execute: (
    interaction: CommandInteractionWithOptions,
    wat?: any
  ) => Promise<void>;
}
