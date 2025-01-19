const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('saludar')
        .setDescription('Saluda a un usuario.')
        .addStringOption(option =>
            option.setName('usuario')
                .setDescription('Menciona al usuario al que quieres saludar.')
                .setRequired(true)),
    async execute(interaction) {
        const usuario = interaction.options.getString('usuario');
        await interaction.reply(`¡Hola, ${usuario}!`);
    },
};