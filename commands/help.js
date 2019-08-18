//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
module.exports = async function(message) {
 
//This is your Command or Discord Rich Embed code Line followed by the end of the command. OR close "}" bracket
 message.delete().catch();	 
   let hEmbed = new Discord.RichEmbed()
   .setTitle("Mr. Clean Help Command")
   .setDescription(`<@${message.author.id}>` + "Below is a list of all my available Command Modules")
   .setColor("#0x3dfbff")
   .addField("$verify", "Sends a captcha message to be completed for server verification ou must have a ``verified role`` Setup")
   .addField("$unverify", "Unverifys you in the server ``YOU MAY LOSE ACCESS TO CERTAIN CHANNELS``")
   .addField("$help", "Shows this help message")
   .addField("$ping", "Pings the bot and checks latency and response time")
   .setFooter(`© Me. Clean`)
   message.channel.send(hEmbed)
}


module.exports.info = {
    description: "Sends the help message",
    args: [
        { required: false, description: "help" }
    ]
};
