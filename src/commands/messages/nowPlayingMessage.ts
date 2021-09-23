import messages from '@/constants/messages';
import { Platform } from '@/types/Song';
import { formatSeconds } from '@/utils/formatTime';
import { EmbedFieldData, MessageEmbed } from 'discord.js';

export const createNowPlayingMessage = (payload: {
  title: string;
  url: string;
  author: string;
  thumbnail: string;
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
    value: formatSeconds(payload.length),
    inline: true,
  };
  return new MessageEmbed()
    .setTitle(payload.title)
    .setURL(payload.url)
    .setAuthor(`${messages.addedToQueue} ${payload.requester}`)
    .setThumbnail(payload.thumbnail)
		.setFooter('NuA hát cho nghe nà!!!')
    .addFields(author, length);
};