const Discord = require('discord.js');

/* This could be better. Find better name?
always rely on Discord.Collection, or just use map?
*/

// todo: proper storage, currently gets deleted, and goes to default values, and empty collections.

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