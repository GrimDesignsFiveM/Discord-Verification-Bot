//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});
 
const config = require("../Data/config.json");
const fs = require("fs");
const snekfetch = require('snekfetch');

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (client, message, args) => {
 
//This is your Command or Discord Rich Embed code Line followed by the end of the command. OR close "}" bracket
 message.delete().catch();	 
   let hEmbed = new Discord.RichEmbed()
   .setTitle("Ninja Gen Help")
   .setDescription(`<@${message.author.id}>` + "Below is a list of all my available Command Modules")
   .setColor("#0x3dfbff")
   .addField("Bot Owner Only", "``gen ownercmds`` Shows a list of commands only my Developer can use")
   .addField("Account Generator Commands", "``gen gencmds`` Shows a list of my generator commands")
   .addField("Support Commands", "``gen support`` Shows a list of my available support commands")
   .addField("Help Commands", "``gen helpcmds`` Shows a list of my available help commands")
   .setFooter(`© Ninja Gen Beta`, `https://cdn.discordapp.com/avatars/544049582959755264/b5f7f7b81321f647ff62c991871bae43.png?size=2048?size=1024`)
   message.channel.send(hEmbed)
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['help', 'h'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Shows a list of all commands',
  usage: 'gen help'
};
