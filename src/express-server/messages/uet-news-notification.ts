import { UETNews } from "../types/push-uet-news-notification";
import { MessageEmbed } from "discord.js";

export default function createUetNewsMessage(news: UETNews) {
    console.log(news.thumbnail)
	return new MessageEmbed()
		.setTitle(news.title)
		.setURL(news.url)
		.setThumbnail(news.thumbnail)
		.setDescription(news.description)
		.setAuthor("Push by NuABot - UET noti");
}
