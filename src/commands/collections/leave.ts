import messages from '@/constants/messages';
import { servers } from '@/models/Server';
import { Command } from '@/types/Command';
import { CommandInteraction } from 'discord.js';

export const leave:Command = {
    name: 'leave',
    execute: async (interaction: CommandInteraction): Promise<void> => {
        await interaction.deferReply();
        const server = servers.get(interaction.guildId as string);
        if(!server) {
            await interaction.followUp(messages.joinVoiceChannel);
            return;
        }
        server.leave();
        await interaction.followUp(messages.leaved);
    }
}