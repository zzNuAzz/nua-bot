import messages from '@/constants/messages';
import { Client, CommandInteraction } from 'discord.js';

export const ping = {
	name: 'ping',
	execute: async (
		interaction: CommandInteraction,
		client: Client
	): Promise<void> => {
		await interaction.deferReply();
		//https://stackoverflow.com/questions/63411268/discord-js-ping-command
		interaction.followUp(
			`${messages.ping} - Latency: ${Math.round(
				Date.now() - interaction.createdTimestamp
			)}ms - API Latency: ${Math.round(client.ws.ping)}ms`
		);
	},
};