const ServerConfig = require('./server-config.js');
const Discord = require('discord.js');

module.exports = class Servers {
    constructor() {
        this._servers = new Discord.Collection();
    }

    get servers() {
        return this._servers;
    }

    getServerConfig(guild) {
        if(!guild) return undefined;

        let serverConfig = this._servers.get(guild.id);
        if(!serverConfig) {
            serverConfig = new ServerConfig(guild);
            this._servers.set(guild.id, serverConfig);
        }
        return serverConfig;
    }
};