import messages from '@/constants/messages';
import { servers } from '@/models/Server';
import { CommandInteraction, TextChannel } from 'discord.js';
import { pagination } from 'reconlx';
import { createQueueMessages, MAX_SONGS_PER_PAGE } from '../messages/queueMessage';

export const queue = {
  name: 'queue',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }
    if (server.queue.length === 0) {
      await interaction.followUp(messages.nothing);
      return;
    }

    const embedMessages = createQueueMessages(server.queue);
    if(server.queue.length < MAX_SONGS_PER_PAGE ) {
        interaction.followUp({
            embeds: embedMessages
        })
    } else {
        await interaction.editReply(messages.replyQueue);
		if (
			interaction &&
			interaction.channel &&
			interaction.channel instanceof TextChannel
		) {
			await pagination({
                embeds: embedMessages,
				channel: interaction.channel as TextChannel,
				author: interaction.user,
				fastSkip: true,
                max: server.queue.length,
			});
		}
        }
  },
};