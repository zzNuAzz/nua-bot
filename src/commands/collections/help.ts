import { Command } from '@/types/Command';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { createHelpSlashCommandMessage, createHelpAdminMessage, createhelpChatCommandMessage } from '../messages/helpMessage';

export const help: Command = {
    name: 'help',
    execute: async (interaction: CommandInteraction): Promise<void> => {
        await interaction.deferReply();
        const embeds: MessageEmbed[] = [createHelpSlashCommandMessage()];

        // Check ownser server or dev
        if(!interaction.client.application?.owner) await interaction.client.application?.fetch();

        // if(
        //     interaction.user.id === interaction.client.application?.owner?.id ||
        //     interaction.user.id === process.env.DEVELOPER_DISCORD_ID
        // ) {
        //     embeds.push(createHelpAdminMessage());
        // }

        // embeds.push(createhelpChatCommandMessage());

        await interaction.followUp({
            embeds
        })
       
    }
}