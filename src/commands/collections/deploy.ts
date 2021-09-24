import messages from '@/constants/messages';
import { Client } from 'discord.js';
import { slashSchema } from '../schema';

export const deploy = (client: Client): void => {
    client.on('messageCreate', async message => {
        if(!message.guild) return;
        if(!client.application?.owner) await client.application?.fetch();
        if(
            message.content.toUpperCase() === '!NUABOT_DEPLOY'.toUpperCase() && (
                message.author.id === client.application?.owner?.id ||
                message.author.id === process.env.DEVELOPER_DISCORD_ID
                )
        ) {
            try {
                await message.guild.commands.set(slashSchema);
                const commands = await message.guild.commands.fetch()
                await message.reply(`${messages.deployed}\n✔ Set ${commands.size} slash command`);
            } catch (e) {
                console.log(e);
                message.reply(messages.deployedFail);
            }
        }
    })
}