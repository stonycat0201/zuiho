import { EmbedBuilder } from 'discord.js';

const command = {
    name: 'Ping',
    data: {
        name: 'ping',
        description: 'Initial response test for zuiho',
    },
    allowDM: true,
    
    run: async (interaction, client) => {
        const Embed = new EmbedBuilder()
            .setColor('111111')
            .setTitle(`Client Ping: ${client.ws.ping}`);

        await interaction.reply({
            embeds: [Embed],
            ephemeral: true,
        });
    },
};

export default command;