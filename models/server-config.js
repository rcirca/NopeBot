const Discord = require('discord.js');

/* This could be better. Find better name?
always rely on Discord.Collection, or just use map?
*/

// todo: proper storage, currently gets deleted, and goes to default values, and empty collections.

module.exports = class ServerConfig {
    constructor(guild) {
        if(!guild) throw 'no guild specified';

        this._serverId = guild.id;
        this._serverName = guild.name;
        this._mutedUsers = new Discord.Collection();
        this._notifyNewEmojis = false;
        this._notifyChannelOfEmojis = undefined;
    }

    get serverName() {
        return this._serverName;
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