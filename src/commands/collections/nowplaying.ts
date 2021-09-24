import messages from '@/constants/messages';
import { servers } from '@/models/Server';
import { Command } from '@/types/Command';
import { CommandInteraction } from 'discord.js';
import { createNowPlayingMessage } from '../messages/nowPlayingMessage';

export const nowplaying:Command = {
    name: 'np',
    execute: async (interaction: CommandInteraction): Promise<void> => {
        await interaction.deferReply();
        const server = servers.get(interaction.guildId as string);
        if(!server) {
            await interaction.followUp(messages.joinVoiceChannel);
            return;
        }
        if(!server.playing) {
            await interaction.followUp(messages.notPlaying);
            return;
        }
        const playing = server.playing;
        const message = createNowPlayingMessage({
            title: playing.song.title,
            author: playing.song.author,
            thumbnail: playing.song.thumbnail,
            url: playing.song.url,
            length: playing.song.length,
            platform: playing.song.platform,
            requester: playing.requester,
        });
        await interaction.followUp({
            embeds: [message],
        })
       
    }
}