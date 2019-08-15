module.exports = function(message) {

    const guild = this.config.servers[message.guild.id];
    message.member.removeRole(guild.verifyRole).then(() => {
        message.reply("✅ | Successfully unverified.");
    }).catch(err => {
        message.reply("⛔ | Could not remove role: " + err);
    });
};

module.exports.info = {
    description: "Used to remove the verified role from yourself",
    args: [ ]
};