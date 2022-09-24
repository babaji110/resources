const Discord = require("discord.js"); 
const client = new Discord.Client();
require('discord-buttons')(client);
const { MessageButton } = require('discord-buttons')
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const arnov = require("./arnov.json");
const { readdirSync } = require('fs'); 
const { join } = require('path');

var prefix = arnov.prefix

client.commands= new Discord.Collection(); 


const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js")); 

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`)); 
    client.commands.set(command.kod, command); 
}


client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();
        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch {
            console.log("Arnov ping engelleme sistemi devreye girdi.");
        }
    }
})


client.on('ready', () => {
  console.log(`${client.user.tag} Olarak Aktifim`)
  client.user.setActivity("TVG 🧡 Arnov")
  client.channels.cache.get("991762505598767175").join().then(
    console.log("Ses kanalına bağlandım"))})
    
client.on('voiceStateUpdate', async (___, newState) => {
  if (
  newState.member.user.bot &&
  newState.channelID &&
  newState.member.user.id == client.user.id &&
  !newState.selfDeaf
  ) {
  newState.setSelfDeaf(true); 
  }
});


client.login(arnov.token)
