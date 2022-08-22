require('dotenv').config();

const { Client, Intents } = require('discord.js');
const TOKEN = process.env.CLIENT_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.author.bot) return
    
  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.channel.send(quote))
  }
})

client.login(TOKEN); //login