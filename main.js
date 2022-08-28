require('dotenv').config();

const { Intents, Client } = require('discord.js');

//Intents
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

//Prefix
const prefix = process.env.PREFIX

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}!`);

    let activities = [
        `Type with ${prefix}`,
        `${client.guilds.cache.size} servers`,
    ],
        i = 0;

    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
    }), 1000 * 60);


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
    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    //Handler
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;


    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
        console.error('Erro:' + err);
    }
})


client.login(process.env.CLIENT_TOKEN); //login 