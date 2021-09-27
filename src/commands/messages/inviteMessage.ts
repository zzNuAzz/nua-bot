import messages from '@/constants/messages';
import { MessageEmbed, MessageButton, MessageActionRow } from 'discord.js';

export const createInviteMessage = (payload: {
  type: 'youtube_watch',
  title: string,
  code: string,
}): MessageActionRow => {
	//   return new MessageEmbed()
	//     .setTitle('Mở Youtube:')
	//     .setDescription(`[Click here!](${payload.code})`)
	return new MessageActionRow().addComponents(
		new MessageButton()
			.setLabel('Mở dzutube lên nào')
            .setURL(payload.code)
			.setStyle('LINK')
	);
}