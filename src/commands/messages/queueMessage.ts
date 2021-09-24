import messages from '@/constants/messages';
import { QueueItem } from '@/models/Server';
import { formatSeconds } from '@/utils/formatTime';
import { MessageEmbed } from 'discord.js';

export const MAX_SONGS_PER_PAGE = 5;

const generatePageMessage = (items: QueueItem[], start: number, totalItem: number) => {
  const embedMessage = new MessageEmbed({
    title: messages.queueTitle(totalItem),
    fields: items.map((item, index) => ({
      name: `${start + 1 + index}. ${item.song.title} | ${item.song.author}`,
      value: `${formatSeconds(item.song.length)} | ${item.song.platform} | ${
        messages.addedToQueue
      } ${item.requester}`,
    })),
  });
  return embedMessage;
};

export const createQueueMessages = (queue: QueueItem[]): MessageEmbed[] => {
  if (queue.length < MAX_SONGS_PER_PAGE) {
    const embedMessage = generatePageMessage(queue, 0, queue.length);
    return [embedMessage];
  } else {
    const embedMessages = [];
    for (let i = 0; i < queue.length; i += MAX_SONGS_PER_PAGE) {
      const items = generatePageMessage(
        queue.slice(i, i + MAX_SONGS_PER_PAGE),
        i,
        queue.length
      );
      embedMessages.push(items);
    }
    return embedMessages;
  }
};