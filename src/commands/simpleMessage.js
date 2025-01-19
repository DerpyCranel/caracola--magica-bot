const { SlashCommandBuilder } = require("discord.js");
const messages = require("../messages.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("caracola-magica")
    .setDescription("¡Preguntale algo a la caracola mágica!")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("La entrada para decir")
        .setRequired(true)
    ),

  async execute(interaction) {
    // Extraemos solo los mensajes del array de objetos y los almacenamos en un nuevo array llamado 'message'
    let message = messages.map((obj) => obj.message);
    // Generamos un índice aleatorio válido para acceder al array 'message'
    let randomIndex = Math.floor(Math.random() * message.length);
    // Seleccionamos un mensaje aleatorio del array 'message' utilizando el índice aleatorio
    let randomAnswer = message[randomIndex];

    //validacion por si no se envia una pregunta
    if (interaction.options.getString("input")) {
      let ask = interaction.options.getString("input");
      // Obtenemos el usuario que ejecuta el comando
      const user = interaction.user;
      // Accedemos a su ID
      const userId = user.id;
      // Accedemos a su nombre de usuario
      const userName = user.username;

      //se crea la cadena con la pregunta y la respuesta  random
      let response=`Oh caracola mágica ${userName} pregunta  ¿${ask}? \n ¡La caracola mágica dice  : ${randomAnswer}!`;
      await interaction.reply(response);
    } else {
      await interaction.reply(
        "No se proporcionó ninguna pregunta a la poderosa caracola mágica"
      );
    }
  },
};
