import { CommandInteraction } from "discord.js";

export interface Command {
    name: string;
    execute: (interaction: CommandInteraction) => Promise<void>;
  }