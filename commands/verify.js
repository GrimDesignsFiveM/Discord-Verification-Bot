const { randomBytes } = require("crypto");
const Jimp = require("jimp");
const { RichEmbed } = require("discord.js");
const Discord = require("discord.js");

const command = require("../config.json")

  // Check if command is enabled
 if (command.enabled === false) return message.reply("⛔ | This command has been disabled.");



module.exports = async function(message) {
		  let verifyChannel = message.guild.channels.find("name", "verify");
     if(!verifyChannel) return message.channel.send(`<@${message.guild.owner.id}>` + " Couldn't find the verification channel, please create a channel named ``verify`` before your members ccan use this command");
     if (!message.guild.roles.exists("name", "Verified")) return message.channel.send(`<@${message.guild.owner.id}>` + " You need to create a ``Verified`` role before your members can use this command");

    if (message.args.length === 0) {
        // No arguments provided

        const captcha = randomBytes(32).toString("hex").substr(0, 6);
        const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
        const image = await Jimp.read("./assets/noise.jpg");
        image.print(font, 0, 0, captcha);

        const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
        const embed = new RichEmbed()
            .setTitle("Verification")
            .setColor(0x36393f)
            .setDescription("Please solve this captcha by sending `" + this.config.prefix + "verify [code]` in " + verifyChannel + " ")
            .attachFile({ attachment: buffer, name: "captcha.jpeg" })
            .setImage("attachment://captcha.jpeg");
        message.author.send(embed).catch(() => {
            message.reply("⛔ | Could not send captcha, maybe you have Direct Messages disabled?");
        });

        this.query.set(message.author.id, captcha);

    } else {
        // Arguments provided
        if (!this.query.has(message.author.id)) return message.reply("⛔ | Please request a captcha by sending `" + this.config.prefix + "verify`");

        const captcha = this.query.get(message.author.id);
        let verifyRole = message.guild.roles.find('name', `Verified`);
  

        if (message.args[0] !== captcha) return message.reply("⛔ | Invalid captcha!");
        else {
            message.member.addRole(verifyRole).then(() => {
                message.reply("✅ | Successfully verified.");
            }).catch(console.error);
            this.query.delete(message.author.id);
        }

    }
};

module.exports.info = {
    description: "Used to receive a captcha or to use it",
    args: [
        { required: false, description: "The captcha code", name: "captcha" }
    ]
};
