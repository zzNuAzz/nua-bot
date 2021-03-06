import messages from '@/constants/messages';
import { Client } from 'discord.js';
import { deploy } from './collections/deploy';
import { play } from './collections/play';
import { pause } from './collections/pause';
import { resume } from './collections/resume';
import { skip } from './collections/skip';
import { leave } from './collections/leave';
import { nowplaying } from './collections/nowplaying';
import { help } from './collections/help';
import { Command } from '@/types/Command';
import { queue } from './collections/queue';
import { activity } from './collections/activity';
import { ping } from './collections/ping';

const commandList = [play, pause, resume, skip, leave, nowplaying, help, queue, activity, ping];

const commnadMap = new Map<string, Command>(
	commandList.map(command => [command.name, command])
);

export const bootstrap = (client: Client): void => {
	deploy(client);

	// fallback error
	client.on('interactionCreate', async interaction => {
		// await interaction.channel?.fetch()
		// // console.log(interaction.channel?.code);
		if (!interaction.isCommand() || !interaction.guildId) return;
		try {
			const command = commnadMap.get(interaction.commandName);
			if (command) {
				await command.execute(interaction, client);
			} else {
				// command does not implement
				await interaction.deferReply();
				await interaction.followUp(messages.inMaintenance);
				return;
			}
			// switch (interaction.commandName) {
			// 	case play.name:
			// 		await play.execute(interaction);
			// 		break;
			// 	case pause.name:
			// 		await pause.execute(interaction);
			// 		break;
			// 	case resume.name:
			// 		await resume.execute(interaction);
			// 		break;
			// 	case skip.name:
			// 		await skip.execute(interaction);
			// 		break;
			// 	case leave.name:
			// 		await leave.execute(interaction);
			// 		break;
			// 	case nowplaying.name:
			// 		await nowplaying.execute(interaction);
			// 		break;
			// 	case help.name:
			// 		await help.execute(interaction);
			// 		return;
			// 	default:
			// 		await interaction.deferReply();
			// 		await interaction.followUp(messages.inMaintenance);
			// 		return;
			// }
		} catch (err) {
			console.log(err);
			await interaction.reply(messages.error).catch(() => {});
		}
	});
};
