require('dotenv').config();
const config = require('./config.json')

const TOKEN = process.env.CLIENT_TOKEN;

const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}!`);
});


client.on("messageCreate", msg => {
    if (msg.content.startsWith(config.prefix)) return;

    if (msg.content.startsWith(`${config.prefix} ping`)) {
        msg.channel.send("pong!");
    } else

        if (msg.content.startsWith(`${config.prefix} foo`)) {
            msg.channel.send("bar!");
        }
})

client.login(TOKEN); //login