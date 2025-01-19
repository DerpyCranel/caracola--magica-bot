const  {SlashCommandBuilder} = require('discord.js');

module.exports={
    //datos del comando
    data: new SlashCommandBuilder()
    //nombre del comando 
    .setName("test")
    //descripcion del comando
    .setDescription("prueba de funcionalidad del bot"),
    //ejecucion del comando
    async execute(interaction){
        await interaction.reply("comandos en funcionamiento");
    },
};