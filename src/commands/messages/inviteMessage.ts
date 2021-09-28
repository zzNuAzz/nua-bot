import messages from '@/constants/messages';
import { MessageEmbed, MessageButton, MessageActionRow } from 'discord.js';

export const createInviteMessage = (payload: {
  type: string,
  title: string,
  code: string,
}): MessageActionRow => {
	if(payload.type === 'youtube') {
		return createButtonYoutubeInvite(payload)
	}
	
	return  new MessageActionRow().addComponents(
		new MessageButton()
			.setLabel(payload.title)
            .setURL(payload.code)
			.setStyle('LINK')
	);
	
}

const createButtonYoutubeInvite = (payload: {
	title: string,
	code: string,
  }): MessageActionRow => {
	return new MessageActionRow().addComponents(
		new MessageButton()
			.setLabel(messages.youtubeInviteLabel)
            .setURL(payload.code)
			.setStyle('LINK')
	);
  }