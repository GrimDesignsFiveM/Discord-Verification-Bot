<img src="https://image.ibb.co/gEN0oR/discord_banner.png"><br/>
A Captcha verification bot based off of Discord.js.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ba341e35d2c84bc0a0adc6a2ae2f4e1c)](https://app.codacy.com/app/y21/discordcaptcha?utm_source=github.com&utm_medium=referral&utm_content=y21/discordcaptcha&utm_campaign=badger)
<img src="https://travis-ci.org/y21/discordcaptcha.svg?branch=master"/>

Feel free to join the <a href="https://discord.gg/955naZw">Discord server</a> if you need help with setting up DiscordCaptcha.

## Setup procedure
DiscordCaptcha requires NodeJS 8.0+. Install it <a href="https://nodejs.org/en/download/package-manager/">here</a>.<br />
To install all required NPM-Modules, run `npm install`.<br/>
Get your Bot Token from <a href="https://discordapp.com/developers/applications/me">this page</a>.

## Verification procedure
When joining, the user is supposed (if everything was set up correctly) to only be able to send messages in a verification channel.
It is recommended to add a short message to the channel (topic, ...) so that new users know what to type next.<br/>
After typing `!verify` (`!` represents the prefix, can be changed in the config file), the bot will send the user a direct message.
In that message there is an image that shows 6 letters/numbers.<br/>
The user is then supposed to send `!verify <captcha>` in the verification channel and will be assigned a role.
That role should have send and view messages permissions for all other channels.

## Config File Explanation
> A key refers to the name of the property: `"key": "value"`

##### config#token
The `token` property holds your bots token. This is required for logging in. Do note that giving your token to others is like giving your passwords to others, they can login into your bot and do whatever they want.

##### config#prefix
The `prefix` property holds the prefix. This is the character (combination) the bot will respond to. Setting it to `$` will make the bot respond to `$verify`

##### config#deleteMessages
The `deleteMessages` property holds a boolean. If it is set to `true`, it will delete all messages in the verification channel. It is recommended to leave it as `true`.

##### config#presence
The `presence` property holds the presence (playing status) that will be displayed in your client under the username.

##### config#servers
The `servers` property holds *all* servers it should react to. Each object is keyed by the server ID and holds an object that has a `verificationChannel` and a `verifyRole` property.

##### config#ignoreServers
This property can be used to ignore certain servers 

##### config#commands
This property contains all commands and can be used to toggle/limit certain commands (to specific users)

_Example config.json_
```json
{
  "token": "NDY4Njc3NjM2NjEzMjEwMTEy.XREb8w.3ipIecMjBKxEkMdob19FwJg6jJs",
  "prefix": "$",
  "deleteMessages": true,
  "presence": {
    "type": "watching",
    "name": "people verify"
  },


  "servers": {
    "339838921955475456": {
      "verificationChannel": "592772759994630161",
      "verifyRole": "339841406409375754"
    }
  },

  "ignoreServers": [

  ],

  "commands": {
    "ping": {
      "executors": [],
      "requiredPermissions": [],
      "enabled": true
    },
    "verify": {
      "executors": [],
      "requiredPermissions": [],
      "enabled": true
    }
  }
}
```

## Tips
• Contact me via discord. (y21#0909 | ID: 312715611413413889)<br/>
• Open a Pull Request/Issue
