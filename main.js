require('dotenv').config();

const { Intents, Client } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})


client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}!`);

    const guildId = process.env.GUILD_ID
    const guild = client.guilds.cache.get(guildId)

    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application.commands
    }

    commands.create({
        name: 'ping',
        description: 'Replies with the "pong!!!".'
    })
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return

    const { commandName, options } = interaction

    if (commandName === 'ping') {
        interaction.reply({
            content: 'Pong!!!',
        })
    }
})

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.reply({
            content: 'pong!!!'
        })
    } 
})


client.login(process.env.CLIENT_TOKEN); //login 