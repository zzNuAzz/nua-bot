import messages from '@/constants/messages';
import { Command } from '@/types/Command';
const fetch = require('node-fetch');
import { Client, CommandInteraction, GuildMember } from 'discord.js';
import { createInviteMessage } from '../messages/inviteMessage';

interface ApplicationTogether {
    id: string;
    name: string;
}

const APPLICATIONS = new Map<string, ApplicationTogether>();
APPLICATIONS.set('poker', { id: '755827207812677713', name: 'Poker Night' });
APPLICATIONS.set('betrayal', { id: '773336526917861400', name: 'Betrayal.io' });
APPLICATIONS.set('youtube', { id: '755600276941176913', name: 'YouTube Together' });
APPLICATIONS.set('youtube2', { id: '880218394199220334', name: '"Watch Together' })
APPLICATIONS.set('fishington', { id: '814288819477020702', name: 'Fishington.io' });
APPLICATIONS.set('wordsnack', { id: '879863976006127627', name: 'Word Snack' });
APPLICATIONS.set('doodlecrew', { id: '878067389634314250', name: 'Doodle Crew' });
APPLICATIONS.set('chess',  { id: '832012774040141894', name: 'Chess' })
APPLICATIONS.set('lettertile',  { id: '879863686565621790', name: 'Letter Tile' });

export const activity: Command = {
	name: 'activity',
	execute: async (interaction: CommandInteraction, client: Client): Promise<void> => {
        await interaction.deferReply();
        const inputChannelId = interaction.options.get('channel')?.value;
        let targetChannelId = null;
        try {
            if(inputChannelId) {
                const channel = await client.channels.fetch(inputChannelId as string);
                if(channel?.type === 'GUILD_VOICE') {
                    targetChannelId = inputChannelId;
                } else {
                    await interaction.followUp(messages.needProvideVoiceChannel);
                    return;
                }
            } else if (
				interaction.member instanceof GuildMember &&
				interaction.member.voice.channel
			) {
				targetChannelId = interaction.member.voice.channel.id;
			} else {
				await interaction.followUp(messages.joinVoiceChannel);
				return;
			}

            const application = interaction.options.get('application');
            if(!application) throw new Error("No application");
            const targetApplication = APPLICATIONS.get(application.value as string);
            if(!targetApplication) {
                throw new Error("No application_id");
            }
            const inviteCode =  await fetch(`https://discord.com/api/v8/channels/${ targetChannelId }/invites`, {
                method: 'POST',
                body: JSON.stringify({
                    max_age: 3600,
                    max_uses: 0,
                    target_application_id: targetApplication.id,
                    target_type: 2,
                    temporary: false,
                    validate: null,
                }),
                headers: {
                    Authorization: `Bot ${client.token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((res: { json: () => any; }) => res.json())
                .then((invite: { error: any; code: any; }) => {
                if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
                if (Number(invite.code) === 50013) throw new Error('Your bot lacks permissions to perform that action');
                return `https://discord.com/invite/${invite.code}`
                });

            await interaction.followUp({
                content: `${interaction.member?.user} đã yêu cầu mở ${targetApplication.name} :)))`,
                components: [
                    createInviteMessage({
                        type: application.value as string,
                        title: targetApplication.name as string,
                        code: inviteCode,
                    }),
                ],
            });
                
        } catch(err) {
            console.log('watch_together', (err as Error).message);
            await interaction.followUp(messages.error);
        }
	},
};
