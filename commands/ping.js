module.exports = function(message) {
    message.reply(`pong! \`${this.ping}ms\``);
};

module.exports.info = {
    description: "Simple ping command",
    args: [ ]
};