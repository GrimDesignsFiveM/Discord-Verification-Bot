const versionCheck = require("../utils/versionCheck");
const { version } = require("../package");

module.exports = function(message) {
    const embed = {
        title: "DiscordCaptcha | Version Check",
        fields: [
            {
                name: "Local version",
                value: "v" + version,
                inline: true
            }
        ]
    };
    versionCheck().then(ver => {
        embed.fields.push({
            name: "Latest version",
            value: ver.originVer,
            inline: true
        });

        if (ver.sameVer) embed.color = 0x00ff00;
        else embed.color = 0xff0000;

        message.channel.send({ embed });
    });
};

module.exports.info = {
    description: "Shows the current version of DiscordCaptcha",
    args: [ ]
};