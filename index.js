require('dotenv').config();

const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { readdirSync } = require("fs");

const chalk = require("chalk")

//Bot Permission
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
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

module.exports = client;

//Handlers load
client.commands = new Collection();
client.events = new Collection();

readdirSync('./src/handlers').forEach((handler) => {
    require(`./src/handlers/${handler}`)(client);
});

//Login
const token = process.env.CLIENT_TOKEN;

client.login(token)
    .catch((err) => {
        console.error(`${chalk.red("[ERROR]")} Zuiho-chan lagi males bangun...`);
        console.error(`${chalk.red("[ERROR]")} Reason: ${err}`);
        return process.exit();
    });

// Handle errors:
process.on('unhandledRejection', async (err, promise) => {
    console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
    console.error(promise);
});