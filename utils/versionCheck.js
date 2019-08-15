const fetch = require("node-fetch");
const pkg = require("../package");

module.exports = async () => {
    const request = await fetch("https://raw.githubusercontent.com/y21/discordcaptcha/master/package.json");
    const json = await request.json();

    return {
        sameVer: json.version === pkg.version,
        originVer: json.version
    };
};