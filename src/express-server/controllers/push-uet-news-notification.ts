import { MessageMentions, TextChannel } from 'discord.js';
import { Request, Response } from "express";
import client from "../../discordClient";
import discordClient from "../../discordClient";
import createUetNewsMessage from "../messages/uet-news-notification";
import { UETNewsPushNotificationRequest } from "../types/push-uet-news-notification";

const channelID = process.env.CHANNEL_UET_NEWS || "";
if(!channelID) {
	console.warn("missing CHANNEL_UET_NEWS");
}

export default async function pushUETNewsNotification(req: UETNewsPushNotificationRequest, res: Response) {
	try {

		const message = createUetNewsMessage(req.body);
		const channel = await discordClient.channels.fetch(channelID);
		if(channel && channel instanceof TextChannel) {
			const textChannel = channel as TextChannel;
			await textChannel.sendTyping();
			await textChannel.send(message);
		}
		res.json({
			success: true,
		})
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			reason: (err as Error).message,
		})
	}
}