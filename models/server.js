const Discord = require('discord.js');

class ServerConfig {
    constructor(guild) {
        this.guild = guild;
        this.mutedUsers = new Discord.Collection();
        this.notifyNewEmojis = false;
        this.notifyChannelOfEmojis = undefined;
    }
}

class Servers {
    constructor() {
        this._servers = new Discord.Collection();
    }

    get servers() {
        return this._servers;
    }

    addServer(guild) {

    }
}