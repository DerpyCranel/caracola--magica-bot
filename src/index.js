const {Client,Events,Partials,Collection,REST,Routes} = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');;
require('dotenv').config();



//se inicializa un nuevo cliente
const client = new Client({
    intents:3243773,
    partials: [
      Partials.Channel,
      Partials.GuildMember,
      Partials.GuildScheduledEvent,
      Partials.Message,
      Partials.Reaction,
      Partials.ThreadMember,
      Partials.User,
    ],
});

//cargar  comandos de barra
Client.commands = new Collection();

const commandFiles = fs.readdirSync(path.join(__dirname,  'commands'));

for (const commandFile of commandFiles) {
  const command = require(path.join(__dirname, 'commands', commandFile));
  Client.commands.set(command.data.name, command);
}

//registrar comandos
const rest = new  REST().setToken(process.env.TOKEN_DISCORD);


(async ()=>{
  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      {
        body:Client.commands.map((cmd)=>cmd.data.toJSON()),
      }
    );
    console.log(`loaded ${Client.commands.size}  slash command {/}`);
  } catch (error) {
    console.log("Error  loading commands" , error);
  }
})();




//se ejecuta cuando el bot esta listo
client.once(Events.ClientReady, readyClient=>{
   
    console.log('app ready' +readyClient.user.tag);
});


//se ejecuta cuando un usuario utiliza una interaccion
client.on("interactionCreate",async(interaction)=>{
  if(interaction.isChatInputCommand()){
    const command = Client.commands.get(interaction.commandName);
    //ejecuta el comando
    command.execute(interaction).catch(console.error);
  }else{
    //si la interaccion no es un slash command (botones,menu,etc)
  }
});

client.login(process.env.TOKEN_DISCORD);



