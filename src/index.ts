import { config } from 'dotenv';
config();

if (process.env.NODE_ENV !== 'development') {
	require('module-alias/register');
} else {
	if(process.env.DEV_TOKEN) {
		process.env.TOKEN = process.env.DEV_TOKEN;
	}
}

console.log(`Running in ${process.env.NODE_ENV || "default"}`)

require("./discordClient");
require("./express-server/routers")