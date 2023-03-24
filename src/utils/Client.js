require('dotenv').config();
const { REST, Routes } = require('discord.js');
const db = require("quick.db");
const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);

async function reloadClient() {
	reloadSlashCmd();
	console.log("Reloaded Client...");
}

async function reloadSlashCmd() {
	try {
		let data = await db.fetch(`slashcommandlist`)
		console.log("Reloading Application Commands (/).")
		let startRefreshTimeStamp = new Date();

		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: data });

		let timeUsed = Date.now() - startRefreshTimeStamp;
		console.log('Successfully reloaded Application Command. Elapsed ' + timeUsed + " ms");
	} catch (error) {
		console.error(error);
	}
}

module.exports = { reloadSlashCmd, reloadClient }