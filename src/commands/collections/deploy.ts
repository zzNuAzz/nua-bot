import { Client } from 'discord.js';
import { schema } from '../schema';

export const deploy = (client: Client): void => {
    client.on('messageCreate', async message => {
        if(!message.guild) return;
        if(!client.application?.owner) await client.application?.fetch();
        console.log(client.application?.owner);
        console.log(message.author);
        if(
            message.content.toUpperCase() === '!NUABOT' && (
                message.author.id === client.application?.owner?.id ||
                message.author.id === process.env.DEVELOPER_DISCORD_ID
                )
        ) {
            try {
                await message.guild.commands.set(schema);
                await message.reply('Deployed!');
            } catch (e) {
                message.reply('Fail to deploy');
            }
        }
    })
}