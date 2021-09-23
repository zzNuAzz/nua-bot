import messages from '@/constants/messages';
import { Platform } from '@/types/Song';
import { formatSeconds } from '@/utils/formatTime';
import { EmbedFieldData, MessageEmbed } from 'discord.js';

export const createPlayMessage = (payload: {
	title: string;
	url: string;
	author: string;
	thumbnail: string;
	type: 'Song' | 'Playlist';
	length: number;
	platform: Platform;
	requester: string;
}): MessageEmbed => {
	const author: EmbedFieldData = {
		name: messages.author,
		value: payload.author,
		inline: true,
	};

	const length: EmbedFieldData = {
		name: messages.length,
		value:
			payload.type === 'Playlist'
				? payload.length.toString()
				: formatSeconds(payload.length),
		inline: true,
	};

	const type: EmbedFieldData = {
		name: messages.type,
		value: payload.type,
		inline: true,
	};

	return new MessageEmbed()
		.setTitle(payload.title)
		.setURL(payload.url)
		.setThumbnail(payload.thumbnail)
		.setFooter('NuA hát cho nghe nà!!!')
		.addFields(author, length, type)
};
