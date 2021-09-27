import { DiscordTogether } from "discord-together";
import { Client, CommandInteraction } from "discord.js";

export interface Command {
    name: string;
    execute: (interaction: CommandInteraction, client: Client, clientDiscordTogether: DiscordTogether<any>) => Promise<void>;
  }