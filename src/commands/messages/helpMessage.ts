import messages from '@/constants/messages';
import { BaseApplicationCommandOptionsData, MessageEmbed } from 'discord.js';
import { chatCommand, slashSchema } from '../schema';

export const createHelpSlashCommandMessage = (): MessageEmbed => {
	let embedMessage = new MessageEmbed()
		.setTitle(messages.helpSlashTitle)
		.addFields(
			(slashSchema as BaseApplicationCommandOptionsData[]).map(
				(item, index) => ({
					name: `/${item.name}`,
					value: `${item.description}`,
					inline: true,
				})
			)
		);

    // aligin last row if has 2 field
  if(slashSchema.length % 3 === 2) {
    embedMessage = embedMessage.addField('\u200B', '\u200B', true)
  }
	return embedMessage;
};


export const createHelpAdminMessage = (): MessageEmbed => {
  return new MessageEmbed().setTitle(messages.adminHelpCommandTitle).addFields(
    (chatCommand.filter(e => e.role === 'admin').map(
      (item, index) => ({
        name: item.name,
        value: item.description,
        inline: false,
      })
    ))
  )
}


export const createhelpChatCommandMessage = (): MessageEmbed => {
  return new MessageEmbed().setTitle(messages.adminHelpCommandTitle).addFields(
    (chatCommand.filter(e => e.role === 'member').map(
      (item, index) => ({
        name: item.name,
        value: item.description,
        inline: false,
      })
    ))
  )
}