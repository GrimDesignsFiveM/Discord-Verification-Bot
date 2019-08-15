const versionCheck = require("../utils/versionCheck");

module.exports.run = async function() {
    console.log(`[LOG] Logged in (${this.guilds.size} servers - ${this.users.size} users)!`);

    for (const guild of this.guilds.values()) {
        if (!this.config.servers[guild.id]) console.log(`[WARN] ${guild.name} is not set in \`servers\` (config.json file)`);
    }

    if (Object.keys(this.config.presence).length !== 0) {
        this.user.setPresence({
            game: {
                name: this.config.presence.name,
                type: this.config.presence.type
            },
            status: "online"
        }).catch(console.error);
    }

    // Check version
    if (!(await versionCheck()).sameVer) console.log("[WARN] Latest version is not identical to local version");
};