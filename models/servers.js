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

        let server = this._servers.get(guild.id);
        if(!server) {
            server = new ServerConfig(guild);
            this.addServer(guild.id, server);
        }
        return server;
    }
};