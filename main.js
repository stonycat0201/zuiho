require('dotenv').config();

const config = require('./config.json')
const Discord = require('discord.js')
const fs = require('fs');
const bot = new Discord.Client({ disableEveryone: true });

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

fs.readdir("./command/", (err, files) => {

    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }


    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);

        console.log(`${f} loaded!`);

        bot.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);

        });
    });
})

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity(`In Development`);
    bot.user.setStatus('online');

    bot.on("Createmessage", async message => {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        let prefix = config.prefix
        let messageArray = message.content.split(" ");
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();
        let commandfile;

        if (bot.commands.has(cmd)) {
            commandfile = bot.commands.get(cmd);
        } else if (bot.aliases.has(cmd)) {
            commandfile = bot.commands.get(bot.aliases.get(cmd));
        }

        if (!message.content.startsWith(prefix)) return;


        try {
            commandfile.run(bot, message, args);

        } catch (e) {
        }
    }
    )
})

const TOKEN = process.env.CLIENT_TOKEN;
client.login(TOKEN); //login