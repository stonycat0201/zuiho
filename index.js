import dotenv from 'dotenv';
dotenv.config();

import chalk from 'chalk';
import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';

// Bot Permission
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
    ],
    shards: "auto",
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ],
    presence: {
        activities: [{
            name: "In Development to 2.0",
            type: 0
        }],
        status: 'dnd'
    }
});

// Handlers load
client.commands = new Collection();
client.events = new Collection();

const handlersPath = path.resolve('./src/handlers');
readdirSync(handlersPath).forEach(async (handler) => {
    const handlerModule = await import(`./src/handlers/${handler}`);
    handlerModule.default(client);
});

// Login
const token = process.env.CLIENT_TOKEN;

client.login(token)
    .catch((err) => {
        console.error(`${chalk.red("[ERROR]")} Zuiho-chan lagi males bangun...`);
        console.error(`${chalk.red("[ERROR]")} Reason: ${err}`);
        return process.exit();
    });

// Handle errors
process.on('unhandledRejection', async (err, promise) => {
    console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
    console.error(promise);
});