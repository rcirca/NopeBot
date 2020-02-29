const Discord = require('discord.js');

module.exports = class ServerConfig {
    constructor(guild) {
        this._guild = guild;
        this._mutedUsers = new Discord.Collection();
        this._notifyNewEmojis = false;
        this._notifyChannelOfEmojis = undefined;
    }

    get notifyNewEmojis() {
        return this._notifyNewEmojis;
    }

    set notifyNewEmojis(value) {
        this._notifyNewEmojis = value;
    }

    get notifyChannelOfEmojis() {
        return this.notifyChannelOfEmojis;
    }

    set notifyChannelOfEmojis(value) {
        this.notifyChannelOfEmojis = value;
    }

    get mutedUsers() {
        return this._mutedUsers;
    }
};