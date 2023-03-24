const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name : 'Ping',
    data: {
        name: "ping",
        description: "Initial response test for zuiho",
    },
    allowDM: true,
    
    run: async (interaction, client) => {
        const Embed = new EmbedBuilder()
            .setColor("111111")
            .setTitle(`Client Ping : ${client.ws.ping}`)

        await interaction.reply({
            embeds: [Embed],
            ephemeral: true
        })
    }
}