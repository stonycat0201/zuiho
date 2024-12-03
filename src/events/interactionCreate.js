import { EmbedBuilder, PermissionsBitField } from 'discord.js';

async function handleCommand(interaction, client) {
    const command = client.commands.get(interaction.commandName);
    if (!command) {
        const Embed = new EmbedBuilder()
            .setTitle("Zuiho")
            .setDescription(`Sorry, Command **${interaction.commandName}** is Not Found.`)
            .setColor("FF0000");

        return interaction.reply({
            embeds: [Embed],
            ephemeral: true,
        });
    }

    if (!interaction.guild && !command.allowDM) {
        const Embed = new EmbedBuilder()
            .setTitle("Zuiho")
            .setDescription("Sorry, This Bot Command is Not Allowed in Private Chat...")
            .setColor("FF0000");

        return interaction.reply({
            embeds: [Embed],
            ephemeral: true,
        });
    }

    command.run(interaction, client);
}

function handleButton(interaction, client) {
    // Handle Button
}

function handleSelectMenu(interaction, client) {
    // Handle Select Menu
}

const interactionCreate = {
    name: "interactionCreate",
    once: false,
    async execute(interaction, client) {
        //const { customId, values, guild, member } = interaction;

        if (interaction.isChatInputCommand()) {
            handleCommand(interaction, client);
        } else if (interaction.isButton()) {
            handleButton(interaction, client);
        } else if (interaction.isSelectMenu()) {
            handleSelectMenu(interaction, client);
        }
    },
};

export default interactionCreate;