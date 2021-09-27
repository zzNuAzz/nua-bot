import messages from '@/constants/messages';
import { Command } from '@/types/Command';
import {
	entersState,
	joinVoiceChannel,
	VoiceConnectionStatus,
} from '@discordjs/voice';
import { DiscordTogether } from 'discord-together';
import { Channel, Client, CommandInteraction, GuildMember, VoiceChannel } from 'discord.js';
import { createInviteMessage } from '../messages/inviteMessage';

export const watch_together: Command = {
	name: 'watch_together',
	execute: async (interaction: CommandInteraction, client: Client, clientDiscordTogether: DiscordTogether<any>): Promise<void> => {
        await interaction.deferReply();
        try {

            if (
                interaction.member instanceof GuildMember &&
                interaction.member.voice.channel
                ) {
                    const invite = await clientDiscordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube');
                    await interaction.followUp({
                        content: 'Cùng xem nào :)))',
						components: [
							createInviteMessage({
								type: 'youtube_watch',
								title: invite.code,
								code: invite.code,
							}),
						],
					});
                } else {
                    await interaction.followUp(messages.joinVoiceChannel);
                }
        } catch(err) {
            console.log('watch_together', (err as Error).message);
            await interaction.followUp(messages.error);
        }

	

	},
};
