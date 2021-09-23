import messages from "@/constants/messages";
import { Client } from "discord.js";
import { deploy } from "./collections/deploy";
import { play } from './collections/play';
import { pause } from './collections/pause';
import { resume } from './collections/resume';
import { skip } from './collections/skip';
import { leave } from './collections/leave';
import { nowplaying } from './collections/nowplaying';

export const bootstrap = (client: Client): void => {
  deploy(client);

  // fallback error
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guildId) return;
    try {
      switch (interaction.commandName) {
        case play.name:
          await play.execute(interaction);
          break;
        case pause.name:
          await pause.excute(interaction);
          break;
        case resume.name:
          await resume.excute(interaction);
          break;
        case skip.name:
          await skip.excute(interaction);
          break;
        case leave.name:
          await leave.excute(interaction);
          break;
        case nowplaying.name:
          await nowplaying.excute(interaction);
          break;
        default:
          await interaction.deferReply();
          await interaction.reply(messages.inMaintenance);
          return;
      }
    } catch (err) {
      await interaction.reply(messages.error+" "+(err as Error).message);
    }
  });
};