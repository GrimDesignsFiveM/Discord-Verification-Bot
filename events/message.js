module.exports.run = function(message) {
    // Check if server is being ignored
    if (this.config.ignoreServers.includes((message.guild || { id: "0" }).id)) return;

    // Delete message if it was sent in verification channel
    if (message.channel.id === (this.config.servers[(message.guild || {id: "0"}).id] || {verificationChannel: "0"}).verificationChannel || message.channel.name === "verify") {

        // Wait 5 seconds if message was sent by the bot itself
        if (this.config.deleteMessages === true) {
            if (message.author.id !== this.user.id) message.delete();
            else message.delete(5000);
        }

    }

    // Check if message starts with prefix, is not sent by a bot and not in DMs
    if (!message.content.startsWith(this.config.prefix) || message.author.bot || !message.guild) return;

    // Define required properties
    Object.defineProperties(message, {
        command: {
            value: message.content.substr(this.config.prefix.length).split(" ")[0]
        },
        args: {
            value: message.content.split(" ").slice(1)
        }
    });

    // Check if command exists
    const command = this.commands.get(message.command);
    const configCommand = this.config.commands[message.command];
    if (!command) return;

    // Check if command is enabled
    if (command.enabled === false) return message.reply("⛔ | This command has been disabled.");

    // Check if author is allowed to execute command
    if (!configCommand) return message.reply("⛔ | Command not set in config.json file!");
    if (configCommand.executors.length > 0 && !configCommand.executors.includes(message.author.id))
        return message.reply("⛔ | You are not allowed to execute this command.");
    if (configCommand.requiredPermissions.length > 0 && !configCommand.requiredPermissions.some(v => message.member.hasPermission(v.toUpperCase())))
        return message.reply("⛔ | You are not allowed to execute this command.");

    // Check args length
    const requiredArgs = command.info.args.filter(v => v.required);
    if (message.args.length < requiredArgs.length)
        return message.reply(`⛔ | Invalid arguments: ${requiredArgs.length} are needed but ${message.args.length} were provided.`);

    // Run command
    command.call(this, message);
};