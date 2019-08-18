const { randomBytes } = require("crypto");
const Jimp = require("jimp");
const { RichEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = async function(message) {
		  let verifyChannel = message.guild.channels.find("name", "verify");
     if(!verifyChannel) return message.channel.send(`<@${message.author.id}>` + " Couldn't find the verification channel, please create a channel named ``verify`` and try again.");;


    if (message.args.length === 0) {
        // No arguments provided

        const captcha = randomBytes(32).toString("hex").substr(0, 6);
        const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
        const image = await Jimp.read("./assets/noise.jpg");
        image.print(font, 0, 0, captcha);

        const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
        const embed = new RichEmbed()
            .setTitle("Verification")
            .setDescription("This server is protected by Mr Clean a project that prevents servers from being raided.\n" +
                "Please solve this captcha by sending `" + this.config.prefix + "verify [code]` in <#" + message.channel.id + ">")
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

        if (message.args[0] !== captcha) return message.reply("⛔ | Invalid captcha!");
        else {
    if (!message.guild.roles.exists("name", "Verified")) return message.channel.send(`${message.guild.owner.id}` + " Please create a ``Verified`` role");
            message.member.addRole(this.config.servers[message.guild.id].verifiedRole).then(() => {
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
