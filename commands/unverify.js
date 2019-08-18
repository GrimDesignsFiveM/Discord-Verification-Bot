module.exports = function(message) {
     
     let verifyRole = message.guild.roles.find('name', `Verified`);
      message.member.removeRole(verifyRole).then(() => {
        message.reply("✅ | Successfully unverified.");
    }).catch(err => {
        message.reply("⛔ | Could not remove role: " + err);
    });
};

module.exports.info = {
    description: "Used to remove the verified role from yourself",
    args: [ ]
};
