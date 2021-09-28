import { Client, CommandInteraction } from "discord.js";

export interface Command {
    name: string;
    execute: (interaction: CommandInteraction, client: Client) => Promise<void>;
  }