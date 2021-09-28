import { config } from 'dotenv';
config();

if (process.env.NODE_ENV !== 'development') {
	require('module-alias/register');
} else {
	
	console.log(process.env.DEV_TOKEN);
	if(process.env.DEV_TOKEN) {
		process.env.TOKEN = process.env.DEV_TOKEN;
	}
}
import { Client, Intents, VoiceState } from 'discord.js';
import { bootstrap } from './commands';
import { servers } from './models/Server';



const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_INTEGRATIONS,
	],
}) as Client;

client.on('ready', () => {
	console.log(`> Bot is on ready`);
});

client.on('voiceStateUpdate', (oldState: VoiceState, newState: VoiceState) => {
	const activeChannel = Array.from(servers.keys());
	if (oldState.channelId === null && newState.channelId !== null) {
		// User Joins a voice channel
		console.log('A user join voice channel');
	} else if (oldState.channelId !== null && newState.channelId !== null) {
		// User Change voice channel
		// if(activeChannel.includes(oldState.channelId)) {

		// }
		console.log('A user change voice channel');
	} else if (oldState.channelId !== null && newState.channelId === null) {
		// User Leave voice channel
		console.log('A user leave voice channel');
	} else {
		console.log('unknown');
	}
});
client.login(process.env.TOKEN).then(() => {
	bootstrap(client);
});
