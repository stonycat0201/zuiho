import dotenv from 'dotenv';
dotenv.config();
import { REST, Routes } from 'discord.js';
import pkg from 'better-sqlite3';

const { Database } = pkg;

const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);
const db = new Database('data.db');

// Create table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS slashcommandlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT
    );
`);

async function reloadClient() {
    await reloadSlashCmd();
    console.log("Reloaded Client...");
}

async function reloadSlashCmd() {
    try {
        const data = db.prepare('SELECT data FROM slashcommandlist').all();
        console.log("Reloading Application Commands (/).");
        const startRefreshTimeStamp = new Date();

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: JSON.parse(data[0].data) });

        const timeUsed = Date.now() - startRefreshTimeStamp;
        console.log('Successfully reloaded Application Command. Elapsed ' + timeUsed + " ms");
    } catch (error) {
        console.error(error);
    }
}

export { reloadSlashCmd, reloadClient };