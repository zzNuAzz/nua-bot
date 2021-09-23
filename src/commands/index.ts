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
          play.execute(interaction);
          break;
        case pause.name:
          pause.excute(interaction);
          break;
        case resume.name:
          resume.excute(interaction);
          break;
        case skip.name:
          skip.excute(interaction);
          break;
        case leave.name:
          leave.excute(interaction);
          break;
        case nowplaying.name:
          nowplaying.excute(interaction);
          break;
        default:
          interaction.followUp("Chưa code okeeeee!!!")
      }
    } catch (e) {
      interaction.reply(messages.error);
    }
  });
};